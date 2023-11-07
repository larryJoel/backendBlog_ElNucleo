import { Router } from "express";
import { getPost,createPost,editPost,deletePost,getOnePost } from "../controllers/post.controller.js";

const router = Router();

router.get('/post', getPost);
router.get('/post/:id', getOnePost);
router.post('/post', createPost);
router.patch('/post/:id',editPost);
router.delete('/post/:id',deletePost);

export default router