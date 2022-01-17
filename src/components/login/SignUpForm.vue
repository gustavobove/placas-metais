<template>
  <div>
    <div
      class="login-form form-position sign-up position-relative"
    >
      <b-spinner
        v-if="loading"
        variant="primary"
        class="login-form__loading"
      />
      <div v-if="!validator">
        <a
          class="login-form__return"
          @click="$emit('returnToLogin')"
        >Voltar</a>
        <h2 class="login-form__signup-title">
          Cadastro
        </h2>
        <div class="d-flex">
          <b-form-group
            label="CNPJ"
            label-class="custom-label"
            class="mr-4"
          >
            <b-form-input
              v-model="signUp.cnpj"
              v-mask="['##.###.###/####-##']"
              :class="cnpjValidation ? '' : 'error' "
              required
              @input="validateForm"
            />
          </b-form-group>
          <b-form-group
            label="Razão Social"
            label-class="custom-label"
          >
            <b-form-input
              v-model="signUp.razaoSocial"
              required
              @input="validateForm"
            />
          </b-form-group>
        </div>
        <div class="d-flex">
          <b-form-group
            label="Nome do Representante"
            label-class="custom-label"
            class="mr-4"
          >
            <b-form-input
              v-model="signUp.nomeRepresentante"
              class=""
              required
              @input="validateForm"
            />
          </b-form-group>
          <b-form-group
            label="Área de Atuação"
            label-class="custom-label"
          >
            <b-form-input
              v-model="signUp.areaAtuacao"
              required
              @input="validateForm"
            />
          </b-form-group>
        </div>
        <div class="d-flex">
          <b-form-group
            label="E-mail"
            label-class="custom-label"
            class="mr-4"
          >
            <b-form-input
              v-model="signUp.email"
              :class="emailValidation ? '' : 'error'"
              required
              @input="validateForm"
            />
          </b-form-group>
          <b-form-group
            label="Telefone"
            label-class="custom-label"
          >
            <b-form-input
              v-model="signUp.telefone"
              v-mask="['##-#-####-####']"
              value=""
              required
              type="tel"
              @input="validateForm"
            />
          </b-form-group>
        </div>
        <div class="grid">
          <b-form-group
            label="UF"
            label-class="custom-label"
            class="mr-4"
          >
            <b-form-select
              v-model="selectedState"
              :options="states"
              required
              @change="chooseCity"
            />
          </b-form-group>
          <b-form-group
            label="Cidade"
            label-class="custom-label"
          >
            <b-form-select
              v-model="signUp.cidade"
              :options="cities"
              required
              @change="validateForm"
            />
          </b-form-group>
        </div>

        <div class="d-flex">
          <b-form-group

            label="Senha"
            label-class="custom-label"
            class="mr-4"
          >
            <b-form-input
              v-model="password"
              type="password"
              @input="validateForm"
            />
          </b-form-group>
          <b-form-group

            label="Confirme a senha"
            label-class="custom-label"
          >
            <b-form-input
              v-model="passwordConfirmation"
              type="password"
              @input="validateForm"
            />
          </b-form-group>
        </div>
        <span
          v-if="!passwordLengthChecker"
          class="text-danger small text-center d-block mb-3"
        > A senha deve ter pelo menos 8 caractéres. </span>
        <span
          v-if="!passwordValidation"
          class="text-danger small text-center d-block mb-3"
        > As senhas não são iguais. </span>
        <BButton
          variant="primary"
          class="ml-auto d-block submit"
          :disabled="!isValid"
          @click="sendForm"
        >
          Cadastrar
        </BButton>
      </div>
      <div
        v-else
      >
        <div class=" ">
          <a
            class="login-form__return"
            @click="$emit('returnToLogin')"
          >Voltar</a>
          <div>
            <span class="d-block login-form__sent-email">Enviamos instruções no seu e-mail.</span>
            <span class="d-block login-form__thanks-message">Obrigado ;)</span></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {
  BFormGroup, BFormInput, BButton, BFormSelect, BSpinner,
} from 'bootstrap-vue'
// eslint-disable-next-line no-unused-vars
import { cnpj } from 'cpf-cnpj-validator'
import axios from '@/libs/axios'
import register from '@/services/register'

export default {
  components: {
    BFormGroup, BFormInput, BButton, BFormSelect, BSpinner,
  },
  data() {
    return {
      loading: false,
      validator: false,
      selectedState: '',
      selectedCity: '',
      states: [],
      cities: [],
      isCnpjValid: false,
      isValid: false,
      validMail: true,
      password: '',
      passwordConfirmation: '',
      passwordLength: '',
      passwordValid: '',
      signUp: {
        cnpj: '',
        razaoSocial: '',
        nomeRepresentante: '',
        areaAtuacao: '',
        email: '',
        telefone: '',
        uf: '',
        cidade: '',
      },
    }
  },
  computed: {
    cnpjValidation() {
      if (this.signUp.cnpj.length <= 0) {
        return true
      }
      if (this.signUp.cnpj.length > 0 && cnpj.isValid(this.signUp.cnpj)) {
        return true
      }
      return false
    },
    emailValidation() {
      if (this.signUp.email.length <= 0) {
        return true
      }
      if (this.signUp.email.length > 0 && this.isEmailValid(this.signUp.email)) {
        return true
      }
      return false
    },
    passwordValidation() {
      if (this.passwordConfirmation !== this.password) {
        return false
      }
      return true
    },
    passwordLengthChecker() {
      if (this.password.length < 8 && this.passwordConfirmation.length < 8) {
        return false
      } return true
    },
  },

  created() {
    this.getStates()
  },
  methods: {
    getStates() {
      this.loading = true
      axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(res => {
        for (let i = 0; i < res.data.length; i += 1) {
          this.states.push(res.data[i].sigla)
        }
      })
      this.loading = false
    },
    isEmailValid(email) {
      const re = /\S+@\S+\.\S+/
      return re.test(email)
    },
    validateForm() {
      if (cnpj.isValid(this.signUp.cnpj) && this.signUp.razaoSocial && this.signUp.nomeRepresentante && this.signUp.areaAtuacao && this.isEmailValid(this.signUp.email) && this.signUp.telefone && this.signUp.uf && this.signUp.cidade && this.password === this.passwordConfirmation) {
        this.isValid = true
      } else {
        this.isValid = false
      }
    },

    sendForm() {
      const obj = {
        username: this.signUp.email,
        email: this.signUp.email,
        cnpj: this.signUp.cnpj,
        razaoSocial: this.signUp.razaoSocial,
        areaAtuacao: this.signUp.areaAtuacao,
        telefone: this.signUp.telefone,
        uf: this.signUp.uf,
        cidade: this.signUp.cidade,
        password: this.password,
      }
      register.register(obj).then(() => {
        this.$bvToast.toast('Seu cadastro foi efetuado com sucesso!', {
          title: 'Parceiro criado com sucesso.',
          variant: 'success',
        })
        this.validator = true
      }).catch(() => {
        this.$bvToast.toast('Por favor, tente novamente mais tarde ou entre em contato com o suporte.', {
          title: 'Ocorreu um erro no servidor',
          variant: 'danger',

        })
      })
    },
    async chooseCity() {
      this.loading = true
      this.signUp.uf = this.selectedState
      const { data } = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${this.selectedState}/municipios`)
      for (let i = 0; i < data.length; i += 1) {
        this.cities.push(data[i].nome)
        this.validateForm()
      }
      this.loading = false
    },

  },
}
</script>

<style lang='scss' scoped>

@import '@/assets/scss/pages/_login.scss';
.sign-up {
  padding: 32px;
  min-height: 419px;
}
.submit {
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  color: #FFFFFF;
  width: 186px;
  padding: 10px 0px;
}
.grid {
  display: grid;
  grid-template-columns: 24% 76%;
}
.login-form {
  height: auto;
  &__sent-email {
  font-size: 12px;
  line-height: 18px;
  color: $blue;
  white-space: nowrap;
  @media (max-width: 575.98px) {
    margin-top: 16px;
    display: block;
  }

  }
  &__thanks-message {
  font-weight: bold;
  font-size: 22px;
  line-height: 33px;
  color: $blue;
  margin-top: 10px;

  }
  a {
    cursor: pointer;
  }
  &__return {
  font-size: 12px;
  line-height: 18px;
  text-decoration-line: underline;
  color: $blue;
  margin-bottom: 67px;
  display: block;
  }
  &__signup-title {
  font-weight: bold;
  font-size: 22px;
  line-height: 33px;
  color: $blue;
  margin: 36px 0 19px 0;
  }
  @media (min-width: 1981px) {
    transform: translateX(25%);
  }
  @media (max-width: 1980px) {
    transform: translateX(16%);
  }
  @media (max-width: 1800px) {
    transform: translateX(13%);
  }
  @media (max-width: 1600px) {
    transform: translateX(10%);
  }
  @media (max-width: 1500px) {
    transform: translateX(7%);
  }
  @media (max-width: 1300px) {
    transform: translateX(5%);
  }
  @media (max-width: 1200px) {
    transform: translateX(0%);
  }
  a {
    cursor: pointer;
  }
  &__loading {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
  }
}
.error {
  border: solid 1px red;
}
</style>
