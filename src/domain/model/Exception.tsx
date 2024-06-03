export default class Exception {
    code: Number;
    description: string;

    constructor(code: Number, description: string) {
        this.code = code;
        this.description = description;
    }
}