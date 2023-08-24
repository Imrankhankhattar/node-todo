const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
const protectedRoutes = [
    '/user',
    '/create-task',
    '/list-tasks'
]
function authenticateToken(req: Request, res: Response, next: () => void) {
  if (!protectedRoutes.includes(req.path)) {
    next()
    return
  }
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401) // Unauthorized
  }
  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    if(req.path === protectedRoutes[0]){
        const data = {user:{
            id: user.id,
            email: user.email
        }}
        return res.status(200).json(data)
    }
    next()
  })
}

module.exports = { authenticateToken };