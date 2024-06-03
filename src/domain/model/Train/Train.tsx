import MainLine from "./MainLine";
import Name from "./Name";

export default class Train {
    id: number;
    name: Name;
    lines: [MainLine];
    constructor(id: number, name: Name, lines: [MainLine]) {
        this.id = id;
        this.name = name;
        this.lines = lines
    }
}