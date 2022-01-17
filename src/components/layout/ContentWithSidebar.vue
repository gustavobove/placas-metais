<template>
  <div class="content-with-sidebar-layout">
    <div>
      <navigation-bar />
    </div>
    <div>
      <b-container fluid>
        <page-title />
        <router-view class="fadeIn" />
      </b-container>
    </div>
  </div>
</template>

<script>
import { BContainer } from 'bootstrap-vue'
import NavigationBar from '../navigation/NavigationBar.vue'
import PageTitle from './PageTitle.vue'

export default {
  components: {
    BContainer,

    NavigationBar,
    PageTitle,
  },
}
</script>

<style lang="scss">

@-webkit-keyframes fadeIn {
0% { opacity: 0; }
100% { opacity: 1; }
}
@-moz-keyframes fadeIn {
0% { opacity: 0;}
100% { opacity: 1; }
}
@-o-keyframes fadeIn {
0% { opacity: 0; }
100% { opacity: 1; }
}
@keyframes fadeIn {
0% { opacity: 0; }
100% { opacity: 1; }
}

.fadeIn {
-webkit-animation: fadeIn 500ms ease-in-out;
-moz-animation: fadeIn 500ms ease-in-out;
-o-animation: fadeIn 500ms ease-in-out;
animation: fadeIn 500ms ease-in-out;
}

</style>
