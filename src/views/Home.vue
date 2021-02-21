<template lang='pug'>
.wrapper
  form(id='app2' @submit.prevent='login')
    label Email
      input(v-model='email')
    label Password
      input(v-model='password')
    input(type='submit')
  form(id='app' @submit='checkForm')
    p(v-if='errors.length')
      b Пожалуйста исправьте указанные ошибки:
      ul
        li(v-for='error in errors') {{ error }}
    v-date-picker.calendar(
      v-model='range'
      :attributes='attrs'
    )
    hr
    select(v-model='type1')
      option(v-for='(o,i) in o1' :value='{o,i}') {{o.text}} - {{o.price}}
    select(v-model='type2')
      option(v-for='(o,i) in o2' :value='{o,i}') {{o.text}} - {{o.price}}
    p Тотал: {{total}}
    input(type='submit' value='Отправить')
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data:()=>({
    email:'',
    password:'',
    range:null,
    type1:0,
    type2:0,
    errors:[],
    o1:[
      {text:'обрезной',price:700},
      {text:'fioam',price:30},
      {text:'спрыжка',price:500},
      {text:'классика',price:9900}
    ],
    o2:[
      {text:'с краской',price:100},
      {text:'с гелем',price:10},
      {text:'крамын',price:300},
      {text:'с дед мороз',price:200}
    ],
    attrs:[
    ]
  }),
  methods:{
    ...mapActions,
    checkForm(e) {
      if (this.type1 && this.type2 && this.range) {
       this.createRecord()
       alert('Вы записаны!')
      }

      this.errors = []

      if (!this.type1) {
        this.errors.push('Требуется указать вид.')
      }
      if (!this.type2) {
        this.errors.push('Требуется указать материал.')
      }
      if (!this.range) {
        this.errors.push('Требуется выбрать дату.')
      }

      e.preventDefault()
    },
    async createRecord(){
      const record={dates:this.range.toJSON(),name:'9086984564',type1:this.type1.o.text,type2:this.type2.o.text}
      await this.$store.dispatch('createRecord', {record})
    },
    async login(){
      await this.$store.dispatch('login', {email:this.email,password:this.password})
    }
  },
  computed:{
    total(){
      return this.type1.o?.price+this.type2.o?.price || 0
    }
  }
}
</script>

<style>

</style>