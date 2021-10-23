class HomeController{

    async index(req, res){
        res.send("APP EXPRESS! - Guia do programador");
    }

    async validate(req,res){
        res.send("Login efetuado com sucesso!")
    }

}

module.exports = new HomeController();