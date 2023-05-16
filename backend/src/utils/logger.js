const winston = require("winston");

const { createLogger, format } = winston;
const { combine, colorize, printf, timestamp } = format;

// Define log format
const logFormat = printf(
    ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
);

const logger = createLogger({
    level: "info",
    format: format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({
            filename: "./logs/error.log",
            level: "error",
        }),
        new winston.transports.File({ filename: "./logs/combined.log" }),
    ],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: combine(
                colorize(),
                timestamp({
                    format: "YYYY-MM-DD HH:mm:ss",
                }),
                logFormat
            ),
        })
    );
}
module.exports = logger;