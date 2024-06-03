import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SetStateAction } from "react";
import BaseViewModel from "../../../__core/BaseViewModel";
import AppBarEvent from "./AppBarEvent";
import { LogoutUseCase } from "../../../domain/usecase/user/LogoutUseCase";
import { Route } from "../../../__core/Route";
import AppBarState from "./AppBarState";
import { isLoggedInUseCase } from "../../../domain/usecase/user/IsLoggedInUseCase";

export default class AppBarViewModel implements BaseViewModel<AppBarEvent> {
    private logoutUseCase: LogoutUseCase;
    private isLoggedInUseCase: isLoggedInUseCase;

    private navigation?: NativeStackNavigationProp<Route, keyof Route>

    constructor(logoutUseCase: LogoutUseCase, isLoggedInUseCase: isLoggedInUseCase) {
        this.logoutUseCase = logoutUseCase
        this.isLoggedInUseCase = isLoggedInUseCase
    }

    get isLoggedIn() {
        return this.state.isLoggedIn
    }

    private state: AppBarState = new AppBarState()

    updateUI(value: SetStateAction<number>): void {
        throw new Error("bind this to react setState hook to update UI");
    }

    setNavigation(navigation: NativeStackNavigationProp<Route, keyof Route>): void {
       this.navigation = navigation
    }

    onEvent(event: AppBarEvent): void {
        // switch case syntax problems..
        if (event === AppBarEvent.Focused) {
            console.log("AppBarViewModel.on", "Focused")
            this.checkSession()
            return;
        }
        if (event === AppBarEvent.LogoutPressed) {
            console.log("AppBarViewModel.on", "LogoutPressed")
            this.logout()
            return;
        } 


        if (event === AppBarEvent.BackPressed) {
            console.log("AppBarViewModel.on", "BackPressed")
            if (this.navigation?.canGoBack()) {
                this.navigation?.goBack()
            }
            return;
        } 
        
        console.log("AppBarViewModel.onEvent UNKNOWN", event)
        
    }

    async checkSession() {
        const isLoggedIn = await this.isLoggedInUseCase.execute();
        
        this.state.isLoggedIn = isLoggedIn
        this.notify()
    }

    async logout() {
        await this.logoutUseCase.execute()
        if (this.navigation?.canGoBack()) {
            this.navigation?.popToTop()
        }
        this.navigation?.replace("Login")
    }

    private notify() {
        const count = new Date().getTime();
        console.log("AppBarViewModel.notify", count)
        this.updateUI(count)
        console.log("AppBarViewModel current state", this.state)
    }
}