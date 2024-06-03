import BaseViewModel from "../../__core/BaseViewModel";
import { LoginUseCase } from "../../domain/usecase/user/LoginUseCase";
import LoginEvent from "./LoginEvent";
import { Route } from "../../__core/Route";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Toast from "react-native-root-toast";
import Exception from "../../domain/model/Exception";
import { SetStateAction } from "react";
import LoginState from "./LoginState";
import { isLoggedInUseCase } from "../../domain/usecase/user/IsLoggedInUseCase";

export default class LoginViewModel implements BaseViewModel<LoginEvent> {
    private loginUseCase: LoginUseCase;
    private isLoggedInUseCase: isLoggedInUseCase;

    private navigation?: NativeStackNavigationProp<Route, keyof Route>

    public get email(): string
    {
        return this.state.email;
    }
    
    public get password(): string
    {
        return this.state.password;
    }

    public get isBusy(): boolean
    {
        return this.state.tasks > 0;
    }

    public get error(): string | undefined {
        return this.state.error;
    }

    constructor(loginUseCase: LoginUseCase, isLoggedInUseCase: isLoggedInUseCase) {
        this.loginUseCase = loginUseCase
        this.isLoggedInUseCase = isLoggedInUseCase
    }

    private state: LoginState = new LoginState()

    updateUI(value: SetStateAction<number>): void {
        throw new Error("bind this to react setState hook to update UI");
    }

    setNavigation(navigation: NativeStackNavigationProp<Route, keyof Route>): void {
       this.navigation = navigation
    }

    onEvent(event: LoginEvent): void {
        // switch case syntax problems..
        if (event === LoginEvent.Focused) {
            console.log("LoginViewModel.on", "Focused")
            this.checkSession();
            return;
        }
        if (event === LoginEvent.LoginPressed) {
            console.log("LoginViewModel.o", "LoginPressed")
            this.login()
            return;
        } 
        if (event instanceof LoginEvent.EmailChangeText) {
            // @ts-ignore: this error is dumb so we ignore it. <3 JAVASCRIPT
            const emailChangeText = event as LoginEvent.EmailChangeText
            const text = emailChangeText.text
            console.log("LoginViewModel.on", "EmailChangeText", text);
            this.setEmail(text)
            return;
        }

        if (event instanceof LoginEvent.PasswordChangeText) {
            // @ts-ignore: this error is dumb so we ignore it. <3 JAVASCRIPT
            const passwordChangeText = event as LoginEvent.PasswordChangeText
            const text = passwordChangeText.text
            console.log("LoginViewModel.on", "PasswordChangeText", text);
            this.setPassword(text)
            return;
        }
        
        console.log("LoginViewModel.onEvent UNKNOWN", event)
        
    }
    async checkSession() {
        const isLoggedIn = await this.isLoggedInUseCase.execute();
        
        if (isLoggedIn) {
            this.onLoginSuccess()
        }
    }

    onLoginSuccess() {
        this.navigation?.replace("Home")
        this.setPassword("")
        this.notify()
    }

    onLoginFailed(error: Exception) {
        console.log("LoginViewModel.onLoginFailed", error)
        // TODO refactor?? set error, then unset error after duration. let any view observe
        // hassle. for now just call this global func.
        this.state.error = error.description
        this.notify()
    }

    async login() {
        this.state.error = undefined;
        this.state.tasks += 1
        this.notify()

        console.log("LoginViewModel login isBusy", this.isBusy)
        await this.loginUseCase.execute(this.state.email, this.state.password)
            // @ts-ignore: this error is dumb so we ignore it. <3 JAVASCRIPT
            .then((result: Result<string>) => {
                this.onLoginSuccess()
            })
            .catch((error: Exception) => {
                this.onLoginFailed(error)
            })
            .finally(() => {
                this.state.tasks -= 1
                this.notify()
                console.log("LoginViewModel login finaly isBusy", this.isBusy)
            })
    }

    setEmail(val: string) {
        console.log("LoginViewModel setEmail", val)
        // TODO any more masking or throttling
        this.state.email = val;
        this.notify()
    }

    setPassword(val: string) {
        console.log("LoginViewModel setPassword", val)
        // TODO any more masking or throttling
        this.state.password = val;
        this.notify()
    }

    private notify() {
        const count = new Date().getTime();
        console.log("LoginViewModel.notify", count)
        this.updateUI(count)
        console.log("LoginViewModel current state", this.state)
    }
}