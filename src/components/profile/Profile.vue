<template>
  <div class="d-flex flex-column flex-xl-row">
    <div class="navigation">
      <h2>Perfil</h2>
      <ul class="list-unstyled">
        <li
          :class="currentTab === UserData ? 'active' : ''"
          @click="currentTab = UserData"
        >
          Meus dados
        </li>
        <li
          :class="currentTab === UserManagement ? 'active' : ''"
          @click="currentTab = UserManagement"
        >
          Gerenciador
        </li>
        <li @click="logout">
          Sair
        </li>
      </ul>
    </div>
    <div class="component">
      <transition
        name="slide"
        mode="out-in"
      >
        <component :is="currentTab" />
      </transition>
    </div>
  </div>
</template>

<script>
import UserData from './UserData.vue'
import UserManagement from './UserManagement.vue'

export default {
  components: {
    UserData,
    UserManagement,
  },
  data() {
    return {
      currentTab: UserData,
      UserManagement,
      UserData,
      tabs: ['UserData', 'UserManagement'],
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('accessToken')
      this.$router.push('/')
    },
  },
}
</script>

<style lang='scss' scoped>
.navigation {
  width: 388px;
  height: 100vh;
  background-color: #F8F8F8;
  text-align: right;
  padding: 22px 36px;
  @media (max-width: 1199.98px) {
    text-align: left;
    width: 100%;
    height: auto;
  }
  h2 {
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: #312C99;
  margin-bottom: 48px;
  }
  li {
  display: block;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: #312C99;
  cursor: pointer;
  margin-bottom: 11px;
  @media (max-width: 1199.98px) {
  text-align: left
  }
  }.active {
    font-weight: bold;
  }
}
.component {
  width: 100%;
  height: 100vh;
  background-color: #f3f3f3;
  padding: 22px 36px;
}
</style>
