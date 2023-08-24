const express = require('express');
const router = express.Router()
import { Response, Request } from 'express'
const userDao = require('../store/user')
const User = require('../entities/user')
const { validateUser } = require('../Validations/user')
router.post('/register', async (req: any, res: any) => {
    try {
        const user = new User(req.body)
        const errors = validateUser(user)
        if (errors.length) {
            res.status(200).json({
                message: errors
            })
            return
        }
        const response = await userDao.register(user)
        if (response.insertId) {
            user.setId(response.insertId)
            res.status(200).json(user.getResponse())
            return
        }
        res.status(200).json({
            message: 'User not added!'
        })
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'User already exist with this email' });
    }
})
router.post('/login', async (req: Request, res: Response) => {
    try {
        if (!(req.body.email && req.body.password)) {
            res.status(200).json({
                message: 'Email and password are necessary'
            })
            return
        }
        const response = await userDao.login(req.body)
        if (response.jwt) {
            res.status(200).json(response)
            return
        }
        res.status(200).json({
            message: response.message
        })

    } catch (error) {
        console.log("ERROR", error)
        res.status(500).json({ message: 'Something went wrong' });
    }
}
)
router.get('/user', async (req: Request, res: Response) => {
    try {
        const response = await userDao.user(req.body)
        if (response) {
            const data = {
                user: {
                    id: response.id,
                    email: response.email
                }
            }
            res.status(200).json(data)
            return
        }
        res.status(200).json({
            message: 'Something went wrong'
        })

    } catch (error) {
        console.log("ERROR", error)
        res.status(500).json({ message: 'Something went wrong' });
    }
}
)

module.exports = router;