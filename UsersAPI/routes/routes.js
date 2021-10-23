var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var AdminAuth = require("../middleware/AdminAuth");

router.get('/', HomeController.index);
router.post('/user', UserController.create);
router.get("/user",AdminAuth, UserController.index);
router.get("/user/:cpf",AdminAuth, UserController.findUser);
router.put("/user",AdminAuth, UserController.edit);
router.delete("/user/:cpf",AdminAuth, UserController.remove);
router.post("/login", UserController.login);
router.post("/validate",AdminAuth,HomeController.validate);
// router.post("/exame",UserController.novoExame);

module.exports = router;