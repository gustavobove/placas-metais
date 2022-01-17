import Vue from 'vue'
import { ValidationObserver, ValidationProvider, configure } from 'vee-validate'
import * as VeeValidate from 'vee-validate'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

const config = {
  classes: {
    valid: 'is-valid',
  },
}

configure(config)
Vue.use(VeeValidate)
