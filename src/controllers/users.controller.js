import { usersService } from "../services/users.service.js";

class UsersController {

    async SignupCustom(){
        await usersService.SignupCustom()
    }

    async CustomAuthenticate(){
        await usersService.CustomAuthenticate()
    }

    async UserLogout(){
        await usersService.logout()
    }
}

export const usersController = new UsersController