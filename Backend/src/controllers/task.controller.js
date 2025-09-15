import {Task} from "../models/task.model.js"

const createTask = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({ success: false, message: 'Title and category are required.' });
    }
    const task = await Task.create({
      userId: req.user.id,
      title,
      description,
      category
    });
    res.status(201).json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      update,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found.' });
    }
    res.status(200).json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found.' });
    }
    res.status(200).json({ success: true, message: 'Task deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


export {createTask,getTasks,updateTask,deleteTask}