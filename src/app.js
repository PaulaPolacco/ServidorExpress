import express from 'express';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'
import viewsRouter from './routers/views.router.js'
import { __dirname } from "./utils.js";
import path from 'path'
import ProductManager from './dao/ProductManagerFS.js'
import './db/dbConfig.js'
import fs from 'fs'
           
const productManager = new ProductManager('Json/products.json')


const app = express()
app.use(express.static(path.join(__dirname, '/public')))
console.log (__dirname)
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/views', viewsRouter)

// configuracion del motor de plantilla
const hbs = handlebars.create({
    extname: '.handlebars',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true
  });
  
  app.engine('.handlebars', hbs.engine);
  
app.set('views', __dirname+'\\views')
app.set('view engine', 'handlebars')


app.get('/api',(req, res) =>{res.send('Bienvenidos')})

const HttpServer = app.listen(8080, ()=>{console.log('Escuchando al puerto 8080')})
//SOCKET

const socketServer = new Server(HttpServer)

socketServer.on("connection", (socket)=>{
    console.log(`cliente conectado: ${socket.id}`)

    socket.on('disconnect', ()=>{
        console.log(`Usuario desconectado: ${socket.id}`)
    })

    socket.emit('Bienvenida', 'Bienvenido a Websockets')

    socket.on('nuevoProducto', async (producto) =>{
       producto = await productManager.addProduct(producto)
       console.log(producto)
        socket.emit('productoCreado', producto)
    })
})