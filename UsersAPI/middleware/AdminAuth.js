var jwt = require("jsonwebtoken");
var secret = "kcirnvlervhnirejpijrvn15v538483444";

module.exports = function(req,res,next){
    const authToken = req.headers['authorization'];

    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];

        try{
            var decoded = jwt.verify(token,secret);

            if(decoded.role == 2){
                next();
            }else{
                res.status(403);
                res.send("Você não tem permissão para acesso!");
                return;
            }

        }catch(err){
            res.status(403);
            res.send("Token invalido!");
            return;
        }
        
    }else{
        res.status(403);
        res.send("Você precisa se autenticar");
        return;
    }

}