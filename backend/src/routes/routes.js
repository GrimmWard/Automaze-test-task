import express from 'express'
import { createTask, findTask, getAllTasks } from '../services/task_service.js'

const router = express.Router()

router.get('/', async(req, res) => {
  try {
    const tasks = await getAllTasks();
    res.status(200).json(tasks) 
    
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/create', async(req, res) => {
  try {
    await createTask(req.body);
    res.status(201).json({ message: 'Task created successfully', task: req.body })
    
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/search', async (req, res) => {
  console.log(req.query);
  
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const tasks = await findTask(query);
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/delete/:id', (req, res) => {
  res.json({ message: `Task with id ${req.params.id} deleted!` })
})

export default router

