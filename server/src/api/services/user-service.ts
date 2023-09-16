import * as userDao from '../../db/dao/user-dao'
import {GetAllUsersFilters} from '../../db/dao/types'
import {UserInput, UserOutput} from '../../db/models/user-model'

export const create = (payload: UserInput): Promise<UserOutput> => {
    return userDao.create(payload)
}
export const update = (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
    return userDao.update(id, payload)
}
export const getById = (id: number): Promise<UserOutput> => {
    return userDao.getById(id)
}
export const deleteById = (id: number): Promise<boolean> => {
    return userDao.deleteById(id)
}
/*export const getAll = (filters: GetAllUsersFilters): Promise<UserOutput[]> => {
    return userDao.getAll(filters)
}*/
