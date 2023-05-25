import { __dirname, hashData, compareData } from "../utils.js";
import { usersModel } from "../DAL/db/models/users.model.js";
import passport from "passport";

class UsersService {
    async UserSignupGitHub(){
        return passport.authenticate('github', { scope: ['user:email'] })
    }
    async AuthenticateGitHub(){
        return passport.authenticate('github')
    }
}

export const usersService = new UsersService()