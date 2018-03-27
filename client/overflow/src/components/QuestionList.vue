<template>
<div>
  {{questions}}
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState([
      'questions'
    ])
  }
}
</script>

<style>
</style>
