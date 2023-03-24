import express from 'express';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'
import viewsRouter from './routers/views.router.js'
import { __dirname } from "./utils.js";
import path from 'path'

const app = express()
app.use(express.static(__dirname + '/public/js', { 
    setHeaders: function(res, path, stat) {
      res.set('Content-Type', 'text/javascript');
    }
  }));

app.use(express.json())
app.use(express.urlencoded({extended:true}))


//routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/views', viewsRouter)

// configuracion del motor de plantilla

app.engine('handlebars', handlebars.engine())

app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.get('/api',(req, res) =>{res.send('Bienvenidos')})

const HttpServer = app.listen(8080, ()=>{console.log('Escuchando al puerto 8080')})
//SOCKET

const socketServer = new Server(HttpServer)

socketServer.on('connection', ()=>{
    console.log('cliente conectado')
})