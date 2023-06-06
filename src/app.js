import express from 'express';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'
import viewsRouter from './routers/views.router.js'
import usersRouter from './routers/users.router.js'
import { __dirname } from "./utils.js";
import path from 'path'
import ProductManager from './DAL/dao/ProductManagerFS.js'
import './DAL/db/dbConfig.js'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo';
import passport from 'passport';
import './middlewares/passport/passportStrategies.js'
import config from './config.js' 
import messagesRouter from './routers/messages.router.js'
           
const productManager = new ProductManager('Json/products.json')
const app = express()

const PORT = config.port

app.use(express.static(path.join(__dirname, '/public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// cookie
app.use(cookieParser())
//session
app.use(session({
    store:MongoStore.create({
        mongoUrl:'mongodb+srv://paulapolacco:paula007@cluster0.x7jghpi.mongodb.net/serverExpresDB?retryWrites=true&w=majority',
        mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
    }),
    secret: 'secretCoder', // llave secreta para firmar la cookie de sesión
    resave: false, // no volver a guardar la sesión si no hay cambios
    saveUninitialized: false, // guardar sesión aunque esté vacía
    cookie: {
        maxAge: 120000,
      },
  }));

//passport
app.use(passport.initialize())
app.use(passport.session())

//routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/views', viewsRouter)
app.use('/api/users', usersRouter)
app.use('/api/messages', messagesRouter)

// configuracion del motor de plantilla
const hbs = handlebars.create({
    extname: '.handlebars',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '\\views\\layouts'),
    partialsDir: path.join(__dirname, '\\views'),
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true,
    helpers: {
        multiply: function(a, b) { return a * b; }
      }
  });
  
app.engine('.handlebars', hbs.engine);
app.set('views', __dirname+'\\views')
app.set('view engine', 'handlebars')


app.get('/api',(req, res) =>{res.send('Bienvenidos')})

const HttpServer = app.listen(PORT, ()=>{console.log('Escuchando al puerto '+PORT)})
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

