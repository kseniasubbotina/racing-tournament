<template>
  <div>
    <img
      v-if="_country"
      :src="require(`@/assets/flag-icons/svg/${imageName}`)"
      :width="_width + 'px'"
      alt
    >
    <div v-else class="country-flag-empty"></div>
  </div>
</template>

<script>
export default {
  name: 'country-flag',
  props: {
    _country: String,
    _width: {
      type: Number,
      default: 40
    }
  },
  computed: {
    imageName() {
      let countryDashed = this._country.replace(/ /g, '-')
      return `${countryDashed.toLowerCase()}.svg`
    }
  }
}
</script>
<style>
.country-flag-empty {
  background-color: #bdbdbd;
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
</style>

