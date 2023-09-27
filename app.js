const express = require('express')
const app = express()
const port = 3000
const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const type = file.mimetype.split('/')[1]
        cb(null, file.fieldname + '-' + Date.now() + "." + type)
    }
})
var upload = multer({ storage: storage })
app.post('/profile', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})