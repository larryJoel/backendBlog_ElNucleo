import Router from 'express';
import{getCategory, createCategory, editCategory, deleteCategory,getOneCategory} from '../controllers/category.controller.js';

const router = new Router();

router.get('/category',getCategory);
router.get('/category/:id',getOneCategory);
router.post('/category',createCategory);
router.patch('/category/:id',editCategory)
router.delete('/category/:id',deleteCategory);

export default router;
