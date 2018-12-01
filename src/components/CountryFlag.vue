<template>
  <img :src="require(`@/assets/flag-icons/svg/${imageName}`)" width="40px" alt="">
</template>

<script>
export default {
  name: 'country-flag',
  props: {
    _country: String
  },
  computed: {
    imageName () {
      debugger
      let countryDashed = this._country.replace(/ /g, '-')
      return `${countryDashed.toLowerCase()}.svg`
    }
  }
}
</script>
