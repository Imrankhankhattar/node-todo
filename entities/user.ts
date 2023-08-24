class User {
    private email: string;
    private password: string;
    private id?: number
    constructor(user: any) {
        this.email = user.email;
        this.password = user.password;
    }
    getData() {
        return {
            email: this.email,
            password: this.password,
        }
    }
    setId(id: number) {
        this.id = id
    }
    getResponse() {
        return {
            user: {
                email: this.email,
                id: this.id
            }
        }
    }
}
module.exports = User;