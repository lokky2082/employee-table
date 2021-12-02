<template>
 <div class="users-list">
   <div class="users-list__header users-list__row">
     <div></div>
     <div>Basic info</div>
     <div>Employee code</div>
     <div>Designation</div>
    <div>Phone Number</div>
    <div>Joining Date</div>
    <div></div>
    <div></div>
   </div>
   <div class="users-list__container">
    <CardLayer
      class="users-list__card"
      v-for="(user, id) in list"
      :key="user.id"
      :active="true" >
      <div class="users-list__item users-list__row">
         <div class="subtext"><span>{{id+1}}</span></div>
         <UserInfo :user="user"/>
         <div>{{user.employeeCode}}</div>
         <div>{{user.designation}}</div>
         <div>{{user.phone}}</div>
         <div>{{formatDate(user.joiningDate)}}</div>
         <div><span @click="remove(user.id)">delete</span></div>
         <!--Обычно создается компонент с иконками -->
         <div><div class="users-list__item-ico"><svg xmlns="http://www.w3.org/2000/svg" fill="none" height="20" viewBox="0 0 20 20" width="20"><path d="M10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4C12 5.10457 11.1046 6 10 6Z" fill="CurrentColor"/><path d="M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12Z" fill="CurrentColor"/><path d="M10 18C8.89543 18 8 17.1046 8 16C8 14.8954 8.89543 14 10 14C11.1046 14 12 14.8954 12 16C12 17.1046 11.1046 18 10 18Z" fill="currentColor"/></svg></div></div>
      </div>
    </CardLayer>
   </div>
 </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {User} from '../api/types'
import usersData from '../features/usersData'
import CardLayer from './CardLayer.vue'
import UserInfo from './UserInfo.vue'
export default defineComponent({
  name: 'UsersList',
  components: {
    CardLayer,
    UserInfo
  },
  props: {
    list: {
      type: Array as PropType<User[]>,
      default: () => []
    }
  },
  emits: ['deleteUser'],
  setup (props) {
    const { deleteUser, users } = usersData()
    return {
      deleteUser,
      users
    }
  },
  methods: {
    formatDate (date:string) {
      const options = {month: 'short', year: 'numeric', day: 'numeric'}
      return new Date(date).toLocaleDateString('en-US', options)
    },
    async remove(id:string) {
      const user = await this.deleteUser(id)
      this.$emit('deleteUser', user)
    }
  }
});
</script>

<style scoped>
 .users-list__row {
   display: grid;
   grid-template-columns: 40px minmax(100px, 300px) 200px 150px minmax(100px, 250px) 150px 1fr 30px; 
   font-weight: 600;
   align-items: center;
   grid-column-gap: 10px;
   text-align: center;
 }
 
 .users-list__row >* {
   width: 100%;
   overflow: hidden;
 }
 .users-list__card {
   margin-bottom: 15px;
 }
 .users-list__header {
   padding: 15px 20px;
   font-weight: 600;
   color: var(--sub-text-color);
 }
 .users-list {
   max-width: 100%;
   overflow: hidden;
 }
 .users-list__header > div:nth-child(2) {
   justify-self: start;
   text-align: left;
 }
 .users-list__container {
   padding: 0 5px;
 }
 .users-list__item-ico {
   color: var(--sub-text-color);
   cursor: pointer;
   display: flex;
   align-items: center;
   justify-content: center;
   width: 25px;
   height: 25px;
   border-radius: 50%;
   cursor: pointer;
 }
 .users-list__item-ico:hover {
   background: var(--sceleton-color);
 }
</style>