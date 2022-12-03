import express from 'express';
import account from './Routes/account.js'
import store from './Routes/store.js'
import company from './Routes/company.js'
import database from './database.js'
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from "swagger-ui-express"

const app=express();

app.use(express.json());

const options={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Store API Endpoints',
            version:'1.0.0'
        },
        servers:[
            {
                url:'http://localhost:3001'
            }
        ],
        components:{
            securitySchemas:{
                bearerAuth:{
                    type:'http',
                    scheme:'bearer',
                    bearerFormat:'JWT'
                }
            }
        },security:[
            {
                bearerAuth:[]
            }
        ]
    },
    apis:["./Routes/*.js"]
}

const swaggerSpec=swaggerJSDoc(options);
app.use('/api-doc',swaggerUiExpress.serve,swaggerUiExpress.setup(swaggerSpec));
app.use('/api',account);
app.use('/api',store);
app.use('/api',company);

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