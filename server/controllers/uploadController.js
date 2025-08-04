const xlsx = require('xlsx');
const Agent = require('../models/Agent');
const Task = require('../models/Task');

exports.uploadCSV = async (req, res) => {
  try {
    console.log("UPLOAD CONTROLLER HIT");
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);

    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    // Read workbook from file buffer
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });

    // Read first sheet
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // Convert sheet to JSON (array of objects)
    const data = xlsx.utils.sheet_to_json(sheet); // expects headers like FirstName, Phone, Notes

    if (!data.length) {
      return res.status(400).json({ msg: "Uploaded file is empty or invalid" });
    }

    // Fetch agents
    const agents = await Agent.find();
    if (agents.length < 5) {
      return res.status(400).json({ msg: "At least 5 agents are required to assign tasks" });
    }

    // Create and assign tasks in round-robin fashion
    let index = 0;
    const savedTasks = [];

    for (const item of data) {
      const agent = agents[index % 5];

      const newTask = new Task({
        firstName: item.FirstName,
        phone: item.Phone,
        notes: item.Notes,
        agent: agent._id,
      });

      const savedTask = await newTask.save();
      savedTasks.push(savedTask);

      agent.tasks.push(savedTask._id);
      await agent.save();

      index++;
    }

    res.status(201).json({
      msg: "Tasks uploaded and distributed successfully",
      totalTasks: savedTasks.length
    });

  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ msg: "Server error during upload" });
  }
};