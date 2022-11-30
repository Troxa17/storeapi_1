import express from 'express';
const router=express.Router();
import Account from '../models/account.js';
//Create new account
router.post('/CreateNewAccount',async(res,req)=>{
    
})

//Get all account
router.get('/GetAllUsers', async(req,res)=>{
    Account.findAll()
    .then(accounts=> {
        return res.status(200).json({
            message:accounts
        })
    })
    .catch(error=>{
        return res.status(500).json({
            message:error
        })
    })
})

export default router;