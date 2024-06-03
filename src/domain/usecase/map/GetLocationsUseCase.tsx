import trainJson from '../../../../assets/train.json';
import Train from '../../model/Train/Train';

export class GetLocationsUseCase {

    constructor() {
    }


    // TODO get metadata from remote or json file
    async execute(): Promise<[Train]> {
        console.log("GetLocationsUseCase.execute...");

        let result = trainJson as [Train]

        console.log("GetLocationsUseCase.execute result count", result.length);
        return result;
    }
}