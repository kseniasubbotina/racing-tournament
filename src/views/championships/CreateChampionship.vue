<template>
  <div>
    <ChampionshipForm :_isNew="true"/>
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