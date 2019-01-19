<template>
  <div>
    <F1GameSettings @nextStep="nextStep" @backStep="$emit('backStep')"/>
  </div>
</template>

<script>
import F1GameSettings from '@/components/championship/form/F1GameSettings.vue'
export default {
  name: 'SessionSettingsForm',
  methods: {
    nextStep(settings, fieldName) {
      this.$emit('nextStep', settings, fieldName)
    }
  },
  components: {
    F1GameSettings
  }
}
</script>