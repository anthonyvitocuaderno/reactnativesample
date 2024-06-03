import LoginRequest from "../model/request/LoginRequest";
import ErrorResponse from "../model/response/ErrorResponse";
import LoginResponse from "../model/response/LoginResponse";
import UserResponse from "../model/response/UserResponse";
import UserRemoteSource from "./UserRemoteSource";

export default class UserRemoteSourceImpl implements UserRemoteSource {
    
    async login(request: LoginRequest): Promise<LoginResponse | ErrorResponse> {

        return new Promise(async (resolve, reject) => {
            try {

                console.log("UserRemoteSourceImpl.login request",JSON.stringify(request))
                const response = await fetch('https://reqres.in/api/login', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(request),
                })

                const json = await response.json()

                if (!response.ok) {
                    console.log("UserRemoteSourceImpl.login response error", json);
    
                    reject(new ErrorResponse(response.status, json.error))
                    return
                }

                const loginResponse = new LoginResponse(json.token)

                console.log("UserRemoteSourceImpl.login response success", json)
                resolve(loginResponse)
                
            } catch(error) {
                console.log("UserRemoteSourceImpl.login unexpected error", error);
    
                reject(new ErrorResponse(400, "Unexpected error."))
            };
        });
    }
    
    async getMe(token: string): Promise<UserResponse | ErrorResponse> {
        throw new Error("Method not implemented.");
    }
}