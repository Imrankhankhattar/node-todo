const express = require('express');
const router = express.Router()
import { Response,Request } from 'express'
const Dao = require('../store/task')
const Task = require('../entities/task')
const { validateTask } = require('../Validations/task')
router.post('/create-task', async (req: any, res: any) => {
    try {
        const task = new Task(req.body)
        const errors = validateTask(task)
        if (errors.length) {
            res.status(200).json({
                message: errors
            })
            return
        }
        const response = await Dao.add(task)
        if(response.insertId){
            task.setId(response.insertId)
            res.status(200).json(task.getResponse())
            return
        }
        res.status(200).json({
            message: 'Task not added!'
        })
      } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Something went wrong' });
      }
})
router.get('/list-tasks', async (req: any, res: any) => {
    try {
        const tasks = await Dao.getAll()
        if(tasks){
            const data = {
                tasks
            }
            res.status(200).json(data)
            return
        }
        res.status(200).json({
            message: 'Task(s) not found'
        })
      } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Something went wrong' });
      }
})

module.exports = router;