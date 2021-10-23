var knex = require("../database/connection");
var bcrypt = require("bcrypt");

class User{

    async findAll(){
        try{
            var result = await knex.select(["id","name","especialidade","cpf","role"]).table("users");
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async findByCPF(cpf){
        try{
            var result = await knex.select(["id","name","especialidade","cpf","password","role"]).where({"cpf": cpf}).table("users");

            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }

        }catch(err){
            console.log(err);
            return undefined;
        }
    }

    async new(name,especialidade,cpf,password,role){
        try{
            var hash = await bcrypt.hash(password,10);
            await knex.insert({name,especialidade,cpf,password: hash,role}).table("users");
        }catch(err){
            console.log(err);
        }
    }

    async findCPF(cpf){
        try{
            var result = await knex.select("*").from("users").where({cpf: cpf});
            
            if(result.length > 0){
                return true;
            }else{
                return false;
            }

        }catch(err){
            console.log(err);
            return false;
        }
    }

    async update(name,especialidade,cpf,password){

        var user = await this.findByCPF(cpf);

        if(user != undefined){

            var editUser = {};

            if(name != undefined && name != user.name){
                editUser.name = name;
            }
            if(especialidade != undefined && especialidade != user.especialidade){
                editUser.especialidade = especialidade;
            }
            if(password != undefined){
                var hash = await bcrypt.hash(password,10);
                editUser.password = hash;
            }

            try{
                await knex.update(editUser).where({cpf: cpf}).table("users");
                return {status: true};
            }catch(err){
                return {status: false, err: err};
            }
            
        }else{
            return {status: false,err: "O usuário não existe!"};
        }
    }

    async delete(cpf){
        var user = await this.findByCPF(cpf);
        if(user != undefined){

            try{
                await knex.delete().where({cpf: cpf}).table("users");
                return {status: true};
            }catch(err){
                return {status: false, err: err}
            }

        }else{
            return {status: false, err: "O usuário não existe no banco de dados."};
        }
    }

    async newExam(nameExam,cpf,exam,doctorName,date){
        try{
            await knex.insert({nameExam,cpf,exam,doctorName,date}).table("exames");
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = new User();