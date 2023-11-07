import { Router } from "express";
import { getComment, createComment, editComment,deleteComment, getOneComment } from "../controllers/comment.controller.js";

const router = new Router();

router.get('/comment',getComment);
router.get('/comment/:id',getOneComment);
router.post('/comment',createComment);
router.patch('/comment/:id',editComment);
router.delete('/comment/:id',deleteComment);

export default router;