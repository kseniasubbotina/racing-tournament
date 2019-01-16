<template>
  <div>
    <h1>Create a Championship</h1>
    <ChampionshipCreateForm/>
  </div>
</template>

<script>
import ChampionshipCreateForm from '@/components/championship/form/ChampionshipCreateForm'

export default {
  name: 'CreateChampionship',
  components: {
    ChampionshipCreateForm
  }
}
</script>