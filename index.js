import express from 'express';
import account from './Routes/account.js'
import store from './Routes/store.js'
import database from './database.js'

const app=express();

app.use(express.json());

app.use('/api',account);
app.use('/api',store);

const port =3001;

//Connect database
database.sync()
.then(result =>{
    console.log(result);
})
.catch(error =>{
    console.log(error);
})


app.listen(port, function(){
    console.log(`Server run via port ${port}`);
});