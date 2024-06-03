import LoginRequest from "../model/request/LoginRequest";
import ErrorResponse from "../model/response/ErrorResponse";
import LoginResponse from "../model/response/LoginResponse";
import UserResponse from "../model/response/UserResponse";

export default interface UserRemoteSource {
    login(request: LoginRequest): Promise<LoginResponse | ErrorResponse>
    getMe(token: string): Promise<UserResponse | ErrorResponse>
}