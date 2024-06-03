import Name from "./Name";
import Station from "./Station";

export default class MainLine {
    id: number;
    name: Name;
    lat: number;
    lng: number;
    zoom: number;
    stations: [Station];
    constructor(
        id: number, 
        name: Name,
        lat: number,
        lng: number,
        zoom: number,
        stations: [Station]) {
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.zoom = zoom;
        this.stations = stations;
    }
}