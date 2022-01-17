<template>
  <div class="placa">
    <div class="d-flex justify-content-end">
      <b-form-select
        v-model="selectedDimension"
        class="placa__select align-self-start"
        :options="getDimensionsArr"
        @change="setSelectedDimension"
      />
      <div class="d-flex flex-column">
        <span class="placa__warning">Imagem meramente ilustrativa.</span>
        <span
          class="small"
          @click="clean"
        >
          Limpar placa
        </span>
      </div>
    </div>

    <div

      ref="printMe"
      class="placa__bg"
    >
      <div

        class="placa__content"
      >
        <span

          class="placa__name"
        >
          <div
            v-for="(item, index) in $store.state.placas.nomes"
            :key="index"
          > <span
              v-if="item.nome"
              id="setName"
              class="mt-4 d-block linerr"
            >{{ getName(item.nome) }}</span>
            <div
              v-if="item.data_nascimento.length > 1"
              class="d-flex justify-content-center align-items-center mt-2"
            >
              <span class="placa__birth d-block"><Star class="mr-1" /> {{ item.data_nascimento }} </span>
              <span class="placa__death"><Cross class="mr-1" />{{ item.data_morte }}</span>
            </div>

          </div>

          <span
            v-for="(item, index) in $store.state.placas.frases"
            :key="index + 1"
            class="placa__quote"
          >
            <span
              v-if="item.frase"
              class="d-inline-block pt-1  frase-value pt-3 px-2"
              :class="item.frase.length > null ? 'd-block' : 'd-none'"
            > {{ item.frase }} </span>

          </span>

        </span>

      </div>

    </div>
    <div class="placa__details">
      <p>
        Quantidade de nomes: <span> <strong> {{ countName === null ? '0' : countName }} </strong></span>
      </p>
      <p>Linha Adicional: <span> <strong> {{ getTotalLines }}  </strong></span></p>
      <p>Frase Adicional: <span> <strong> {{ isThereQuotes }} </strong></span></p>
      <p>Dimensões: {{ getDimensions() }} <span> <strong /></span></p>
    </div>
    <div class="placa__total d-flex justify-content-end">
      <p class="placa__total-title">
        Total: <span class="placa__price" /> <span class="placa__price"> {{ getPrice }}</span>

      </p>
    </div>

  </div>
</template>

<script>

import { BFormSelect } from 'bootstrap-vue'
import { mapGetters, mapMutations } from 'vuex'
import Star from '@/assets/icons/Star.vue'
import Cross from '@/assets/icons/Cross.vue'
import rules from '@/services/rules'

export default {
  components: {
    Star,
    Cross,
    BFormSelect,

  },
  data() {
    return {
      lines: null,
      linesCounter: null,
      datesCounter: null,
      maxLines: false,
      dimensions: this.getDimensions,
      selectedDimension: 0,
      valoresPlacasLazer: [],
      dimensionsArr: [
        {
          value: 0,
          text: 'Alterar dimensão da placa',
        },
        {
          value: 1,
          text: '30x10cm',
          disabled: false,
        },
        {
          value: 2,
          text: '30x15cm',
          disabled: false,
        },
        {
          value: 3,
          text: '30x20cm',
          disabled: false,
        },
        {
          value: 4,
          text: '30x25cm',
          disabled: false,
        },
        {
          value: 5,
          text: '30x30cm',
          disabled: false,
        },
      ],
    }
  },
  computed: {

    getPrint() {
      return this.$store.state.placas.setPrint
    },
    getPrice() {
      const value = this.$store.state.placas.dimensions
      let price = null
      switch (value) {
        case 0:
          price = this.$store.state.placas.nameRules[0]?.valor
          this.$store.dispatch('placas/setPrice', price?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
          break
        case 1:
        case 2:
        case 3:
          price = this.$store.state.placas.nameRules[1]?.valor
          this.$store.dispatch('placas/setPrice', price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
          this.$emit('price', price)
          return this.$store.state.placas.price
        case 4:
          price = this.$store.state.placas.nameRules[2].valor
          this.$store.dispatch('placas/setPrice', price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
          this.$emit('price', price)
          return this.$store.state.placas.price
        case 5:
          price = this.$store.state.placas.nameRules[3].valor
          this.$store.dispatch('placas/setPrice', price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
          this.$emit('price', price)
          return this.$store.state.placas.price
        case 6:
          price = this.$store.state.placas.nameRules[4].valor
          this.$store.dispatch('placas/setPrice', price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
          this.$emit('price', price)
          return this.$store.state.placas.price
        case 7:
          price = this.$store.state.placas.nameRules[5].valor
          this.$store.dispatch('placas/setPrice', price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
          this.$emit('price', price)
          return this.$store.state.placas.price
        case 8:
          price = this.$store.state.placas.nameRules[6].valor
          this.$store.dispatch('placas/setPrice', price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
          this.$emit('price', price)
          return this.$store.state.placas.price
        case 9:
          price = this.$store.state.placas.nameRules[7].valor
          this.$store.dispatch('placas/setPrice', price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
          this.$emit('price', price)
          return this.$store.state.placas.price
        case 10:
          price = this.$store.state.placas.nameRules[8].valor
          this.$store.dispatch('placas/setPrice', price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
          this.$emit('price', price)
          return this.$store.state.placas.price
        case 11:
          price = this.$store.state.placas.nameRules[9].valor
          this.$store.dispatch('placas/setPrice', price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
          this.$emit('price', price)
          return this.$store.state.placas.price
        case 12:
          price = this.$store.state.placas.nameRules[10].valor
          this.$store.dispatch('placas/setPrice', price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
          this.$emit('price', price)
          return this.$store.state.placas.price
        default:
          break
      }
      this.$emit('price', 0)
      return 0
    },

    getTotalLines() {
      const totalLines = this.$store.state.placas.nomes.reduce((total, obj) => obj.size + total, 0)
      const totalLinesQuotes = this.$store.state.placas.frases.reduce((total, obj) => obj.size + total, 0)
      let isThereDate = null
      this.$store.state.placas.nomes.forEach(element => {
        if (element.data_nascimento.length > 0 || element.data_morte.length > 0) {
          isThereDate += 1
        }
      })
      const total = totalLines
      const { customSize } = this.$store.state.placas
      const { customSizeValue } = this.$store.state.placas
      if (customSize) {
        this.$store.dispatch('placas/setDimensions', customSizeValue)
        this.$store.dispatch('placas/setDimensions', customSizeValue)
        this.$emit('totalLines', customSizeValue)
        return total + isThereDate + totalLinesQuotes
      }
      this.$store.dispatch('placas/setDimensions', total + isThereDate + totalLinesQuotes)
      this.$emit('totalLines', total + isThereDate + totalLinesQuotes)
      return total + isThereDate + totalLinesQuotes
    },
    isThereQuotes() {
      if (this.$store.state.placas.frases.length > 0) {
        return 'Sim'
      }
      return 'Não'
    },

    countName() {
      let nameLines = null
      this.$store.state.placas.nomes.forEach(item => {
        if (item.nome) {
          nameLines += 1
          this.$emit('totalNames', nameLines)
          return nameLines
        }
        this.$emit('totalNames', nameLines)
        return nameLines
      })
      if (nameLines > null) {
        this.$emit('totalNames', nameLines)
        return nameLines
      }
      this.$emit('totalNames', nameLines)
      nameLines = null
      return nameLines
    },
    showDates() {
      return this.$store.state.placas.nomes.data_nascimento
    },

    dateCheck() {
      let date
      if (this.$store.state.placas.nomes) {
        this.$store.state.placas.nomes.forEach(element => {
          date = element.data_nascimento
        })
      }
      if (date.length > null) {
        return true
      }
      return false
    },
    getDimensionsArr() {
      const newArr = this.dimensionsArr
      const value = this.getTotalLines

      if (value <= 0) {
        newArr[0].disabled = false
        newArr[1].disabled = false
        newArr[2].disabled = false
        newArr[3].disabled = false
        newArr[4].disabled = false
        newArr[5].disabled = false
      }
      if (value > 1 && value < 4) {
        newArr[1].selected = true
        newArr[1].disabled = true
        newArr[2].disabled = false
        newArr[3].disabled = false
        newArr[4].disabled = false
        newArr[5].disabled = false
      }
      if (value >= 4 && value < 7) {
        newArr[1].disabled = true
        newArr[2].disabled = true
        newArr[3].disabled = false
        newArr[4].disabled = false
        newArr[5].disabled = false
        return newArr
      }
      if (value >= 7 && value <= 8) {
        newArr[1].disabled = true
        newArr[2].disabled = true
        newArr[3].disabled = true
        newArr[4].disabled = false
        newArr[5].disabled = false

        return newArr
      }
      if (value >= 9 && value < 11) {
        newArr[1].disabled = true
        newArr[2].disabled = true
        newArr[3].disabled = true
        newArr[4].disabled = true
        newArr[5].disabled = false

        return newArr
      }
      if (value >= 11) {
        newArr[1].disabled = true
        newArr[2].disabled = true
        newArr[3].disabled = true
        newArr[4].disabled = true
        newArr[5].disabled = true
        return newArr
      }

      return this.dimensionsArr
    },
  },
  watch: {
    getPrint() {
      this.print()
    },

  },

  async created() {
    this.selectedDimension = 0
    const response = await rules.getRules()
    const values = response.data.valores_placas_lazer
    this.$store.commit('placas/SET_NAMERULES', values)
  },

  methods: {
    clean() {
      this.$store.commit('placas/SET_NONAMES')
      this.$store.commit('placas/SET_NOQUOTES')
      this.$store.commit('placas/SET_CLEANINPUTS', true)
      this.$store.commit('placas/SET_CUSTOMSIZEVALUE', false)
    },
    ...mapGetters('placas', {
      getLines: 'getLines',
    }),
    ...mapMutations('placas', {
      setDimensions: 'SET_DIMENSIONS',
    }),
    ...mapMutations('cart', {
      SET_IMAGE: 'SET_IMAGE',
      SET_IMAGE_IN_ARRAY: 'SET_IMAGE_IN_ARRAY',
    }),
    ...mapGetters('cart', {
      getImage: 'getImage',
    }),
    getDimensions() {
      const value = this.$store.state.placas.dimensions
      let dimension = ''

      if (value <= 0) {
        dimension = this.$store.state.placas.nameRules[0]?.placa
        this.$store.state.placas.placaSize = '30x10cm'
      }
      if (value <= 2 || value === 3 || value === 4) {
        dimension = this.$store.state.placas.nameRules[0]?.placa
        this.$store.state.placas.placaSize = '30x10cm'
      }
      if (value === 5 || value === 6) {
        dimension = this.$store.state.placas.nameRules[3].placa
        this.$store.state.placas.placaSize = '30x15cm'
      }
      if (value === 7 || value === 8) {
        dimension = this.$store.state.placas.nameRules[5].placa
        this.$store.state.placas.placaSize = '30x20cm'
      }
      if (value === 9 || value === 10) {
        dimension = this.$store.state.placas.nameRules[7].placa
        this.$store.state.placas.placaSize = '30x25cm'
      }
      if (value === 11 || value === 12) {
        dimension = this.$store.state.placas.nameRules[9].placa
        this.$store.state.placas.placaSize = '30x30cm'
      }
      this.$emit('dimension', dimension)
      return dimension
    },
    async print() {
      if (this.getImage) {
        const el = this.$refs.printMe
        const options = {
          type: 'dataURL',
        }
        const output = await this.$html2canvas(el, options)
        if (output) {
          this.SET_IMAGE(output)
          this.SET_IMAGE_IN_ARRAY(output)
        }
      }
    },

    setSelectedDimension() {
      this.$store.commit('placas/SET_CUSTOMSIZE', true)
      switch (this.selectedDimension) {
        case 1:
          this.$store.state.placas.placaSize = '30x10'
          this.$store.commit('placas/SET_DIMENSIONS', 1)
          this.$store.commit('placas/SET_CUSTOMSIZEVALUE', 1)
          break
        case 2:
          this.$store.commit('placas/SET_DIMENSIONS', 6)
          this.$store.state.placas.placaSize = '30x15'
          this.$store.commit('placas/SET_CUSTOMSIZEVALUE', 6)
          break
        case 3:
          this.$store.commit('placas/SET_DIMENSIONS', 7)
          this.$store.commit('placas/SET_CUSTOMSIZEVALUE', 7)
          break
        case 4:
          this.$store.commit('placas/SET_DIMENSIONS', 9)
          this.$store.state.placas.placaSize = '30x25'
          this.$store.commit('placas/SET_CUSTOMSIZEVALUE', 9)
          break
        case 5:
          this.$store.commit('placas/SET_DIMENSIONS', 11)
          this.$store.state.placas.placaSize = '30x30'
          this.$store.commit('placas/SET_CUSTOMSIZEVALUE', 11)
          break
        default:
          this.$store.commit('placas/SET_DIMENSIONS', 200)
          break
      }
    },
    getCaracteres(nome) {
      return nome.length
    },
    getName(nome) {
      let newName = nome
      for (let i = 0; i < nome.length; i += 1) {
        if (i % 35 === 0) {
          newName = `${newName.substr(0, i)}\n${newName.substr(i)}`
        }
      }
      return newName
    },
  },
}
</script>

<style lang='scss' scoped>
@import '@/assets/scss/variables/_variables.scss';

.placa {
  width: 448.67px;
  min-height: 247.76px;
  max-width: 100%;
  overflow: hidden;
  overflow-wrap: break-word;
  @media (max-width: 1199.98px) {
    margin: auto;
  }
  &__select {
  margin-bottom: 1rem;
  max-width: 200px;
  margin-right: auto;
  font-size: 11px;
  }
  &__quote {
    white-space: pre-line;
    overflow-wrap: break-word;
    max-width: 100%;
  }
  &__warning {
  font-size: 10px;
  line-height: 12px;
  text-align: right;
  color: #5B5B5B;
  margin-bottom: 8px;
  display: block;
  }
  &__bg {
    background-image: url('../../../assets/images/placa-bg.png');
    background-size: cover;
    background-position: center;
    padding: 10px;
  }
  &__content {
    width: 100%;
    border: solid 3px #000;
    padding: 72px 0px;
    overflow: hidden;
    white-space: pre-line;

  }
  &__name {
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #000000;
    display: block;
    margin-bottom: 9px;
  }
  &__infos {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
  &__birth, &__death {
    margin-right: 35px;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
    font-weight: 400;
  }
  &__death {
    margin-right: null;
  }
  &__details {
  display: flex;
  text-align: left;
  flex-wrap: wrap;
  padding: 10px 0px;
  margin-top: 7px;

    p {
    font-family: Verdana;
    font-size: 10px;
    line-height: 12px;
    color: #5B5B5B;
    text-align: left;
    margin: 2px auto;
    position: relative;
    &::after {
      content: '|';

    }
    }
  }
  &__total-title {
    font-family: Verdana;
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    color: #C4C4C4;
  }
  &__price {
    color: $blue;
    font-size: 16px;
    font-weight: 900;
    letter-spacing: -1px;
  }
}
strong {
  font-weight: 900;
  font-size: 11px;
  color: #000;
}
.frase-value {
  font-style: italic;
  font-size: 14px;
}
.linerr {
  font-size: 14px;
}
.small {
  font-size: 11px;
  align-self: flex-start;
  background-color: transparent;
  color: #fff;
  border: none;
  background-color: #312c99;
  padding: 3px 13px;
  cursor: pointer;
  margin-left: auto;
}
</style>
