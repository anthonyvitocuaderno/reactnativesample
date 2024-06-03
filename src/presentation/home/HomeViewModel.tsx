import BaseViewModel from "../../__core/BaseViewModel";
import { Route } from "../../__core/Route";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SetStateAction } from "react";
import HomeEvent from "./HomeEvent";
import HomeState from "./HomeState";
import { GetLocationsUseCase } from "../../domain/usecase/map/GetLocationsUseCase";
import { Region } from "react-native-maps";
import Train from "../../domain/model/Train/Train";

export default class HomeViewModel implements BaseViewModel<HomeEvent> {
    private getLocationsUseCase: GetLocationsUseCase;

    private navigation?: NativeStackNavigationProp<Route, keyof Route>

    constructor(getLocationsUseCase: GetLocationsUseCase) {
        this.getLocationsUseCase = getLocationsUseCase
    }

    private state: HomeState = new HomeState()

    updateUI(value: SetStateAction<number>): void {
        throw new Error("bind this to react setState hook to update UI");
    }

    setNavigation(navigation: NativeStackNavigationProp<Route, keyof Route>): void {
        this.navigation = navigation
    }

    onEvent(event: HomeEvent): void {
        // switch case syntax problems..
        if (event === HomeEvent.Focused) {
            console.log("HomeViewModel.on", "Focused")
            this.clearMap();
            return;
        }
        if (event === HomeEvent.StartPressed) {
            console.log("HomeViewModel.on", "StartPressed")
            this.generateMap()
            return;
        }
        if (event === HomeEvent.ClearPressed) {
            console.log("HomeViewModel.on", "ClearPressed")
            this.clearMap()
            return;
        }

        console.log("HomeViewModel.onEvent UNKNOWN", event)

    }

    clearMap() {
        this.state.trains = undefined;
        this.state.initMap = 0;
        this.notify();
    }

    public get isBusy(): boolean {
        return this.state.tasks > 0;
    }

    public get region(): Region | undefined {
        if (this.isTrainLoaded) {
            return {
                latitude: 36.2048,
                longitude: 138.2529,
                latitudeDelta: 10,
                longitudeDelta: 10
            }
        } else {
            return {
                latitude: 36.2048,
                longitude: 138.2529,
                latitudeDelta: 20,
                longitudeDelta: 20
            };
        }
    }

    public get initMap(): number {
        return this.state.initMap;
    }

    public get isTrainLoaded(): boolean {
        const isLoaded = this.state.trains !== null && this.state.trains !== undefined && this.state.trains.length > 0
        return isLoaded
    }

    public get trains(): Train[] {
        if (this.isTrainLoaded) {

            return this.state.trains!
        } else {
            return [] as Train[];
        }
    }

    async generateMap() {
        console.log("HomeViewModel.generateMap...")
        this.state.tasks += 1
        this.notify()

        const locations = await this.getLocationsUseCase.execute();
        this.state.trains = locations;

        this.state.tasks -= 1
        this.notify()

        console.log("HomeViewModel.generateMap", "finished")
    }

    private notify() {
        const count = new Date().getTime();
        console.log("HomeViewModel.notify", count)
        this.updateUI(count)
        console.log("HomeViewModel current state", this.state)
    }
}