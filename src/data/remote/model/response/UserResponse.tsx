export default class UserResponse {
    data: {
        id: number,
        email: string,
        first_name: string,
        last_name: string,
        avatar: string
    }

    constructor(data: {
        id: number,
        email: string,
        first_name: string,
        last_name: string,
        avatar: string
    }) {
        this.data = data
    }
}