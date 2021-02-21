<template lang='pug'>
.wrapper
  v-date-picker.calendar(
    v-model='range'
    :attributes='attrs'
  )
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data:()=>({
    range:null,
    attrs:[
    ]
  }),
  methods:{
    ...mapActions,

  },
  async created(){
    this.attrs = await this.$store.dispatch('fetchRecords')
  }
}
</script>

<style>

</style>