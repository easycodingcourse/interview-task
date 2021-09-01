const Products = require('../models').Products
const Discounts = require('../models').Discounts
const SubCategorys = require('../models').SubCategorys
const Categorys = require('../models').Categorys
const { Op } = require('sequelize')
const { discountCalculate} = require('../utils/utils')

const discountCheck = async (req, res, next) => {

    const { productId, userId, finalAmount } = req.query

    if (!productId || !userId || !finalAmount) {
        return res.json({ status: false, message: "Bad Request.. missing field" })
    }


    // We get userId from Authentication token . There is no need to send userId separately . 
    // But If you want to check whether requested userId & token userId are equal then we can check this condition. others no need
    if (req.accessUserId != userId) {
        return res.status(401).json({ status: false, message: "unauthorized user." })
    }


    // Discount startingDate & expiryDate Condition with active . just a object
    const discountWhereCondition = {
        where: {
            status: 1,
            startingDate: {
                [Op.lt]: new Date()
            },
            expiryDate: {
                [Op.gt]: new Date()
            }
        }
    }



    // database call , If there is a discount on the product //
    // structure = (products table => subCategorys table =>  categorys table ) & check discounts table in every level
    const product = await Products.findOne({
        include: [
            {
                model: Discounts,
                as: "productDiscount",
                ...discountWhereCondition,
                required: false,
            },
            {
                model: SubCategorys,
                as: "subCategory",
                include: [
                    {
                        model: Categorys,
                        as: "category",
                        include: {
                            model: Discounts,
                            as: "categoryDiscount",
                            ...discountWhereCondition,
                            required: false,
                        }
                    },
                    {
                        model: Discounts,
                        as: "subCategoryDiscount",
                        ...discountWhereCondition,
                        required: false,
                    }
                ]
            }
        ],
        where: {
            id: productId
        }
    }).catch(error=>console.log(error))



    if (!product) {
        return res.json({ status: false, message: 'product not found' })
    }



    // first priority => 
    // if there is any discount in the product level directly, then have to calculate and return.
    if (product.productDiscount) {
        successResponse(res, discountCalculate(finalAmount, product.productDiscount.discountPercentage))
    }



    // second priority => 
    // If no disocunt is found within the product then check the sub-categorys to see . 
    // if there are any discounts in the categorys then calculate and return
    if (product.subCategory.subCategoryDiscount) {
        const { discountPercentage } = product.subCategory.subCategoryDiscount
        successResponse(res, discountCalculate(finalAmount, discountPercentage))
    }



    // third priority =>  
    // If no disocunt is found within the product lavel & its subCategory lavel then 
    // try to find its category level discount  -- if exists
    if (product.subCategory.category.categoryDiscount) {
        const { discountPercentage } = product.subCategory.category.categoryDiscount
        successResponse(res, discountCalculate(finalAmount, discountPercentage))
    }


    
    res.json({
        status: false,
        message: "This product will not receiced any discount"
    })
}




const successResponse = (res, object) => {
    return res.json({ status: true, ...object })
}




module.exports = {
    discountCheck
}