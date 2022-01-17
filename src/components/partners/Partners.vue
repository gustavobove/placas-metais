<template>
  <div class="wrapper">
    <b-spinner
      v-if="loading"
      variant="primary"
      class="loading"
    />

    <Partner
      v-if="acItems.length > 0"
      :partner="acItems"
      state="Acre"
      item-index="4"
    />
    <Partner
      v-if="alItems.length > 0"
      :partner="alItems"
      state="Alagoas"
      item-index="5"
    />
    <Partner
      v-if="amItems.length > 0"
      :partner="amItems"
      state="Amapá"
      item-index="6"
    />
    <Partner
      v-if="baItems.length > 0"
      :partner="baItems"
      state="Bahia"
      item-index="7"
    />
    <Partner
      v-if="ceItems.length > 0"
      :partner="ceItems"
      state="Ceara"
      item-index="8"
    />
    <Partner
      v-if="esItems.length > 0"
      :partner="esItems"
      state="Espirito Santo"
      item-index="9"
    />
    <Partner
      v-if="rjItems.length > 0"
      :partner="goItems"
      state="Goiás"
      item-index="10"
    />
    <Partner
      v-if="maItems.length > 0"
      :partner="maItems"
      state="Maranhão"
      item-index="11"
    />
    <Partner
      v-if="mtItems.length > 0"
      :partner="mtItems"
      state="Mato Grosso"
      item-index="12"
    />
    <Partner
      v-if="msItems.length > 0"
      :partner="msItems"
      state="Mato Grosso do Sul"
      item-index="13"
    />
    <Partner
      v-if="apItems.length > 0"
      :partner="apItems"
      state="Amapá"
      item-index="14"
    />
    <Partner
      v-if="paItems.length > 0"
      :partner="paItems"
      state="Pará"
      item-index="15"
    />
    <Partner
      v-if="pbItems.length > 0"
      :partner="pbItems"
      state="Paraíba"
      item-index="16"
    />
    <Partner
      v-if="prItems.length > 0"
      :partner="prItems"
      state="Paraná"
      item-index="17"
    />

    <Partner
      v-if="peItems.length > 0"
      :partner="peItems"
      state="Pernambuco"
      item-index="18"
    />
    <Partner
      v-if="piItems.length > 0"
      :partner="piItems"
      state="Piaui"
      item-index="19"
    />
    <Partner
      v-if="rjItems.length > 0"
      :partner="rjItems"
      state="Rio de Janeiro"
      item-index="20"
    />
    <Partner
      v-if="rnItems.length > 0"
      :partner="rnItems"
      state="Rio Grande do Norte"
      item-index="21"
    />
    <Partner
      v-if="rsItems.length > 0"
      :partner="rsItems"
      state="Rio Grande do Sul"
      item-index="22"
    />
    <Partner
      v-if="mgItems.length > 0"
      :partner="mgItems"
      state="Minas Gerais"
      item-index="23"
    />
    <Partner
      v-if="rrItems.length > 0"
      :partner="rrItems"
      state="Roraima"
      item-index="24"
    />
    <Partner
      v-if="rjItems.length > 0"
      :partner="rjItems"
      state="Rio de Janeiro"
      item-index="25"
    />
    <Partner
      v-if="scItems.length > 0"
      :partner="scItems"
      state="Santa Catarina"
      item-index="26"
    />
    <Partner
      v-if="spItems.length > 0"
      :partner="spItems"
      state="São Paulo"
      item-index="27"
    />
    <Partner
      v-if="seItems.length > 0"
      :partner="seItems"
      state="Sergipe"
      item-index="28"
    />
    <Partner
      v-if="toItems.length > 0"
      :partner="toItems"
      state="Tocantins"
      item-index="29"
    />
    <Partner
      v-if="roItems.length > 0"
      :partner="roItems"
      state="Roraima"
      item-index="30"
    />
    <Partner
      v-if="dfItems.length > 0"
      :partner="dfItems"
      state="Distrito Federal"
      item-index="31"
    />
  </div>
</template>

<script>

import Partner from './items/Partner.vue'
import api from '@/services/partners'

export default {

  components: {
    Partner,
  },
  data() {
    return {
      acItems: [],
      alItems: [],
      apItems: [],
      amItems: [],
      baItems: [],
      ceItems: [],
      esItems: [],
      goItems: [],
      maItems: [],
      mtItems: [],
      msItems: [],
      mgItems: [],
      paItems: [],
      piItems: [],
      rnItems: [],
      rsItems: [],
      roItems: [],
      rrItems: [],
      prItems: [],
      peItems: [],
      seItems: [],
      toItems: [],
      dfItems: [],
      spItems: [],
      rjItems: [],
      scItems: [],
      pbItems: [],
      partners: {},
      loading: true,
      isThereItems: false,
    }
  },
  created() {
    this.getPartners()
  },
  methods: {
    async getPartners() {
      this.loading = true
      await api.getPartners().then(res => {
        this.spItems = res.data.filter(uf => uf.uf === 'SP')[0].users
        this.acItems = res.data.filter(uf => uf.uf === 'AC')[0].users
        this.alItems = res.data.filter(uf => uf.uf === 'AL')[0].users
        this.baItems = res.data.filter(uf => uf.uf === 'BA')[0].users
        this.ceItems = res.data.filter(uf => uf.uf === 'CE')[0].users
        this.esItems = res.data.filter(uf => uf.uf === 'ES')[0].users
        this.goItems = res.data.filter(uf => uf.uf === 'GO')[0].users
        this.maItems = res.data.filter(uf => uf.uf === 'MA')[0].users
        this.mtItems = res.data.filter(uf => uf.uf === 'MT')[0].users
        this.msItems = res.data.filter(uf => uf.uf === 'MS')[0].users
        this.apItems = res.data.filter(uf => uf.uf === 'AP')[0].users
        this.paItems = res.data.filter(uf => uf.uf === 'PA')[0].users
        this.pbItems = res.data.filter(uf => uf.uf === 'PB')[0].users
        this.prItems = res.data.filter(uf => uf.uf === 'PR')[0].users
        this.peItems = res.data.filter(uf => uf.uf === 'PE')[0].users
        this.piItems = res.data.filter(uf => uf.uf === 'PI')[0].users
        this.rjItems = res.data.filter(uf => uf.uf === 'RJ')[0].users
        this.rnItems = res.data.filter(uf => uf.uf === 'RN')[0].users
        this.rsItems = res.data.filter(uf => uf.uf === 'RS')[0].users
        this.mgItems = res.data.filter(uf => uf.uf === 'MG')[0].users
        this.rrItems = res.data.filter(uf => uf.uf === 'RR')[0].users
        this.scItems = res.data.filter(uf => uf.uf === 'SC')[0].users
        this.spItems = res.data.filter(uf => uf.uf === 'SP')[0].users
        this.seItems = res.data.filter(uf => uf.uf === 'RJ')[0].users
        this.toItems = res.data.filter(uf => uf.uf === 'TO')[0].users
        this.roItems = res.data.filter(uf => uf.uf === 'RO')[0].users
        this.dfItems = res.data.filter(uf => uf.uf === 'DF')[0].users

        this.loading = false
      })
    },

  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  max-height: 470px;
  overflow-y: auto;
}
.loading {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
}

</style>
