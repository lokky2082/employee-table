import Request from './request'
import { User, SendUser } from './types'
const APIPath = 'https://61a4e2824c822c0017041f70.mockapi.io/' // при расширении проекта можно заменить  на переменную окружения

export const UsersAPI = {
  getUsersList() {
    return Request<User[]>(`${APIPath}users`, {method: 'get'})
  },
  addUser(body: SendUser) {
    const headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
    return Request<User>(`${APIPath}users`, {method: 'post', body:JSON.stringify(body), headers})
  },
  deleteUser(id:string) {
    return Request<User>(`${APIPath}users/${id}`, {method: 'delete'})
  }
}
