<template>
  <div class="container">
    <div class="container-head">
      <h1>Dashboard</h1>
      <ButtonHolder @click="showAddEmployeeForm=true">
        + Add Employee
      </ButtonHolder>
    </div>
    <TabsList :list="tabs" @change="filterList" :active="selectedTab.id"/>
    <UsersList class="dashboard-list" :list="filteredUserList" @deleteUser="deleteUser"/>
    <ModalWindow v-if="showAddEmployeeForm" v-model="showAddEmployeeForm">
      <AddEmployeeForm @submited="submitForm"/>
    </ModalWindow>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, toRefs, computed } from 'vue';
import usersData from './features/usersData'
import TabsList from './components/TabsList.vue'
import UsersList from './components/UsersList.vue'
import ButtonHolder from './components/ButtonHolder.vue'
import {Tab} from './components/TabsList.vue'
import {User} from './api/types'
import ModalWindow from './components/ModalWindow.vue';
import AddEmployeeForm from './components/AddEmployeeForm.vue'

export default defineComponent({
  name: 'App',
  components: {
    TabsList,
    UsersList,
    ButtonHolder,
    ModalWindow,
    AddEmployeeForm
  },
  setup (props) {
    const tabs = [
      {
        label: 'Employee list',
        id: '1',
        alias: 'all'
      },
      {
        label: 'Director',
        id: '2',
        alias: 'Director'
      },
      {
        label: 'Designer',
        id: '3',
        alias: 'Designer'
      }
    ]
    const { getUsersList, users } = usersData()
    const lists = ref<{[key:string]:User[]}>({})
    const selectedTab = ref(tabs[0])
    const filteredUserList = computed(() => {
      const alias = selectedTab.value.alias
      if(alias === 'all') {
        return users.value
      } else {
        return users.value.filter((el:User) => {
          return el.designation === alias
        })
      }
    })
    const showAddEmployeeForm = ref(false)
    onMounted( ()=> {
      getUsersList()
    })
    return {
      users,
      tabs,
      filteredUserList,
      lists,
      showAddEmployeeForm,
      getUsersList,
      selectedTab
    }
  },
  methods: {
    filterList(val:Tab) {
      this.selectedTab = val
    },
    submitForm(user:User) {
      this.showAddEmployeeForm = false
      this.users.push(user)
      this.filterList(this.tabs[0])
    },
    deleteUser(user:User) {
      this.users = this.users.filter((el:User) => {
        return el.id !== user.id
      })
    }
  }
});
</script>

<style>
@import './design/index.css';
* {
  box-sizing: border-box;
}
body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
  background: var(--main-back);
}
.container {
  padding: 60px 10px;
  min-height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
}
.container-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.container-head h1 {
  margin: 0;
}
.dashboard-list {
  margin-top: 30px;
}
</style>
