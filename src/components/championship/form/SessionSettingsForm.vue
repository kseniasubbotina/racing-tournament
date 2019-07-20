<template>
  <div>
    <F1GameSettings
      :_champSettings="_champSettings"
      @nextStep="nextStep"
      @backStep="$emit('backStep')"
    />
  </div>
</template>

<script>
import F1GameSettings from '@/components/championship/form/F1GameSettings.vue'
export default {
  name: 'SessionSettingsForm',
  props: {
    _champSettings: Object
  },
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