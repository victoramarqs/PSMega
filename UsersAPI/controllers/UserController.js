var User = require("../models/User");
var jwt = require("jsonwebtoken");
var secret = "kcirnvlervhnirejpijrvn15v538483444";

var bcrypt = require("bcrypt");

class UserController {
    async index(req, res) { 
        var users = await User.findAll();
        res.json(users);
    }

    async findUser(req, res){
        var cpf = req.params.cpf;
        var user = await User.findByCPF(cpf);
        
        if(user == undefined){
            res.status(404);
            res.json({});
        }else{
            res.json(user);
        }
    }

    async create(req, res) {
        var { name, especialidade, cpf, password, role } = req.body;

        if(cpf == undefined || cpf == '' || cpf == ' '){
            res.status(400);
            res.json({err: "O CPF deverá ser informado!"});
            return;
        }if(password == undefined || password == '' || password == ' '){
            res.status(400);
            res.json({err: "A senha deverá ser informada!"});
            return;
        }

        var emailExists = await User.findCPF(cpf)

        if (emailExists) {
            res.status(406);
            res.json({ err: "O usuário já possui cadastro!" });
            return;
        }


        await User.new(name, especialidade, cpf, password, role);

        res.status(200);
        res.send("Usuário cadastrado com sucesso!");
    }

    async edit(req,res){
        var {name,especialidade,cpf,password} = req.body;
        var result = await User.update(name,especialidade,cpf,password);
        if(result != undefined){
            if(result.status){
                res.status(200);
                res.send("Os dados foram alterados com sucesso!");
            }else{
                res.status(406);
                res.send(result.err);
            }
        }else{
            res.status(406);
            res.send("Ocorreu um erro no servidor da aplicação!");
        }
    }

    async remove(req,res){
        var cpf = req.params.cpf;

        var result = await User.delete(cpf);

        if(result.status){
            res.status(200);
            res.send("Usuário deletado com sucesso!")
        }else{
            res.status(406);
            res.send(result.err);
        }
    }

    async login(req,res){
        var {cpf, password} = req.body;
        var user = await User.findByCPF(cpf);

        if(user != undefined){

            var resultado = await bcrypt.compare(password,user.password);
            // res.json({status: resultado});
            if(resultado){

                var token = jwt.sign({ cpf: user.cpf, role: user.role }, secret);

                res.status(200);
                res.json({token: token});

            }else{
                res.status(406);
                res.json({err: "A senha está incorreta, por favor tente novamente."});
            }

        }else{

            res.status(406);
            res.json({status: false, err: "O usuário não existe!"});

        }

    }


    async novoExame(req,res){
        var { nameExam, cpf, exam, doctorName, date } = req.body;

        var user = await User.findByCPF(cpf);

        if(user != undefined){

            if(cpf == undefined || cpf == '' || cpf == ' '){
                res.status(400);
                res.json({err: "O CPF deverá ser informado!"});
                return;
            }
            if(nameExam == undefined || nameExam == '' || nameExam == ' '){
                res.status(400);
                res.json({err: "O laudo necessita de um nome!"});
                return;
            }
            if(exame == undefined || exame == '' || exame == ' '){
                res.status(400);
                res.json({err: "Você deve inserir o exame do paciente!"});
                return;
            }

            await User.newExam(nameExam,cpf,exam,doctorName,date);

            res.status(200);
            res.send("Exame enviado com sucesso!");
            
        }
    }
}

module.exports = new UserController();