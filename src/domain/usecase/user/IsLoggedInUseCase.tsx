import UserRepository from "../../repository/UserRepository";

export class isLoggedInUseCase {
    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(): Promise<boolean> {
        console.log("isLoggedInUseCase.execute...");
        const result = await this.userRepository.isLoggedIn();
        console.log("isLoggedInUseCase.execute", result);
        return result;
    }
}