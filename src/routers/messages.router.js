import { Router } from "express";
import { transporter } from "../services/nodemailer.service.js";
import { __dirname } from "../utils.js";


const router = Router()
router.get('/', async (req,res) => {
    try {
        await transporter.sendMail()
    } catch (error) {
        res.json({message: 'Error', error})
    }
})
export default router