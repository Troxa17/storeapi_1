import express from 'express';
const router=express.Router();
import company from '../models/company.js'
/**x`
 * @swagger
 * /api/company/Get_categories:
 *  get:
 *   summary: Get a list of all categories
 *   description: This is some description about getting all categories
 *   responses:
 *    200:
 *     description: Succes
 *    500:
 *     description:Error in this operation
 */

router.get('/Get_categories',async(req,res)=>{
    company.findAll()
    .then(async category=>{
        return res.status(200).json({
            message:category
        })
    })
    .catch(error=>{
        return res.status(500).json({
            message:error.message
        })
    })

})


export default router