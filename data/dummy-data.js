var bcrypt = require('bcryptjs');
const moment = require('moment');
const {getRandomNumber } = require('../utils/utils');
const dataFormat = "YYYY-MM-DD HH:mm:ss";
const dummyUsers = [{
  firstName: 'John',
  lastName: 'Doe',
  email: `john${getRandomNumber(3)}@gmail.com`,
  phone: `018${getRandomNumber(8)}`,
  password: bcrypt.hashSync("12345", bcrypt.genSaltSync(10))
},
{
  firstName: 'Mizanur',
  lastName: 'Rahaman',
  email: `mizan${getRandomNumber(3)}@gmail.com`,
  phone: `018${getRandomNumber(8)}`,
  password: bcrypt.hashSync("12345", bcrypt.genSaltSync(10))
},
{
  firstName: 'kamal',
  lastName: 'Doe',
  email: `kamal${getRandomNumber(3)}@gmail.com`,
  phone: `018${getRandomNumber(8)}`,
  password: bcrypt.hashSync("12345", bcrypt.genSaltSync(10))
},
{
  firstName: 'yasin',
  lastName: 'Doe',
  email: `yasin${getRandomNumber(3)}@gmail.com`,
  phone: `018${getRandomNumber(8)}`,
  password: bcrypt.hashSync("12345", bcrypt.genSaltSync(10))
}]

const dummyProduct = [{
  name: 'relieve fatigue - Fascia Gun',
  thumbnail: 'Doe',
  sku: `sdjkeor${getRandomNumber(5)}`,
  price: 2000.00,
  msrp: 2500.00,
  subCategoryId: null,
  stock: 100,
  discountId: 100
},
{
  name: 'Amazing Price 12 Pairs/Set ',
  thumbnail: 'Doe',
  sku: `deklph${getRandomNumber(5)}`,
  price: 8000.00,
  msrp: 10.00,
  subCategoryId: null,
  stock: 100,
  discountId: 100
},
{
  name: 'USLION Magnetic USB Cable F',
  thumbnail: 'Doe',
  sku: `erydf${getRandomNumber(5)}`,
  price: 1500.00,
  msrp: 2000.00,
  subCategoryId: null,
  stock: 100,
  discountId: 100
},
{
  name: 'Light Weight 5g And Compa',
  thumbnail: 'Doe',
  sku: `johnd${getRandomNumber(5)}`,
  price: 100.00,
  msrp: 100.00,
  subCategoryId: null,
  stock: 100,
  discountId: 100
}]


const dummyCategorys = [{
  name: "Women's Fashion"
},
{
  name: "Men's Fashion"
}]



const dummySubCategory = [{
  name: "Dresses",
  categoryId: null
},
{
  name: "Tees",
  categoryId: null
},
{
  name: 'Blouses & Shirts',
  categoryId: null
},
{
  name: 'Hoodies & Sweatshirts',
  categoryId: null
}]




const dummyDiscounts = [{
  name: "discount offer name 0",
  discountPercentage: 15.2,
  startingDate: moment().format(dataFormat),
  expiryDate: moment(moment().format(), dataFormat).add(5, 'days')
},{
  name: "discount offer name 1",
  discountPercentage: 7.5,
  startingDate: moment().format(dataFormat),
  expiryDate: moment(moment().format(), dataFormat).add(5, 'days')
},{
  name: "discount offer name 2",
  discountPercentage: 7.5,
  startingDate: moment().format(dataFormat),
  expiryDate: moment(moment().format(), dataFormat).add(5, 'days')
},
{
  name: "discount offer name 3",
  discountPercentage: 7.5,
  startingDate: moment(moment().format(), dataFormat).add(2, 'days'),
  expiryDate: moment(moment().format(), dataFormat).add(5, 'days')
},
{
  name: "discount offer name 4",
  discountPercentage: 10.5,
  startingDate: moment("2021-08-17 12:00:00").format(dataFormat),
  expiryDate: moment("2021-08-25 12:00:00").format(dataFormat)
}]


module.exports = {
  dummyUsers,
  dummyDiscounts,
  dummyCategorys,
  dummySubCategory,
  dummyProduct

}