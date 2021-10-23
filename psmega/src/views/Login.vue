<template>
    <div id="tela-login">
        <img id="logo" src="../assets/login/Logo.png" alt="">
        <p id="logo-title">Duck</p>
        <p id="logo-subtitle">Health</p>

        <div id="form-login">
            <h1 id="title">Bem-vindo</h1>
            <p id="subtitle">Acesse seus <span id="subtitle2">&nbsp;laudos&nbsp;</span> agora!</p>

            <!-- <div v-if="error != undefined">
                <p>{{error}}</p>
            </div> -->
            
            <!-- <form action=""> -->

            <div>
                <input id="Rectangle91" type="text" placeholder="Escreva aqui seu CPF" v-model="cpf" v-mask="'###.###.###-##'" autocomplete="off">
                <img id="icon-cpf" src="../assets/login/iconCPF.png" alt="">
            </div>

            <div>
                <input id="Rectangle92" type="password" placeholder="Escreva aqui a senha" v-model="password">
                <img id="icon-pass" src="../assets/register-patient/iconPass.png" alt="">
            </div>

            <button id="Rectangle94" @click="logar"><span id="Entrar">Entrar</span></button>
            
            <div class="forget">
                <img src="../assets/login/forgot.png" alt="">
                <span id="text-recoverpass">&nbsp;Esqueceu sua senha?&nbsp;</span>
                <a href="../reset" id="text-recoverpass2">Clique aqui!</a>

            </div>

            <!-- </form> -->

        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            cpf: '',
            password: '',
            error: undefined
        }
    },
    methods:{
        logar(){
            axios.post("http://localhost:8686/login",{
                cpf: this.cpf,
                password: this.password
            }).then(res => {
                console.log(res);
                localStorage.setItem('token',res.data.token);
                this.$router.push({name: 'Painel'})
            }).catch(err => {
                var msgErro = err.response.data.err;
                this.error = msgErro; // Tratamento de erro em tela para o usuário em vez de console.log e alert.

                alert(msgErro);
            })
        }
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800&display=swap');

    #tela-login {
        height: 100vh;
        width: 100vw;
        overflow:hidden;
        background-color: #EBF2F5;
    }

    #logo{
        position: absolute;
        top: 5%;
        left: 4%;
    }

    #logo-title{
        position: absolute;
        left: 8.5%;
        top: 5%;

        font-family: Nunito;
        font-style: normal;
        font-weight: 800;
        font-size: 24px;
        line-height: 33px;
        display: flex;
        align-items: center;

        color: #FFD666;
    }

    #logo-subtitle{
        position: absolute;
        left: 8.5%;
        top: 9%;

        font-family: Nunito;
        font-style: normal;
        font-weight: 800;
        font-size: 24px;
        line-height: 33px;
        display: flex;
        align-items: center;

        color: #00DDF9;

    }

    #form-login{
        width: 500px;
        height: 500px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%); 
        

        background: url("../assets/login/form-login.png");
        border-radius: 8px;
    }

    #title {
        position: relative;
        display: flex;
        top: 5%;
        justify-content: center;

        font-family: Nunito;
        font-style: normal;
        font-weight: 800;
        font-size: 36px;
        line-height: 49px;

        color: #FFFFFF;

    }

    #subtitle {
        position: relative;
        display: flex;
        top: 5%;
        justify-content: center;

        font-family: Nunito;
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 33px;

        color: #FFFFFF;
    }

    #subtitle2{
        color: #FFD666;
    }

    input {
        width: 300px;
        height: 40px;
        padding-left: 50px;
    }

    #Rectangle91 {
        /* margin-top: 37%; */
        width: 400px;
        height: 50px;
        position: relative;
        left: 50%;
        margin-top: 15%;
        
        transform: translate(-50%); 
        



        background: #F5F5F5;
        border: 1px solid #2E4A7D;
        box-sizing: border-box;
        border-radius: 8px;
    }

    #icon-cpf {
        position: absolute;
        left:13%;
        top:34%;

    }

    #Rectangle92 {
        /* margin-top: 5%; */
        width: 400px;
        height: 50px;
        position: relative;
        left: 50%;
        margin-top: 5%;
        
        transform: translate(-50%); 

        background: #F5F5F5;
        border: 1px solid #2E4A7D;
        box-sizing: border-box;
        border-radius: 8px;
    }

    #icon-pass{
        position: absolute;
        left: 13%;
        top: 49.5%;
    }

    #Rectangle94 {
        width: 400px;
        height: 60px;

        position: relative;
        left: 50%;
        margin-top: 10%;
        
        transform: translate(-50%); 

        background: #FFD666;
        border-radius: 8px;
    }

    #Entrar {
        font-family: Nunito;
        font-style: normal;
        font-weight: bold;
        font-size: 22px;
        line-height: 30px;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
    }

    .forget{
        position: relative;
        margin-top: 5%;
        display: flex;
        justify-content: center;
    }

    #text-recoverpass{

        font-family: Nunito;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 27px;

        color: #FFFFFF;
    }

    #text-recoverpass2{
        font-family: Nunito;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 27px;

        color: #FFD666;
    }
</style>