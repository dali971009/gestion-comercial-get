export interface User {
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
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
