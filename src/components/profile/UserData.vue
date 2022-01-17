<template>
  <div>
    <h2>Dados pessoais </h2>
    <div class="d-flex align-items-center mt-5">
      <div class="d-flex flex-column align-items-start">
        <label for="nome">Nome</label>

        <input
          type="text"
          disabled
          :value="userData.username"
        >
      </div>
      <div class="d-flex flex-column align-items-start">
        <label for="nome">Email</label>
        <input
          type="text"
          :value="userData.email"
          disabled
        >
      </div>
      <div class="d-flex flex-column align-items-start">
        <label for="nome">Telefone</label>
        <input
          type="text"
          disabled
          :value="userData.telefone"
        >
      </div>
      <div class="d-flex flex-column align-items-start">
        <label for="nome">Razão Social</label>
        <input
          type="text"
          :value="userData.razaoSocial"
          disabled
        >
      </div>

    </div>
    <h2 class="mt-5 mb-5 d-flex align-items-center">
      Dados de entrega
      <span
        class="edit"
        @click="setEditMode"
      > <Edit :fill-color="fillColor" /></span>
    </h2>
    <form
      class=""
      @submit.prevent="formSubmit"
    >

      <div class="d-flex flex-column align-items-start">
        <label
          for="cep"
        > CEP <span class="text-danger"> * </span> </label>
        <input
          id="cep"
          v-model="cep"
          type="number"
          pattern="[0-9]*"
          inputmode="numeric"
          :disabled="viewMode"
          class="cep"
          required
          @blur="getAddress"
        >
      </div>
      <div class="d-flex">
        <div class="d-flex flex-column align-items-start">
          <label
            for="logradouro"
          > Logradouro <span class="text-danger"> * </span> </label>
          <input
            id="logradouro"
            v-model="logradouro"
            type="text"
            :disabled="viewMode"
            class="logradouro"
            required
          >
        </div>
        <div class="d-flex flex-column align-items-start">
          <label
            for="bairro"
          > Bairro <span class="text-danger"> * </span> </label>
          <input
            id="bairro"
            v-model="bairro"
            type="text"
            :disabled="viewMode"
            required
          >
        </div>
        <div class="d-flex flex-column align-items-start">
          <label
            for="numero"
          > Número <span class="text-danger"> * </span> </label>
          <input
            id="numero"
            v-model="numero"
            type="text"
            :disabled="viewMode"
            class="numero"
            required
          >
        </div>
        <div class="d-flex flex-column align-items-start">
          <label
            for="complemento"
          > Complemento </label>
          <input
            id="complemento"
            v-model="complemento"
            type="text"
            :disabled="viewMode"
          >
        </div>
        <div class="d-flex flex-column align-items-start">
          <label
            for="cidade"
          > Cidade <span class="text-danger"> * </span> </label>
          <input
            id="cidade"
            v-model="cidade"
            type="text"
            :disabled="viewMode"
            required
          >
        </div>
        <div class="d-flex flex-column align-items-start">
          <label
            for="uf"
          > UF <span class="text-danger"> * </span> </label>
          <input
            id="uf"
            v-model="uf"
            type="text"
            class="text-uppercase uf"
            :disabled="viewMode"
          >
        </div>
      </div>
      <p
        v-if="!formValidator"
        class="small text-danger mb-0 mt-2"
      >
        Preencha todos os campos obrigatórios antes de alterar.
      </p>
      <button
        class="btn-primary border-0 px-3 py-2 mt-5 d-block"
        :disabled="viewMode"
        @click="updateData"
      >
        Alterar dados
      </button>
    </form>
  </div>
</template>

<script>

import userService from '@/services/register/index'
import Edit from '@/assets/icons/Edit.vue'
import getAddress from '@/services/cep/index'

export default {
  components: {
    Edit,
  },
  data() {
    return {
      loading: false,
      userData: [],
      cep: '',
      cidade: '',
      uf: '',
      logradouro: '',
      complemento: '',
      bairro: '',
      numero: '',
      viewMode: true,
      fillColor: '#000',
      formValidator: false,
    }
  },
  created() {
    this.getUserData()
  },
  methods: {
    formSubmit() {
      if (this.cep && this.logradouro && this.bairro && this.numero && this.cidade && this.uf) {
        this.formValidator = true
        const dados = {
          cep: this.cep,
          cidade: this.cidade,
          uf: this.uf,
          logradouro: this.logradouro,
          complemento: this.complemento,
          bairro: this.bairro,
          numero: Number(this.numero),
        }
        this.$store.commit('user/SET_USERDATA', dados)
        userService.updateData(dados)
        this.$bvToast.toast('Dados alterados com sucesso.', {
          title: 'Dados alterados',
          variant: 'primary',

        })
      } else {
        this.formValidator = false
      }
    },
    async getUserData() {
      this.userData = this.$store.state.user.user
      this.cep = this.userData.cep
      this.cidade = this.userData.cidade
      this.uf = this.userData.uf
      this.logradouro = this.userData.logradouro
      this.complemento = this.userData.complemento
      this.bairro = this.userData.bairro
      this.numero = this.userData.numero
    },
    updateData() {
      const payload = {
        cep: this.cep,
        cidade: this.cidade,
        uf: this.uf,
        logradouro: this.logradouro,
        complemento: this.complemento,
        bairro: this.bairro,
        numero: this.numero,
      }
      this.$store.commit('user/SET_USERDATA', payload)
      userService.updateData(payload)
    },
    setEditMode() {
      console.log('color', this.fillColor)
      this.viewMode = !this.viewMode
      if (!this.viewMode) {
        this.fillColor = '#312c99'
      } else {
        this.fillColor = '#000'
      }
    },
    async getAddress() {
      const { data } = await getAddress.getAddress(this.cep)
      console.log('teste', data)
      this.bairro = data.bairro || ''
      this.logradouro = data.logradouro || ''
      this.uf = data.uf || ''
      this.cidade = data.localidade || ''
    },
  },
}
</script>

<style lang='scss' scoped>
input {
  height: 40px;
  border: none;
  display: block;
  margin-right: 1.2rem;
  padding-left: 0.4rem;
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: #eee;
  }
}
.uf {
  width: 100px;
  display: block;
  margin-right: 1rem;
}
.city {
  width: 200px;
}
.edit {
  display: block;
  margin-left: 16px;
  width: 30px;
  cursor: pointer;
}

.logradouro {
  width: 500px;
}
.numero {
  width: 100px;
}
.uf {
  width: 50px;
}
.cep {
  margin-bottom: 1rem;
}
</style>
