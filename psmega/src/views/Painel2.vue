<template>
    <div id="corpo">
        <div id="sidebar">
            <img src="../assets/login/Logo.png" alt="">
        </div>
        
        <div v-for="user in users" :key="user.id">
            <div v-if="user.role==0">
                <button @click="saveOn(user.cpf)">
                    <div></div>
                    <div>
                        <img class="logo" src="../assets/painel/paciente.png" alt="">
                        <p class="nome">{{user.name}}</p>
                        <p class="cpf">{{user.cpf}}</p>
                    </div>
                </button>
            </div>
        </div>

        <div>
            <input type="file" name="file" multiple ref="files" />
            
            <label for="nomeLaudo">Nome do Laudo</label>
            <input type="text" name="nomeLaudo" v-model="this.laudo">


            <label for="data">Data</label>
            <input type="text" name="data" v-model="this.data" disabled>

            <button @click="sendFile">Enviar Laudo</button>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
export default {
    setNameAccount(){
        
        var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }

        axios.get("http://localhost:8686/user/"+ this.cpfAccount,req).then(res => {
            console.log(res);
            this.myProfile = res.data;
            this.nameAccount = this.myProfile.name;
        }).catch(err => {
            console.log(err);
        })
    },
    created(){
        
        var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }

        axios.get("http://localhost:8686/user",req).then(res => {
            console.log(res);
            this.users = res.data
        }).catch(err => {
            console.log(err);
        })
    },
    getCPFAccount(){
        var jwt = require("jsonwebtoken");
        var secret = "kcirnvlervhnirejpijrvn15v538483444";

        const authToken = req.headers['authorization'];

        if(authToken != undefined){
            const bearer = authToken.split(' ');
            var token = bearer[1];

            try{
                var decoded = jwt.verify(token,secret);

                this.cpfAccount = decoded.cpf;

            }catch(err){
                res.status(403);
                res.send("Token invalido!");
                return;
            }
        }
    },
    data(){
        return{
            users: [],
            myProfile: [],
            nameAccount: '',
            cpfAccount: '',
            linkImagem: '',
            paciente: '',
            data: ''
        }
    },
    methods: {
        date(){
            var data = new Date();
            var dia = String(data.getDate()).padStart(2, '0');
            var mes = String(data.getMonth() + 1).padStart(2, '0');
            var ano = data.getFullYear();

            this.data = dia + '/' + mes + '/' + ano;
        },
        async sendFile() {
            
            let dataForm = new FormData();
            for (let file of this.$refs.files.files) {
                dataForm.append(`file`, file);
            }

            let res = await fetch(`http://localhost:8686/upload`, {
                method: 'POST',
                body: dataForm,
            })

            let data = await res.json();
            console.log(data);
            this.linkImagem = data;
            this.registerLaudo();
        },
        registerLaudo(){
            axios.post("http://localhost:8686/exame",{
                nameExam: this.laudo,
                cpf: this.paciente,
                exam: this.linkImagem,
                doctorName: this.nameAccount,
                date: this.data
            }).then(res => {
                console.log(res);
                // this.sucessoRegistro();
            }).catch(err => {
                var msgErro = err.response.data.err;
                console.log(msgErro);

                this.error = msgErro; // // Tratamento de erro em tela para o usuário em vez de console.log.
            })
        },
        saveOn(cpf){
            this.paciente = cpf;
        }
    }


}
</script>

<style scoped>

#corpo {
    height: 100vh;
    width: 100vw;
    overflow:hidden;
    background-color: #EBF2F5;
}

#sidebar{
    position: absolute;
    width: 112px;
    height: 100%;

    background: #15C3D6;
    border-radius: 0px 8px 8px 0px;
}

#sidebar img{
    position: absolute;
    top: 3%;
    left: 20%;
    display: flex;
}

.logo{
    position: relative;
    height: 65px;
    left: 6%;
    top: 3%;
}

hr{
    margin-top: 5%;
    margin-bottom: 15%;
    position: relative;
    border: 1px solid rgba(46, 74, 125, 0.5);
    left:50%;
    transform: translate(-50%);
    width: 400px;
}

#lista-pacientes{
    width: 460px;
    height: 500px;
    position: absolute;
    left: 35%;
    top: 50%;
    transform: translate(-50%, -50%); 
    overflow: auto;


    background: #FFFFFF;
    border-radius: 8px;
}

.titulo{
    position: absolute;
    font-family: Nunito;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 44px;
    margin-top: 7%;
    left: 22%;

    color: #2E4A7D;
}

#lista-medicos{
    width: 460px;
    height: 500px;
    position: absolute;
    left: 75%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: auto;


    background: #FFFFFF;
    border-radius: 8px;
}

.add{
    position: relative;
    height: 45px;
    width: 45px;

    background: #2E4A7D;
    border-radius: 20px;
    left: 70%;
    margin-top: 5%;
}

.borda{
    position: absolute;
    width: 10px;
    height: 81px;

    background: #2E4A7D;
    border-radius: 8px 0px 0px 8px;

}

.usuarios{
    position: relative;
    width: 360px;
    height: 81px;
    margin-top: 5%;
    left: 50%;
    transform: translate(-50%, -50%);

    background: linear-gradient(180deg, #FFD666 0%, rgba(255, 255, 255, 0.5) 100%);
    border-radius: 8px;
}

.nome{
    position: relative;
    margin-left: 10%;
    top:20%;

    font-family: Nunito;
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    line-height: 30px;
    display: flex;
    align-items: center;

    color: #2E4A7D;
}

.cpf{
    position: relative;
    margin-left: 10%;
    top: 15%;

    font-family: Nunito;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    align-items: center;

    color: rgba(46, 74, 125, 0.6);
}

.buttonvalue{
    font-family: Nunito;
    font-style: normal;
    font-weight: 800;
    font-size: 14px;
    line-height: 19px;

    color: #FFFFFF;
}

</style>