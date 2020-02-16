<template>
  <pre v-show="show">{{value}}</pre>
</template>
<script>
export default {
  props: ['value'],
  computed: {
    show () {
      return process.env.VUE_APP_DEBUG || this.$route.query.debug
    }
  }
}
</script>
