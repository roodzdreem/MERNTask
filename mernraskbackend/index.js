import mongoose from "mongoose";
import express from "express";
import cors from 'cors'
import * as UserController from './UserController.js'


mongoose
.connect('mongodb+srv://dima:wwwwww@messagescluster0.0xi8kqp.mongodb.net/Users?retryWrites=true&w=majority')
.then(() => console.log('Ura'))
.catch((err) => console.log("DB error", err));
var database = mongoose.connection;
database.on('connected', ()=>{
    console.log("Rabotaem");
})


const app = express();
app.use(express.json());
app.use(cors());
app.delete('/deleteoneuser/:id', UserController.remove);
app.post('/createuser',UserController.create);
app.patch('/updateuser/:id',UserController.update);
app.get('/api/users/getusers', UserController.getAll);







app.listen(4000, (err) => {
    if (err){ return console.log(err)};
    
})
