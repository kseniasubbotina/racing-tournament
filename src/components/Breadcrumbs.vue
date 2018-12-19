<template>
  <v-breadcrumbs v-if="items.length > 1">
    <v-breadcrumbs-item v-for="(item, i) in items" :key="i" @click.native="routeTo(i)">{{item.name}}</v-breadcrumbs-item>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: 'breadcrumbs',
  data() {
    return {
      items: [
        {
          name: 'Home',
          path: '/'
        }
      ]
    }
  },
  mounted() {
    this.updateList()
  },
  watch: {
    $route(val) {
      this.updateList(val)
    }
  },
  methods: {
    routeTo(pRouteTo) {
      if (this.items[pRouteTo].path) {
        this.$router.push(this.items[pRouteTo].path)
      }
    },
    updateList() {
      var items = [
        {
          name: 'Home',
          path: '/'
        }
      ]
      if (this.$route.params.id) {
        var breadcrumbsMetaArr = this.$route.meta.breadcrumbs
        var lastEl = breadcrumbsMetaArr.length - 1
        this.$route.meta.breadcrumbs[lastEl].name = this.$route.params.id
      }
      if (this.$route.name !== 'home') {
        this.items = items.concat(this.$route.meta.breadcrumbs)
      } else {
        this.items = []
      }
    }
  }
}
</script>
