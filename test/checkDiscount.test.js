const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')

//Assertion Style
chai.should()

chai.use(chaiHttp)


const productId = 1;
const noDiscountProductId = 3;
let finalAmount = 10150.555;
const userId = 2;
// token must be have to same user
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidGltZSI6IjIwMjEtMDgtMzFUMDc6Mzg6MjIuNTg5WiIsImlhdCI6MTYzMDM5NTUwMn0.cStExuFm2XusOur36agiZsRVu_5KcYwm_c2Fm6x1OCg";

const params = `?productId=${productId}&finalAmount=${finalAmount}&userId=${userId}`;


describe('Test Check Discount Api', () => {


    // call without authentication token
    describe("GET /api/checkDiscount", () => {
        it("without authentication token", () => {
            chai.request(server)
                .get(`/api/checkDiscount${params}`)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eq(false)
                    res.body.should.have.property('message').eq("Access denied! unauthorized user");
                    
                })
        })
        
    })


    // call with invalid token 
    describe("GET /api/checkDiscount", () => {
        it("with authentication token but Invalid", () => {
            chai.request(server)
                .get(`/api/checkDiscount${params}`)
                .set({ "Authorization": `Bearer wromg${token}` })
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eq(false)
                    res.body.should.have.property('message').eq("Invalid token")
                })
        })
    })



    // call with valid token but token user and requested user not same
    describe("GET /api/checkDiscount", () => {
        it("with valid authentication token & params but token is not for the requested user", () => {
            chai.request(server)
                .get(`/api/checkDiscount?productId=${productId}&finalAmount=${finalAmount}&userId=${100000}`)
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eq(false)
                    res.body.should.have.property('message').eq("unauthorized user.")
                })
        })
    })


    // call with token but without any params  or missing some params
    describe("GET /api/checkDiscount", () => {
        it("missing some params", () => {
            chai.request(server)
                .get(`/api/checkDiscount`)
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eq(false)
                    res.body.should.have.property('message').eq("Bad Request.. missing field")
                })
        })
    })





    // invalid product 
    describe("GET /api/checkDiscount", () => {
        it("invalid product ", () => {
            chai.request(server)
                .get(`/api/checkDiscount?productId=${10000000}&finalAmount=${finalAmount}&userId=${userId}`)
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eq(false)
                    res.body.should.have.property('message').eq("product not found")
                })
        })
    })





    // product  not received any discount (  give a product id there no discount )
    describe("GET /api/checkDiscount", () => {
        it("not received any discount ", () => {
            chai.request(server)
                .get(`/api/checkDiscount?productId=${noDiscountProductId}&finalAmount=${finalAmount}&userId=${userId}`)
                .set({ "Authorization": `Bearer ${token}`})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eq(false)
                    res.body.should.have.property('message').eq("This product will not receiced any discount")
                })
        })
    })




    // product  get discount
    describe("GET /api/checkDiscount", () => {
        it("product got discount ", () => {
            chai.request(server)
                .get(`/api/checkDiscount${params}`)
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eq(true);
                    res.body.should.have.property('discountAmount');
                    res.body.should.have.property('beforeDiscount');
                    res.body.should.have.property('afterDiscount');
                    res.body.should.have.property('percentage');
                })
        })
    })



})