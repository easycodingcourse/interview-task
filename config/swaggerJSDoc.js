const swaggerJSDoc = require('swagger-jsdoc');
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Interview Task -> API',
            version: '1.0.0',
            description: 'product discount check with authentication jwt ',
            contact: {
                name: 'Md Mizanur Rahaman',
                url: 'https://easycodingcourse.com',
                email: 'mizanurrahaman592@gmail.com'
            },
            servers: ["http://localhost:3000"]
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }

    },
    apis: ['./routes/api.js'],
}
module.exports = swaggerJSDoc(swaggerOptions);