import {pool} from '../db.js';

export const getPost = async (req, res)=> {
    try {
        const [rows]= await pool.query('select * from post')
        res.json(rows)
        
    } catch (error) {
        return res.status(500).json({message:'something goes wrong'})
    }
}

export const getOnePost = async (req, res)=>{
    try {
        const [rows]=await pool.query('select * from post where id =?',[req.params.id]);
        if (rows.length <=0) return res.status(404).json({message:'Post not found'});
        res.json(rows[0]);
        
    } catch (error) {
        return res.status(500).json({message:'something goes wrong'})
    }
}

export const createPost = async(req,res) =>{ 
    try {
        const{title,brief,content,image,category_id,user_id, status, create_at} = req.body;
        const [rows] = await pool.query('Insert into post(title,brief,content,image,category_id,user_id, status, create_at)values(?,?,?,?,?,?,?,?)',[title,brief,content,image,category_id,user_id, status, create_at])
        res.send({
            id: rows.insertId,
            title,brief,content,image,category_id,user_id, status, create_at
        })
        
    } catch (error) {
        return res.status(500).json({message:'something goes wrong'})
    }
}


export const deletePost = async (req, res)=>{
    try {
        const[result] = await pool.query('delete from post where id = ?',[req.params.id]);
    
        if(result.affectedRows <= 0) return res.status(404).json({message:'post not found'});
    
        res.sendStatus(204);
        
    } catch (error) {
        return res.status(500).json({message:'something goes wrong'})
    }
}


export const editPost = async(req, res)=>{
    try {
        const{id} = req.params;
        const {title,brief,content,image,category_id,user_id, status, create_at} = req.body;
    
        const[result] = await pool.query('update post set title=IFNULL(?,title),brief=IFNULL(?,brief),content=IFNULL(?,content),image=IFNULL(?,image),category_id=IFNULL(?,category_id),user_id=IFNULL(?,user_id), status=IFNULL(?,status), create_at=IFNULL(?,create_at) where id =?',[title,brief,content,image,category_id,user_id, status, create_at,id]);
    
        if(result.affectedRows === 0) return res.status(404).json({message:'post not found'});
        res.json('recived');
        
    } catch (error) {
        return res.status(500).json({message:'something goes wrong'})
    }
}