<template>
	<v-breadcrumbs v-if="items.length > 1">
		<v-breadcrumbs-item v-for="(item, i) in items" 
			:key="i"
			:to="item.path">
			{{item.name}}
		</v-breadcrumbs-item>
  </v-breadcrumbs>
</template>

<script>
export default {
	name: "breadcrumbs",
	data () {
		return {
			items: [
				{
					name: 'Home',
					path: '/'
				}
    	]
		}
	},
	created () {
		this.fillBreadcrumbs(this.$route)
	},
	watch: {
		"$route" (val) {
			this.fillBreadcrumbs(val)
		}
	},
	methods: {
		fillBreadcrumbs (val) {
			if (val.name !== 'home') {
				debugger
				this.items = this.items.concat(val.meta.breadcrumbs)
			}
		}
	}
}
</script>

