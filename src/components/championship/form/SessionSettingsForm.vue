<template>
  <div>
    <F1GameSettings/>
    <v-btn color="primary" @click="$emit('nextStep')">Continue</v-btn>
    <v-btn flat @click="$emit('backStep')">Back</v-btn>
  </div>
</template>

<script>
import F1GameSettings from '@/components/championship/form/F1GameSettings.vue'
export default {
  name: 'SessionSettingsForm',
  components: {
    F1GameSettings
  }
}
</script>