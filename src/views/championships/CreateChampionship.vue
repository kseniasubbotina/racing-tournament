<template>
  <div>
    <h1>Create a Championship</h1>
    <ChampionshipForm/>
  </div>
</template>

<script>
import ChampionshipForm from '@/components/championship/form/ChampionshipForm'

export default {
  name: 'CreateChampionship',
  components: {
    ChampionshipForm
  }
}
</script>