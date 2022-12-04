import express from 'express';
const router=express.Router();
import bcryptjs from 'bcryptjs';
import Account from '../models/account.js';
import jwt from 'jsonwebtoken';
import isAuth from './auth.js'

function getRandomInteger(min,max) {
    let x=Math.floor(Math.random()*(max-min+1))+min;
    return x
  }

//CRUD(Create,Read,update,Delete)

//Create new account
router.post('/CreateNewAccount',isAuth,async(req,res)=>{
    
    //Get user data
    const {firstName,lastName,email,password}= req.body;
    //Check if user exist
    Account.findAll({ where:{email:email}})
    .then(async accounts=>{
        if(accounts.length==0){
             //Crypt username password
             const hash = await bcryptjs.hash(password,10);
             const code = getRandomInteger(1000,9999);
             //Create new account
                Account.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hash,
                    isAproved: false,
                   passcode: code
                })
                .then(account_created =>{
                    return res.status(200).json({
                        message:account_created
                    })
                })
                .catch(error =>{
                    return res.status(500).json({
                        message:error.message
                    })
                })
        }

        else{
            return res.status(200).json({
                message:"Accoun not available"
            })
        }
         })
    })

//Get all account
router.get('/GetAllUsers',isAuth,async(req,res)=>{
    Account.findAll()
    .then(accounts=> {
        return res.status(200).json({
            message:accounts
        })
    })
    .catch(error=>{
        return res.status(500).json({
            message:error.message
        })
    })
})

//Update account
router.put('/UpdateAccount',isAuth,async(req,res)=>{
    const id=req.account.id;
    const {firstName,lastName}=req.body;
    Account.findByPk(id)
    .then(account =>{
        account.firstName=firstName;
        account.lastName=lastName;
        account.save()
        .then(update_account =>{
            return res.status(200).json({
                message:update_account
            })
        })
        .catch(error =>{
            return res.status(500).json({
                message:error.message
            })
        })
        })
    .catch(error=>{
        return res.status(500).json({
            message:error.message
        })
    })


})

//Delete account
router.delete('/DeleteAccount/:account_id',isAuth,async(req,res)=>{
    const acc_id=req.params.account_id;
    Account.findByPk(acc_id)
    .then(account =>{
        account.destroy()
        .then(removed =>{
            return res.status(200).json({
                message:"Account removed"
            })
        })
        .catch(error=>{
            return res.status(500).json({
                message:error.message
            })
        })
    })
    .catch(error=>{
        return res.status(500).json({
            message:error.message
        })
    })


})

//Verify
router.put('/verify',isAuth,async (req,res)=>{
    const{email,code}=req.body;
    Account.findAll({where:{email:email}})
    .then(async account=>{
        if(account.length==0){
            return res.status(200).json({
                message:"Accoun not exist"
            })
        }
        else{
            const user =account[0];
            if(code==user.passcode){
             user.isAproved=true;  
             user.save()
             .then(verify=>{
                return res.status(200).json({
                    message:verify
                })
             })
             .catch(error=>{
                return res.status(500).json({
                    message:error.message
                })
             })
            }
            else{
                return res.status(200).json({
                    message:"Code is not match"
        })
            }

        }
        })
    .catch(error=>{
        return res.status(500).json({
            message:error.message
        })
    })
})

//Login
router.post('/login',isAuth,async(req,res)=>{
    //Get data
    const{email,password}=req.body;
    //Check if exist
    Account.findAll({where:{email:email}})
    .then(async account=>{
        if(account.length>0){
            //Check password
            const user=account[0];
            const isMatch=await bcryptjs.compare(password,user.password);
            if(isMatch){
                //Check if verify
                if(user.isAproved){
                    //Create token
                    const data={
                        id:user.id,
                        name:user.firstName+' '+user.lastName,
                        email:user.email
                    }

                    const token=await jwt.sign({data},'IJalG2wlJ5OSEQYI2VpLORTT5hi30Udw');
                        return res.status(200).json({
                            user:user,
                            token:token
                        })
                }       
                //Respones
                else{
                    return res.status(200).json({
                        message:"Account is not verify"
                    })
                }
            }
            else{
                return res.status(200).json({
                    message:"Password is not match"
                })
            }
        }
        else{
            return res.status(200).json({
                message:"Account is not found"
            })
        }
    })
    .catch(error=>{
        return res.status(500).json({
            message:error.message
        })
    })



})



export default router;