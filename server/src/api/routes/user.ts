import { Router, Request, Response} from 'express'
import * as userController from '../controllers/user-controller'
import {CreateUserDTO, FilterUsersDTO, UpdateUserDTO} from '../../db/dto/user-dto'

const userRouter = Router()

userRouter.get(':/id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const result = await userController.getById(id)
    return res.status(200).send(result)
})
userRouter.put('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const payload:UpdateUserDTO = req.body

    const result = await userController.update(id, payload)
    return res.status(201).send(result)
})
userRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const result = await userController.deleteById(id)
    return res.status(204).send({
        success: result
    })
})
userRouter.post('/', async (req: Request, res: Response) => {
    const payload:CreateUserDTO = req.body
    const result = await userController.create(payload)
    return res.status(200).send(result)
})
/*userRouter.get('/', async (req: Request, res: Response) => {
    const filters:FilterUsersDTO = req.query
    const results = await userController.getAll(filters)
    return res.status(200).send(results)
})*/
export default userRouter