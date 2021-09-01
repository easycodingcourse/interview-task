const Users = require('../models').Users
const Discounts = require('../models').Discounts
const Products = require('../models').Products
const Categorys = require('../models').Categorys
const SubCategorys = require('../models').SubCategorys
const { dummyUsers, dummyDiscounts, dummyCategorys, dummySubCategory, dummyProduct } = require('./dummy-data')
const { getRandomNumberBetween } = require('../utils/utils')



module.exports = {

    dummyContent: async (req, res, next) => {

        try {
            await Users.bulkCreate(dummyUsers).catch(error => console.log(error))
            const discounts = await Discounts.bulkCreate(dummyDiscounts).catch(error => console.log(error))
            
            var newCategory = [];
            
            dummyCategorys.forEach(item => {
                newCategory.push({ ...item, discountId: discounts[getRandomNumberBetween(0, discounts.length-1)].id })
            });

            
            
            const categorys = await Categorys.bulkCreate(newCategory).catch(error => console.log(error))

            var newSubCategorys = [];

            dummySubCategory.forEach(item => {
                newSubCategorys.push({ ...item, categoryId: categorys[getRandomNumberBetween(0, categorys.length-1)].id,discountId:discounts[getRandomNumberBetween(0, discounts.length-1)].id })
            });

            const subCategorys = await SubCategorys.bulkCreate(newSubCategorys).catch(error => console.log(error))

            var newProduct = [];

            dummyProduct.forEach((item,index) => {
                if(dummyProduct.length-1===index){
                    newProduct.push({ ...item, subCategoryId: subCategorys[getRandomNumberBetween(0, subCategorys.length-1)].id, discountId: null })
                }else{
                    newProduct.push({ ...item, subCategoryId: subCategorys[getRandomNumberBetween(0, subCategorys.length-1)].id, discountId: discounts[getRandomNumberBetween(0, discounts.length-1)].id })
                }
            });

            await Products.bulkCreate(newProduct).catch(error => console.log(error))

            res.json({ status: true, message: "Successfully create dummy content" })

        } catch (error) {
            res.json({ status: false, error })
        }

    }

}