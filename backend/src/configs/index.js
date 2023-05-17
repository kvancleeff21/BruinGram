const dotenv = require("dotenv");
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

console.log(process.env.NODE_ENV);
console.log(process.env.PORT);
module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    mongodb: {
        uri: "mongodb+srv://kvancleeff:cp0EX86bL6ufRdNB@bgram.zdd2jsv.mongodb.net/?retryWrites=true&w=majority",
    },
    jwt: {
        accessTokenSecret: "MYSECRETTOKEN",
        refreshTokenSecret: "MYREFRESHSECRETTOKEN",
    },
    cloudinary: {
        cloudName: "bruingram",
        apiKey: "171582938858184",
        apiSecret: "AMjOPezJdo0zVr9N1EibtIPRyf8",
    },
};