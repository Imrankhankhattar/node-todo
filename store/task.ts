const db = require('./config')
class taskDao {
    async add(data: any) {
        const res = this._addTask(data)
        return res
    }
    async getAll() {
        const res = this._getAllTasks()
        return res
    }
    async _getAllTasks() {
        return new Promise((resolve, reject) => {
            db.query('SELECT id,name FROM task', [], (err: any, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    async _addTask(data: any) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO task (name) VALUES (?)', [data.name], (err: any, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}
module.exports = new taskDao;
