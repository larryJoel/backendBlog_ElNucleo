import express from 'express';
import categoryRoutes from './routes/category.routes.js';
import userRoutes from './routes/user.routes.js';
import commentRoutes  from "./routes/comment.routes.js";
import indexRoutes from './routes/index.routes.js';
import likesRoutes  from './routes/likes.routes.js';
import postRoutes from './routes/post.routes.js';



const app = express();

app.use('/api',express.json());
app.use('/api',indexRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',commentRoutes);
app.use('/api',likesRoutes);
app.use('/api',postRoutes);

app.use((req, res, next)=>{
    res.status(404).json({message:'endpoint not found'})
})

export default app;