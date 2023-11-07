import { pool } from "../db.js";

export const getLikes = async (req, res)=> {
    try {
        const [rows] = await pool.query('select * from likes')
        res.json(rows)
        
    } catch (error) {
        return res.status(500).json({message:'something goes wrong'})
    }
}

export const getOneLike = async (req, res)=>{
    try {
        const [rows] = await pool.query('select * from likes where id = ?',[req.params.id]);
        if(rows.length <= 0) return res.status(404).json({message:'Likes not found'})
    
        res.json(rows[0]);
        
    } catch (error) {
        return res.status(500).json({message:'something goes wrong'})
    }
}

export const createLikes = async(req, res)=>{
    try {
        const {id_post, positive_like,negative_like, create_at} = req.body;
        const[rows] = await pool.query('Insert into likes(id_post, positive_like,negative_like, create_at)values(?,?,?,?)',[id_post, positive_like,negative_like, create_at])
        res.send({
            id: rows.insertId,
            id_post, positive_like,negative_like, create_at
        })
        
    } catch (error) {
        return res.status(500).json({message:'something goes wrong'})
    }
}

export const deleteLikes = async(req, res)=> {
    try {
        const[result] = await pool.query('delete from likes where id=?',[req.params.id])
        if(result.affectedRows <= 0) return res.status(404).json({message:'likes not found'});
        res.sendStatus(204);
        
    } catch (error) {
        return res.status(500).json({message:'something goes wrong'})
    }
}

export const editLikes = async(req, res)=>{
    try {
        const {id} = req.params;
        const {id_post, positive_like,negative_like, create_at} = req.body;
    
        const [result] = await pool.query('update likes set id_post=IFNULL(?,id_post), positive_like=IFNULL(?,positive_like),negative_like=IFNULL(?,negative_like), create_at=IFNULL(?,create_at) where id = ?',[id_post, positive_like,negative_like, create_at,id]);
    
        if(result.affectedRows === 0) return res.status(404).json({message:'likes not found'});
        res.json('recived');
        
    } catch (error) {
        return res.status(500).json({message:'something goes wrong'})
    }
}
