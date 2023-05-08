import { Router } from "express";
import { __dirname } from "../utils.js";
import { usersModel } from "../db/models/users.model.js";

const router = Router()

router.post('/', async(req,res)=>{
    const {email, password} = req.body
    const user = await usersModel.findOne({email,password})
    if (!user){
        return res.render('register')
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
        res.redirect('/api/products'); // Redireccionar a la pantalla de dashboard
      }
    }, 3000);
})

router.get('/prueba', (req,res)=>{
    console.log('session', req.session) 
    if (req.session?.email){
        res.send(`Bienbenido ${req.session.email}`)
        return
    }
    res.redirect('/api/views')
})

router.post('/signup', async (req,res)=>{
    const user = req.body
    console.log(user)
    await usersModel.create(user)

    res.render('login')
})

router.get('/logout', (req,res)=>{
    req.session.destroy(()=>{
    res.redirect('/api/views')})
})
export default router