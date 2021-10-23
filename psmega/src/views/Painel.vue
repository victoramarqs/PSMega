<template>
    <div id="corpo">
        <div id="sidebar">
            <img src="../assets/login/Logo.png" alt="">
        </div>
        <div id="lista-pacientes">
            <img class="logo" src="../assets/painel/paciente.png" alt="">
            <span class="titulo">Lista de Pacientes</span>
            <button class="add" @click="modalPaciente" ><img src="../assets/painel/adicionar.png" alt=""></button>
            <hr>

            <div v-for="user in users" :key="user.id">
                <div v-if="user.role==0" class="usuarios">
                    <div class="borda">
                    </div>
                    <p class="nome">{{user.name}}</p>
                    <p class="cpf">{{user.cpf}}</p>
                    <button class="edit" @click="edit(user.cpf,user.role)"><img src="../assets/painel/editar.png" alt=""></button>
                    <button class="delete" @click="deletar(user.cpf,'paciente')" ><img src="../assets/painel/excluir.png" alt=""></button>
                </div>
            </div>
        </div>
        <div id="lista-medicos">
            <img class="logo" src="../assets/painel/medico.png" alt="">
            <span class="titulo">Lista de Médicos</span>
            <button class="add" @click="modalMedico"><img src="../assets/painel/adicionar.png" alt=""></button>
            <hr> 

            <div v-for="user in users" :key="user.id">
                <div v-if="user.role==1" class="usuarios">
                    <div class="borda">
                    </div>
                    <p class="nome">{{user.name}}</p>
                    <p class="cpf">{{user.cpf}}</p>
                    <button class="edit" @click="edit(user.cpf,user.role)"><img src="../assets/painel/editar.png" alt="" ></button>
                    <button class="delete" @click="deletar(user.cpf,'médico')" ><img src="../assets/painel/excluir.png" alt=""></button>
                </div>
            </div>
        </div>

        <table v-if="false">
            <thead>
                <th>Nome</th>
                <th>CPF</th>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <!-- <div v-if="user.role==0">
                        <td>{{user.name}}</td>
                        <td>{{user.cpf}}</td>
                        <td><button>Editar</button></td>
                    </div>

                    <div v-if="user.role==1">
                        <td>{{user.name}}</td>
                        <td>{{user.cpf}}</td>
                        <td><button>Editar</button></td>
                    </div> -->

                    <td>{{user.name}}</td>
                    <td>{{user.cpf}}</td>
                    <td><button>Editar</button></td>
                </tr>
            </tbody>
        </table>

        <div v-if="showModal" class="modal-container">
            <div v-if="cadastrarPaciente">
                <RegisterPatient @estadoModal="fecharModal"/>
            </div>
            <div v-if="editarPaciente != '' ">
                <EditPatient :editarPaciente="this.editarPaciente" @estadoModal="fecharModal"/>
            </div>
            <div v-if="deleteModal != '' " id="modal-excluir">
                <img src="../assets/painel/delete.png" alt="">
                <p>Quer realmente excluir esse {{deleteModal}}?</p>
                <button @click="deleteUser"><span class="buttonvalue">Sim</span></button>
                <button @click="fecharModal"><span class="buttonvalue">Não</span></button>
            </div>
            <div v-if="cadastrarMedico">
                <RegisterDoctor @estadoModal="fecharModal"/>
            </div>
            <div v-if="editarMedico != '' ">
                <EditDoctor  :editarMedico="this.editarMedico" @estadoModal="fecharModal"/>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import RegisterPatient from './RegisterPatient.vue';
import EditPatient from './EditPatient.vue'
import RegisterDoctor from './RegisterDoctor.vue';
import EditDoctor from './EditDoctor.vue'
export default {
    name: 'Painel',
    components: {
        RegisterPatient,
        EditPatient,
        RegisterDoctor,
        EditDoctor
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
    data(){
        return{
            users: [],
            showModal: false,
            cadastrarPaciente: false,
            deleteUserCPF: '',
            deleteModal: '',
            editarPaciente: '',
            cadastrarMedico: false,
            editarMedico: ''
        }
    },
    methods: {
        fecharModal(){
            this.showModal = false;
            this.cadastrarPaciente = false;
            this.deleteUserCPF = '';
            this.deleteModal = '';
            this.editarPaciente = '';
            this.cadastrarMedico = false;
            this.editarMedico = '';
        },
        modalPaciente: function(){
            this.showModal = true;
            this.cadastrarPaciente = true;
        },
        modalMedico: function(){
            this.showModal = true;
            this.cadastrarMedico = true;
        },
        deletar: function(cpf,paper){
            this.deleteUserCPF = cpf;
            this.deleteModal = paper;
            this.showModal = true;
        },
        deleteUser(){

            var req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }

            axios.delete("http://localhost:8686/user/"+this.deleteUserCPF,req).then(res =>{
                console.log(res);
                this.users = this.users.filter(u => u.cpf != this.deleteUserCPF);
                this.fecharModal()
            }).catch(err => {
                console.log(err);
                this.fecharModal()
            });
        },
        edit(cpf,role){
            this.showModal = true;
            if(role==0){
                this.editarPaciente = cpf;
            }
            else if(role==1){
                this.editarMedico = cpf;
            }
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

.edit{
    position: absolute;
    width: 45px;
    height: 45px;
    top: 18%;
    left: 64%;

    background: #2E4A7D;
    border-radius: 20px;
}

.delete{
    position: absolute;
    width: 45px;
    height: 45px;
    top: 18%;
    left: 80%;

    background: #2E4A7D;
    border-radius: 20px;

}

.modal-container{
    width:100vw;
    height: 100vh;
    background: rgba(0,0,0,.6);
    position:fixed;
    top:0px;
    left:0px;
    z-index:2000;
    display: flex;
    justify-content: center;
    align-items: center;
}
#modal-excluir{
    width: 398px;
    height: 155px;

    background: linear-gradient(180deg, #EBF2F5, #EBF2F5);
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 8px;
}

#modal-excluir img{
    width: 30px;
    height: 25px;
    position: absolute;
    margin-left: 1%;
    margin-top: 1.5%;
}

#modal-excluir p{
    position: relative;
    font-family: Nunito;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 19px;
    margin-left: 15%;
    margin-top: 7%;

    color: #3C5D95;

}

#modal-excluir button{
    position: relative;
    width: 60px;
    height: 27px;
    border-radius: 8px;
    background: #2E4A7D;
    justify-content: center;
    left: 58%;
    top: 35%;
    margin-left: 3%;

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