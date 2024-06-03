import UserRepository from "../../repository/UserRepository";

export class LogoutUseCase {
    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(): Promise<void> {
        console.log("LogoutUseCase.execute...");
        const result = await this.userRepository.logout();
        console.log("LogoutUseCase.execute", result);
        return result;
    }
}