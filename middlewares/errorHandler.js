function errorHandler(err, req, res, next) {
    let message = 'Internal Server Error'
    let code = 500

    switch (err.name) {
        case "SequelizeValidationError":
            code = 400
            message = err.errors[0].message
            break;
        case "NotFound":
            code = 404
            message = "Data Not Found"
            break;
    }
    res.status(code).json(message)
}

module.exports = errorHandler