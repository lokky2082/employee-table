<template>
 <div class="add-employee-form">
   <h3 class="add-employee-form__title">Add Employee</h3>
    <InputComp :label="'Name'" v-model="form.name"/>
    <InputComp :label="'E-mail'" v-model="form.mail" type="email"/>
    <InputComp :label="'Phone'" v-model="form.phone"/>
    <InputComp :label="'Designation'" v-model="form.designation"/>
    <div class="add-employee-form__bot">
    <ButtonHolder @click="submit">
      Add
    </ButtonHolder>
    </div>
 </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import InputComp from './InputComp.vue'
import ButtonHolder from './ButtonHolder.vue'
import usersData from '../features/usersData'
export default defineComponent({
  name: 'AddEmployeeForm',
  components: {
    InputComp,
    ButtonHolder
  },
  emits: ['submited'],
  setup (props) {
    const { addUser } = usersData()
    const form = ref({
      name: '',
      mail: '',
      phone: '',
      designation: ''
    })
    return {
      form,
      addUser
    }
  },
  methods: {
    async submit() {
      const user = await this.addUser(this.form)
      this.$emit('submited', user)
    }
  }
});
</script>

<style scoped>
 .add-employee-form__title {
   margin: 0;
   margin-bottom: 15px;
 }
 .add-employee-form {
   width: 100vw;
   max-width: 300px;
 }
 .add-employee-form__bot {
   margin-top: 20px;
   display: flex;
   justify-content: center;
 }
</style>