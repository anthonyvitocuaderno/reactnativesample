import Location from "./Location";
import Name from "./Name";
import StationLine from "./StationLine";

export default class Station {
    id: number;
    name: Name;
    location: Location;
    lines: [StationLine];
    constructor(id: number, name: Name, location: Location, lines: [StationLine]) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.lines = lines;
    }
}