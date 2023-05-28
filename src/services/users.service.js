import { __dirname, hashData, compareData } from "../utils.js";
import { usersModel } from "../DAL/db/models/users.model.js";
import passport from "passport";

class UsersService {

    async SignupCustom (req,res){
            const user = req.body
            const hashpass = await hashData(user.password)
            const hashUser = {...user,password:hashpass}
            await usersModel.create(hashUser)
        
            res.render('login')
        }
    async CustomAuthenticate (req,res){
            const {email, password} = req.body
            const user = await usersModel.findOne({email})
            if (!user){
                return res.render('register')
            }
            const isPassword = await compareData(password, user.password)
            if (!isPassword){
                res.json({message:'Ah ingresado mal la password, por favor vuelva a intentar...'})
            }
            req.session['email'] = email
            req.session['password'] = password
            if (email === 'admincoder@coder.com' && password === 'admin12345'){
                req.session['isAdmin'] = true
            }else {
                req.session['isAdmin'] = false
            }
            
            console.log('Inicio de sesión exitoso. Redireccionando...');
            const shouldRedirect = true;
        
            // Agregar un retraso de 3 segundos antes de redireccionar
            setTimeout(() => {
              if (shouldRedirect) {
                return res.redirect('/api/products'); // Redireccionar a la pantalla de dashboard
              }
            }, 3000);
        }
    async logout(req,res){
        req.session.destroy(()=>{
        res.redirect('/api/views')})
    }
}


export const usersService = new UsersService()