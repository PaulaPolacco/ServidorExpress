import mongoose from "mongoose";
const URI = 'mongodb+srv://paulapolacco:paula007@cluster0.x7jghpi.mongodb.net/serverExpresDB?retryWrites=true&w=majority'
mongoose.connect(URI)
.then(()=> console.log('Conectando a la base de datos'))
.catch((error) => console.log(error))