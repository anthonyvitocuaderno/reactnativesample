import Exception from "../../model/Exception";
import UserRepository from "../../repository/UserRepository";

export class LoginUseCase {
    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(email: string, password: string): Promise<string | Exception> {
        return new Promise(async (resolve, reject) => {
            try {

                console.log("LoginUseCase.execute...", email, password);
                const result = await this.userRepository.login(email, password);
                console.log("LoginUseCase.execute", result);
                if (result instanceof Exception) {
                    reject(new Exception(result.code, result.description))
                    return
                }
                resolve(result)
            } catch(error) {
                console.log("LoginUseCase.execute error", error);
                const exception = error as Exception;
                reject(new Exception(exception.code, exception.description));
            }
        })
        
    }
}