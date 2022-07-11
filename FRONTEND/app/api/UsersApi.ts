import {IUser} from "../store/types";
import {instance} from "./index";


export const usersApi = {
    getAllUsers: () => {
        return instance.get<IUser[]>(`users`)
    },
}