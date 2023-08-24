class Task {
    private name: string;
    private id?: number
    constructor(task: any) {
        this.name = task.name;
    }
    getData() {
        return {
            name: this.name
        }
    }
    setId(id: number) {
        this.id = id
    }
    getResponse() {
        return {
            task: {
                name: this.name,
                id: this.id
            }
        }
    }
}
module.exports = Task;