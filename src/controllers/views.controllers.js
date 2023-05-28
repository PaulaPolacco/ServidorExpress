import { viewService } from "../services/views.service.js";

class ViewsController {
    async viewProducts (req,res){
        if(req.session.email){
            res.redirect('/api/products')
            return
        }
        res.render('login')
    }
    async viewRegister (req,res){
        res.render('register')
    }
    async viewRealtime (req,res){
        const products = await viewService.GetProducts()
        res.render('realTimeProducts', {products})
    }
}
export const viewController = new ViewsController()