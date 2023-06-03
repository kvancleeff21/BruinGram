const configs = require("./configs");

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const createError = require("http-errors");

const initializeResources = require("./resources");
const errorHandler = require("./middlewares/errorHandle");
const logger = require("./utils/logger");

const app = express();

const routes = require("./api");

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.options('*', cors())
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(express.json());

// Add CORS middleware

app.use(routes);

//Handle route
app.use((req, res, next) => {
    next(
        createError.NotFound(
            "This page not found Kaelan van Cleeff"
        )
    );
});

app.use(errorHandler);

const PORT = configs.port || 8000;
const listen = async () => {
    await initializeResources();
    app.listen(PORT, () => {
        
        logger.info(
            `[server]: Server is running at http://localhost:${PORT}`
        );
        
        console.log(
            `[server]: Server is running at http://localhost:${PORT}`
        );
    });
};

listen();