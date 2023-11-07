import { pool } from "../db.js";

export const getComment = async (req, res) =>{
    try {
        const [rows] = await pool.query('select * from comment')
        res.json(rows)
        
    } catch (error) {
        return res.status(500).json({message:'something goes wrong'})
    }
}

export const getOneComment = async (req, res) =>{  
    try {
        const [rows] = await pool.query('select * from comment where id = ?', [req.params.id])
    
        if(rows.length <= 0) return res.status(404).json({message:'Comment not found'});
        res.json(rows[0])
        
    } catch (error) {
        return res.status(500).json({message:'something goes wrong'})
    }
}

export const createComment = async (req, res)=>{
    
    try {
        const{name, email, comment,post_id, status, create_at}=req.body;
        const[rows]= await pool.query('insert into comment(name, email, comment,post_id, status, create_at)values(?,?,?,?,?,?)',[name, email, comment,post_id, status, create_at])
        res.send({
            id:rows.insertId,
            name, email, comment,post_id,
            status, create_at
        })
        
    } catch (error) {
        return res.status(500).json({message:'something goes wrong'})
    }
}

export const deleteComment = async(req, res)=> {
    try {
        const[result] = await pool.query('delete from comment where id=?',[req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({message:'Comment not found'});
        res.sendStatus(204);
        
    } catch (error) {
        return res.status(500).json({message:'something goes wrong'})
    }
}

export const editComment = async(req, res)=> {
    try {
        const{id} = req.params;
        const {name,email,comment,post_id,status,create_at} = req.body;
    
        const[result] = await pool.query('update comment set name=IFNULL(?,name),email=IFNULL(?,email),comment= IFNULL(?,comment),post_id= IFNULL(?,post_id),status=IFNULL(?,status),create_at=IFNULL(?,create_at) where id = ?',[name,email,comment,post_id,status,create_at, id]);
    
        if(result.affectedRows === 0) return res.status(404).json({message:'comment not found'});
    
        res.json('recived');
        
    } catch (error) {
        return res.status(500).json({message:'something goes wrong'})
    }
} 