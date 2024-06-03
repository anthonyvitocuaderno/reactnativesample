import Name from "./Name";

export default class StationLine {
    id: number;
    name: Name;
    constructor(id: number, name: Name) {
        this.id = id;
        this.name = name;
    }
}