const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        errors: {
            message: err.message,
            status: err.status,
        },
    });
};

module.exports = errorHandler;