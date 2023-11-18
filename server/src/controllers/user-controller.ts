import httpStatus from 'http-status';
import logger from '../config/logger';
import { useUserService } from '../services/user-service';

export const useUserController = () => {
  const userService = useUserService();

  async function createUser(req: any, res: any) {
    try {
      const user = await userService.createUser(req.body);
      const { status, message, data } = user.response;
      res.status(user.statusCode).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  }

  async function updateUser(req: any, res: any) {
    try {
      const user = await userService.updateUser(req.body);
      const { status, message, data } = user.response;
      res.status(user.statusCode).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  }

  async function getUser(req: any, res: any) {
    try {
      const user = await userService.getUserByUuid(req.params.id);
      if (user === null) {
        res.status(httpStatus.NOT_FOUND).send();
        return;
      }

      // @ts-ignore
      delete user.password;
      res.status(httpStatus.OK).send(user);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  }

  async function getUsers(req: any, res: any) {
    try {
      const user = await userService.getUsers();
      res.status(httpStatus.OK).send(user);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  }

  return { createUser, updateUser, getUser, getUsers };
};
