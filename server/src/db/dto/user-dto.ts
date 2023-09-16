import { Optional } from "sequelize/types"

export type CreateUserDTO = {
    id: number;
    username: string;
    name: string;
    lastName: string;
    dni: string;
    gender: string;
    address: string;
    phone: string;
    email: string;
    department: string;
    position: string;
}

export type UpdateUserDTO = Optional<CreateUserDTO, 'name'>

export type FilterUsersDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}