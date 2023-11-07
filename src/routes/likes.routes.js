import { Router } from "express";
import { getLikes, createLikes, editLikes,deleteLikes, getOneLike } from "../controllers/likes.controller.js";

const router = Router();
router.get("/likes", getLikes);
router.get("/likes/:id",getOneLike);
router.post("/likes", createLikes);
router.patch("/likes/:id", editLikes);
router.delete("/likes/:id", deleteLikes)
export default router;