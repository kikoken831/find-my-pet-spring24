import { UserRepository } from "../../../config/db";
import { IUser } from "../interfaces/users";

export class Test {
    async getAllUsers(){
        const userCount: number = await UserRepository.count();
        const users: IUser[] = await UserRepository.findMany();
        return {userCount, users}
    }
}