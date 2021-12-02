import { ref } from 'vue'
import { UsersAPI } from '../api'
import { User, SendUser } from '../api/types'


export default function usersData() {
  const users = ref<User[]>([])
  const getUsersList = async () => {
    const res:User[] = await UsersAPI.getUsersList() as User[]
    users.value = res
    return res
  }
  const addUser = async (data: SendUser) => {
    const res:User = await UsersAPI.addUser(data)
    return res
  }
  const deleteUser = async (id: string) => {
    const res:User = await UsersAPI.deleteUser(id)
    return res
  }
  return {
    getUsersList,
    addUser,
    deleteUser,
    users
  }
}