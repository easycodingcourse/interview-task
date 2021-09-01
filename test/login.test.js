const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')


//Assertion Style
chai.should()

chai.use(chaiHttp)

const vaildUserMail = "mizan63618@gmail.com"
const vaildUserPassword = "12345"

describe('Test Login Api', () => {


    // login api call with valid credential
    describe("POST /api/login -> valid credential", () => {
        it("Call with valid credential & received a token->'xyz' , message->login success", () => {
            chai.request(server)
                .post("/api/login")
                .send({
                    email: vaildUserMail,
                    password: vaildUserPassword
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eq(true)
                    res.body.should.have.property('accessToken')
                    res.body.should.have.property('message').eq("Successfully login")
                })
        })
    })




    // login api call without any credential
    describe("POST /api/login", () => {
        it("call without any credential & error message missing field", () => {
            chai.request(server)
                .post("/api/login")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eq(false)
                    res.body.should.have.property('message').eq("missing field")
                })
        })
    })



    // login api call with wrong email id
    describe("POST /api/login", () => {
        it("call with wrong email id and received user not register", () => {
            chai.request(server)
                .post("/api/login")
                .send({
                    email: "wrong@gmail.com",
                    password: vaildUserPassword
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eq(false)
                    res.body.should.have.property('message').eq("user not register.")
                })
        })
    })


    // login api call with wrong password
    describe("POST /api/login", () => {
        it("call with wrong password & message->'password Not match.'", () => {
            chai.request(server)
                .post("/api/login")
                .send({
                    email: vaildUserMail,
                    password: "123"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eq(false)
                    res.body.should.have.property('message').eq("password Not match")
                })
        })
    })





})