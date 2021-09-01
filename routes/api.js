var express = require('express');
const checkUserToken = require('../auth/checkUserToken');
const { discountCheck } = require('../controller/discount.controller');
const { dummyContent } = require('../data/dummyContentGenerator');
const { userLogin } = require('../controller/user.controller');
var router = express.Router();

/**
 * @swagger
 * definitions:
 *   Login:
 *     properties:
 *       email:
 *         type: string
 *         required: true
 *         description: email of the user
 *         example: 'demo@gmail.com'
 *       password:
 *         type: string
 *         description: email of the user
 *         required: true
 *         example: '12345'
 * 
 */

/**
 * @swagger
 * /api/login :
 *  post:
 *   summary: User login
 *   description: user login first for token then you call others api..
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Login'
 *   responses:
 *    200:
 *     description: Succesfully Login
 */

router.post('/login', userLogin)





/**
 * @swagger
 * /api/checkDiscount :
 *  get:
 *   summary: check Discount
 *   description: check product discount
 *   security:
 *      - bearerAuth: []
 *   parameters:
 *      - in: query
 *        name: productId
 *        schema:
 *          type: integer
 *        required: true
 *        example: 1
 *      - in: query
 *        name: finalAmount
 *        schema:
 *          type: number
 *        required: true
 *        example: 10150.55555
 *      - in: query
 *        name: userId
 *        schema:
 *          type: integer
 *        required: true
 *        example: 1
 *   responses:
 *    200:
 *     description: This product will not receiced any discount or (calculation if exists)
 *    401:
 *     description: Access denied! unauthorized user
 *    403:
 *     description: Invalied token
 */

router.get('/checkDiscount', checkUserToken, discountCheck)










/**
 * @swagger
 * /api/dummy-data :
 *  get:
 *   summary: Generate Dummy data for testing discount check 
 *   description: All data automatically generate with relation base when call this api . just call . ( users / products / categorys / subCategorys / discounts ) table data bulkensert
 *   responses:
 *    200:
 *     description: Successfully create dummy content
 */





// just call it for dummy content & its automatically generate all data with relation base.
// for testing purpose ->
router.get('/dummy-data', dummyContent)



module.exports = router;
