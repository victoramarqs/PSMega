var bodyParser = require('body-parser')
var express = require("express")
var app = express()
var router = require("./routes/routes")
var cors = require("cors");
let multer = require('multer');

let upload = multer({ dest: './uploads/' });
app.post('/upload', upload.array('file'), async (req, res) => {
    res.send({ upload: true, files: req.files });
});

app.use(cors());
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use("/",router);

app.listen(8686,() => {
    console.log("Servidor rodando")
});
