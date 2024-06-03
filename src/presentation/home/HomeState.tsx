import Train from "../../domain/model/Train/Train"

export default class HomeState {
    tasks: number = 0
    trains?: [Train];
    initMap: number = -1;
    constructor() {
        
    }
}