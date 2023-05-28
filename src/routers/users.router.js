import { Router } from "express";
import { usersController } from "../controllers/users.controller.js";
import { __dirname, hashData, compareData } from "../utils.js";
import passport from "passport";


const router = Router()

router.get('/signUpGitHub', passport.authenticate('github', { scope: ['user:email'] }))
router.get('/github', passport.authenticate('github'))

// router.post('/', usersController.CustomAuthenticate)

router.get('/prueba', (req,res)=>{
    console.log('session', req.session) 
    if (req.session?.email){
        res.send(`Bienbenido ${req.session.email}`)
        return
    }
    res.redirect('/api/views')
})

// router.post('/signup', usersController.SignupCustom)

router.get('/logout', usersController.UserLogout)

//Passport
router.post('/', passport.authenticate('local',{
    failureRedirect: '/api/views/register',
    successRedirect: '/api/products'
})
)

router.post('/signup', passport.authenticate('signup',{
    failureMessage:'Ha ocurrido un error, intente nuevamente...',
    successRedirect:'/api/views'
})
)



export default router