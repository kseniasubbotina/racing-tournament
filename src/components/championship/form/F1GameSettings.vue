<template>
  <v-layout wrap>
    <v-flex>
      <v-select :items="distances" label="Race Distance"></v-select>
      <v-select :items="qFormats" label="Qualification"></v-select>
      <v-text-field
        v-validate="{required: true, regex: '^([0-9.]+)$' }"
        name="difficulty"
        type="number"
        :error-messages="errors.collect('AI')"
        label="AI Difficulty"
        v-model="aiDifficulty"
        suffix="%"
      ></v-text-field>
    </v-flex>
    <v-flex>
      <v-flex></v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'F1GameSettings',
  data() {
    return {
      distances: ['3 laps', '5 laps', '25%', '50%', '100%'],
      qFormats: ['1 lap', 'Short - 15min', 'Full', 'No Qualification'],
      aiDifficulty: '50'
    }
  }
}
</script>