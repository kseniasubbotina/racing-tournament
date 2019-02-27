<template>
  <v-card>
    <v-card-title class="py-4 title">Select a team</v-card-title>
    <v-container>
      <v-form>
        <TeamSelect :_seria="_seria"/>
        <v-btn>Confirm</v-btn>
      </v-form>
    </v-container>
    <v-card-actions></v-card-actions>
  </v-card>
</template>

<script>
import TeamSelect from '@/components/form-elements/TeamSelect'
export default {
  name: 'TeamSelectForm',
  props: {
    _seria: String
  },
  components: {
    TeamSelect
  }
}
</script>
