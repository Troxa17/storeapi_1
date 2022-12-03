import jwt from "jsonwebtoken";
import { INET } from "sequelize";
import Account from '../models/account.js'


export default(req,res,next)=>{
    const header=req.headers['authorization'];
    console.log(header);
    if(header){
        const bearer=header.split(' ');
        const token=bearer[1];

        jwt.verify(token, 'IJalG2wlJ5OSEQYI2VpLORTT5hi30Udw',(err,authdata)=>{
            if(err){
                return res.sendStatus(401);
            }
            else{
                Account.findByPk(authdata.data.id)
                .then(user =>{
                    req.account=user;
                    next();

                })
                .catch(error =>{
                    return res.status(500).json({
                        message:error.message
                    })
                })
                
            }
        })
    }
    else{
        return res.sendStatus(401);
    }

}

