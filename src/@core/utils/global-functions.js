/* eslint-disable func-names */
import Vue from 'vue'

Vue.prototype.showModal = function (val) {
  this.$modal.show(val)
}
Vue.prototype.hideModal = function (val) {
  this.$modal.hide(val)
}
