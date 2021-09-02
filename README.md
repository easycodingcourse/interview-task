# Interview task
### Node Js Test
Let’s assume we have a payment sub-system. This system is supposed to check whether the given validated invoice can get a discount or not.

**In this test we need an endpoint as follows:**


**Input:** product code or product name, the user's ID and the invoice final amount..

**Response**: If it includes the discount, the discount percentage that can be considered for the given invoice..


Applying the discount:
If the product has a discount this discount has a priority and will be returned. Otherwise, we move to its parent category (if it exists) and check if it has a discount and so on until the product-category chain is done. If no discount was found the API should return -1.

For simplicity, you can only consider 2 layers of this structure and we have one product from one category, Which is this category is another subset of categories


### Database
![database table structure](https://raw.githubusercontent.com/easycodingcourse/interview-task/main/database-stracture-1.png "database table structure")




## Api

### Make total 3 api
1. login api with jwt token
2. discountCheck api
3. dummy-data api for auto generate all data with relation base.

### extra add
* also add unit test with **mocha & chai**
* add swagger for api-documentation

