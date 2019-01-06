<template>
  <div>
    <F1GameSettings @nextStep="$emit('nextStep')" @backStep="$emit('backStep')"/>
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