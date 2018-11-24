<template>
	<v-breadcrumbs v-if="items.length > 1">
		<v-breadcrumbs-item v-for="(item, i) in items" 
			:key="i"
			:to="item.path">
			{{item.text}}
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
					text: 'Home',
					path: '/'
				}
    	]
		}
	},
	watch: {
		"$route" (val) {
			debugger
			if (val.name !== 'home') {
				this.items.push({
					text: val.name,
					path: val.path
				})
			}
		}
	}
}
</script>

