require("dotenv").config();

module.exports = {
    APP_DB: process.env.APP_DB, 
    PORT : process.env.PORT,
    SECRECT_KEY : process.env.SECRET_KEY,
    HOST : process.env.HOST,
    TOKEN_LIFE : process.env.TOKEN_LIFE
};
