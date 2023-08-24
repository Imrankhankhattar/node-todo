import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const userRoutes = require('./webApis/user');
const taskRoutes = require('./webApis/task');
const { authenticateToken } = require('./utils/tokenValidator')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(req.body)
    next()
});
app.use('/user', authenticateToken, userRoutes);
app.use('/task', authenticateToken, taskRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Home Page');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});