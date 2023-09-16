import {Op} from 'sequelize'
import User from '../models/user-model'
import {GetAllUsersFilters} from './types'
import {UserInput, UserOutput} from '../models/user-model'

export const create = async (payload: UserInput): Promise<UserOutput> => {
    return await User.create(payload)
}

export const update = async (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
    const user = await User.findByPk(id)
    if (!user) {
        // @todo throw custom error
        throw new Error('not found')
    }
    return await (user as User).update(payload)
}

export const getById = async (id: number): Promise<UserOutput> => {
    const user = await User.findByPk(id)
    if (!user) {
        // @todo throw custom error
        throw new Error('not found')
    }
    return user
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedUserCount = await User.destroy({
        where: {id}
    })
    return !!deletedUserCount
}

/*export const getAll = async (filters?: GetAllUsersFilters): Promise<UserOutput[]> => {
    return User.findAll({
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}*/
