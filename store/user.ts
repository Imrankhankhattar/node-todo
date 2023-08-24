const db = require('./config');
const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';

dotenv.config();
class userDao {
    async login(data: any) {
        let user: any = await this._getUser(data.email)
        if (user) {
            user = user[0]
            if (user.password === data.password) {
                const jwt = this._generateToken(user.email, user.id)
                return {
                    jwt
                }
            } else {
                return {
                    message: 'Incorrect password or email'
                }
            }
        } return {
            message: 'User does not exist!'
        }
    }
    async register(data: any) {
        const res = this._addUser(data)
        return res
    }
    async user(data: any) {
        const user = this._verifyToken(data.token)
        return user
    }
    async _getUser(email: string) {
        return new Promise((resolve, reject) => {
            db.query('select * from user where email = ?', [email], (err: any, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    async _addUser(data: any) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO user (email, password) VALUES (?, ?)', [data.email, data.password], (err: any, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    _generateToken(email: string, id: number) {
        const tokenData = {
            email, id
        }
        try {
            return jwt.sign(tokenData, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24
            });
        } catch (error) {
            console.error(error);
        }
    }
    _verifyToken(token: string) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}
module.exports = new userDao;
