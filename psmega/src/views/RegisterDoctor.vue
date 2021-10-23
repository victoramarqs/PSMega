<template>
    <div id="container-medico">
        <div id="esquerda">
            <img src="../assets/register-doctor/esquerda.png" alt="">
        </div>
        <div id="direita">
            <h1 id="title">Cadastrar <span id="subtitle">Médico</span></h1>

            <!-- <div v-if="error != undefined">
                <p>{{error}}</p>
            </div> -->
            
            <!-- <form action=""> -->
            
            <div>
                <input id="Rectangle90" type="text" placeholder="Nome Completo" v-model="name">
                <img id="icon-name" class="icon" src="../assets/register-patient/iconNome.png" alt="">
            </div>

            <div>
                <input type="text" placeholder="Especialidade" v-model="especialidade">
                <img id="icon-speciality" class="icon" src="../assets/register-doctor/iconStethoscope.png" alt="">
            </div>

            <div>
                <input type="text" placeholder="CPF" v-model="cpf" v-mask="'###.###.###-##'">
                <img id="icon-cpf" class="icon" src="../assets/register-patient/iconCPF.png" alt="">
            </div>

            <div>
                <input type="password" placeholder="Senha" v-model="password">
                <img id="icon-pass" class="icon" src="../assets/login/iconPass.png" alt="">
            </div>

            <div>
                <input type="password" placeholder="Confirmar Senha" v-model="passwordConfirmation">
                <img id="icon-repass" class="icon" src="../assets/login/iconPass.png" alt="">
            </div>

            <button id="Rectangle94" @click="registerConfirmation" @dblclick="eventoFecharModal"><span id="Cadastrar">Cadastrar</span></button>
            <!-- </form> -->

        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            name: '',
            especialidade: '',
            cpf: '',
            password: '',
            passwordConfirmation: '',
            error: undefined
        }
    },
    methods:{
        registerConfirmation : function(){
            if(this.passwordConfirmation == this.password)
                this.register();
            else
                console.log("As senhas devem ser a mesma!");
        },
        register(){
            axios.post("http://localhost:8686/user",{
                name: this.name,
                especialidade: this.especialidade,
                cpf: this.cpf,
                password: this.password,
                role: 1
            }).then(res => {
                console.log(res);
                this.sucessoRegistro();
            }).catch(err => {
                var msgErro = err.response.data.err;
                console.log(msgErro);

                this.error = msgErro; // // Tratamento de erro em tela para o usuário em vez de console.log.
            })
        },
        sucessoRegistro : function(){
            alert("Médico cadastrado com sucesso!");
            document.location.reload(true);
        },
        eventoFecharModal(){
            this.$emit('estadoModal',false);
        }
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800&display=swap');

    #container-medico {
        width: 800px;
        height: 500px;
        display: flex;

        background: #FFFFFF;
        border-radius: 8px;
    }

    #title{
        position: absolute;
        font-family: Nunito;
        font-style: normal;
        font-weight: 800;
        font-size: 36px;
        line-height: 49px;
        margin-left: 3.5%;
        margin-top: 1%;

        color: #2E4A7D;
    }

    #subtitle {
        font-family: Nunito;
        font-style: normal;
        font-weight: 800;
        font-size: 36px;
        line-height: 49px;
        /* display: flex;
        align-items: center; */

        color: #ff738a;
    }

    #Rectangle90 {
        margin-top: 35%;
    }

    #Rectangle94 {
        width: 300px;
        height: 51px;

        position: relative;
        margin-top: 15%;
        margin-left: 20%;

        background: #2E4A7D;
        border-radius: 16px;
    }

    input {
        width: 300px;
        height: 40px;
        padding-left: 45px;
        margin-top: 5%;
        margin-left: 20%;

        position: relative;
        background: #F5F5F5;
        border: 1px solid #2E4A7D;
        box-sizing: border-box;
        border-radius: 8px;
    }

    .icon{
        position: absolute;
        margin-left: 4.7%;
        margin-top: -2%;
    }

    #Cadastrar {
        font-family: Nunito;
        font-style: normal;
        font-weight: bold;
        font-size: 22px;
        line-height: 30px;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
    }

</style>