<template>
  <div style="margin: 0 5px">
    <v-avatar :size="width">
      <div :style="avatarStyles"></div>
      <!-- <img v-if="userData.avatarURL" :src="userData.avatarURL" alt>
      <img v-else src="http://pol.audio/media/user-avatar.png" alt>-->
    </v-avatar>
  </div>
</template>
<script>
export default {
  name: 'UserAvatar',
  props: {
    userData: Object,
    width: Number
  },
  computed: {
    avatarStyles() {
      return {
        // width: this.width,
        // height: this.width,
        // margin: '5px 5px',
        'border-radius': '100px',
        backgroundImage: 'url(' + this.userData.avatarURL + ')',
        height: this.width + 'px',
        width: this.width + 'px',
        backgroundPosition: 'center center',
        backgroundSize: 'cover'
      }
    }
  }
}
</script>

