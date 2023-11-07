import{Router}from 'express';
import {getUser, createUser, editUser, deleteUser,getOneUser} from '../controllers/user.controller.js';


const router = Router();

router.get('/user', getUser)

router.get('/user/:id',getOneUser)

router.post('/user', createUser)

router.patch('/user/:id', editUser)

router.delete('/user/:id', deleteUser)

export default router