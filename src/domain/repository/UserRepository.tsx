import Exception from "../model/Exception";
import User from "../model/User";

export default interface UserRepository {

    getMe(): Promise<User | Exception>;

    login(email: string, password: string): Promise<string | Exception>;

    logout(): Promise<void>;

    isLoggedIn(): Promise<boolean>;
}
