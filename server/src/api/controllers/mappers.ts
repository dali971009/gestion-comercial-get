import {UserOutput} from '../../db/models/user-model'
import {User} from '../interfaces/user-interface'

export const toUser = (user: UserOutput): User => {
    return {
        id: user.id,
        username: user.username,
        name: user.name,
        lastName: user.lastName,
        dni: user.dni,
        gender: user.gender,
        address: user.address,
        phone: user.phone,
        email: user.email,
        department: user.department,
        position: user.position,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
    }
}
