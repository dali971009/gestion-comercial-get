import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import {v4 as uuidV4} from "uuid";
import responseHandler from "../helper/response-handler";
import logger from "../config/logger";

import {UserStatus, UserEmailStatus} from "../config/enums/user-status";
import {PrismaClient} from "@prisma/client";

export const useUserService = () => {
    const prisma = new PrismaClient();

    async function emailExists(email: string) {
        return (await prisma.user.count({ where: { email: email } })) > 0;
    }

    async function createUser(userBody: any) {
        try {
            if (await emailExists(userBody.email)) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'email.taken');
            }
            userBody.id = uuidV4();
            userBody.email = userBody.email.toLowerCase();
            userBody.password = bcrypt.hashSync(userBody.password, 8);
            userBody.status = UserStatus.ACTIVE;
            userBody.emailVerified = UserEmailStatus.NOT_VERIFIED;

            let userData = await prisma.user.create({
                data: userBody
            });

            if (!userData) {
                return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
            }

            // @ts-ignore
            delete userData.password;

            return responseHandler.returnSuccess(httpStatus.CREATED, 'success', userData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
        }
    }

    async function getUsers() {
        return prisma.user.findMany();
    }

    async function getUserByUuid(uuid: string) {
        return prisma.user.findUnique({
            where: {
                id: uuid,
            },
        });
    }

    async function updateUser(userBody: any) {
        console.log(userBody);
        try {
            userBody.email = userBody.email.toLowerCase();
            if (userBody.password !== undefined && userBody.password2 !== undefined) {
                if (userBody.password === userBody.password2) {
                    userBody.password = bcrypt.hashSync(userBody.password, 8);
                } else {
                    return responseHandler.returnError(httpStatus.NOT_FOUND, 'user.passwords_are_different');
                }
            }

            delete userBody.password2;

            let userData = await prisma.user.update({
                data: userBody,
                where: {
                    id: userBody.id,
                }
            });

            if (!userData) {
                return responseHandler.returnError(httpStatus.NOT_FOUND, 'user.not_found');
            }

            // @ts-ignore
            delete userData.password;

            return responseHandler.returnSuccess(httpStatus.OK, userData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    }

    async function changePassword(data: any, uuid: string) {
        let message = 'Login Successful';
        let statusCode: number = httpStatus.OK;
        let user = await getUserByUuid(uuid);

        if (!user) {
            return responseHandler.returnError(httpStatus.NOT_FOUND, 'User Not found!');
        }

        if (data.password !== data.confirm_password) {
            return responseHandler.returnError(
                httpStatus.BAD_REQUEST,
                'Confirm password not matched',
            );
        }

        const isPasswordValid = await bcrypt.compare(data.old_password, user.password);

        if (!isPasswordValid) {
            statusCode = httpStatus.BAD_REQUEST;
            message = 'Wrong old Password!';
            return responseHandler.returnError(statusCode, message);
        }
        const updateUser = await prisma.user.update({
            data: {
                password: bcrypt.hashSync(data.password, 8),
            },
            where: {
                id: uuid,
            }
        });

        if (updateUser) {
            return responseHandler.returnSuccess(
                httpStatus.OK,
                'Password updated Successfully!',
                {},
            );
        }

        return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Password Update Failed!');
    }

    return { createUser, updateUser, emailExists, getUserByUuid, getUsers, changePassword }
}
