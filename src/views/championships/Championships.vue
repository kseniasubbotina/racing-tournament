<template>
  <div>
    <h3 class="my-3">Available Championships</h3>
    <!-- filters -->
    <template v-if="isAdmin">
      <v-checkbox
        v-model="filters.approved"
        label="Approved"
        color="blue"
        :value="false"
        hide-details
      ></v-checkbox>
    </template>

    <!-- filters -->
    <ChampionshipsList :filters="filters"/>
  </div>
</template>

<script>
import isAdmin from '@/mixins/isAdmin.js'
import ChampionshipsList from '@/components/championship/ChampionshipsList.vue'
export default {
  name: 'Championships',
  data () {
    return {
      filters: {
        approved: true
      }
    }
  },
  mixins: [
    isAdmin
  ],
  components: {
    ChampionshipsList
  }
}
</script>
