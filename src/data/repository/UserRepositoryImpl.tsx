import Exception from "../../domain/model/Exception";
import User from "../../domain/model/User";
import UserRepository from "../../domain/repository/UserRepository";
import UserLocalSource from "../local/user/UserLocalSource";
import LoginRequest from "../remote/model/request/LoginRequest";
import LoginResponse from "../remote/model/response/LoginResponse";
import UserRemoteSource from "../remote/user/UserRemoteSource";

export default class UserRepositoryImpl implements UserRepository {
    userRemoteSource: UserRemoteSource
    userLocalSource: UserLocalSource

    constructor(userRmoteSource: UserRemoteSource, userLocalSource: UserLocalSource) {
        this.userRemoteSource = userRmoteSource
        this.userLocalSource = userLocalSource
    }
    
    async getMe(): Promise<User | Exception> {
        throw new Error("Method not implemented.");
    }

    async login(email: string, password: string): Promise<string | Exception> {
        
        return new Promise((resolve, reject) => {
            this.userRemoteSource.login(new LoginRequest(email, password))
                .then(async result => {
                    if (result instanceof LoginResponse) {

                        const token = (result as LoginResponse).token
                        
                        await this.userLocalSource.setSession(token)
                        setTimeout(() => {
                            resolve(token)
                        }, 500)
                    } else {
                        const exception = new Exception(400, "Unexpected error.")
                        console.log("UserRepository.login unexpected error", result)
                        reject(exception)
                    }
                })
                .catch(errorResponse => {
                    const exception = new Exception(errorResponse.code, errorResponse.description)
                    console.log("UserRepository.login error", exception)
                    reject(exception)
                })
        });
        
    }

    async logout(): Promise<void> {
        return this.userLocalSource.setSession(undefined);
    }

    async isLoggedIn(): Promise<boolean> {
        const session = await this.userLocalSource.getSession();
        return session !== null
    }
}