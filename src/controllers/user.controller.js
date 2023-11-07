import {pool} from '../db.js'


export const getUser = async(req, res)=>{
    try {
        const [rows] = await pool.query('select * from users')
        res.json(rows)
        
    } catch (error) {
        return res.status(500).json({message:'something goes wrong'})
    }
}

export const getOneUser = async(req, res)=>{ 
    try {
        const[rows] = await pool.query('select * from users where id = ?',[req.params.id]);
    
        if(rows.length <= 0) return res.status(404).json({message:'user not found'});
        res.json(rows[0]);
        
    } catch (error) {
        return res.status(500).json({message:'something goes wrong'})
    }
}

export const createUser = async(req, res)=>{ 
    try {
        const {name,lastName, UserName,email,password,image, status,kind,create_at,update_at} = req.body;
        const [rows] = await pool.query('Insert into users(name,lastName, UserName,email,password,image, status,kind,create_at,update_at) values (?,?,?,?,?,?,?,?,?,?)',[name,lastName, UserName,email,password,image, status,kind,create_at,update_at])
        res.send({
            id: rows.insertId,
            name,lastName, UserName,email,password,image, status,kind,create_at,update_at
        })
        
    } catch (error) {
        return res.status(500).json({message:'something goes wrong'})
    }
}


export const deleteUser = async (req, res)=>{
    try {
        const [result] = await pool.query('delete from users where id = ?',[req.params.id]);
    
        if(result.affectedRows <= 0) return res.status(404).json({message:'user not found'});
    
        res.sendStatus(204);
        
    } catch (error) {
        return res.status(500).json({message:'something goes wrong'})
    }
}



export const editUser = async (req, res)=>{
    try {
        const{id} = req.params;
        const {name,lastName, UserName,email,password,image, status,kind,create_at,update_at } = req.body;
    
        const [result] = await pool.query('update users set name=IFNULL(?,name),lastName=IFNULL(?,lastName), UserName=IFNULL(?,UserName),email=IFNULL(?,email),password=IFNULL(?,password),image=IFNULL(?,image), status=IFNULL(?,status),kind=IFNULL(?,kind),create_at=IFNULL(?,create_at),update_at=IFNULL(?,update_at) where id = ?',[name,lastName, UserName,email,password,image, status,kind,create_at,update_at,id]);
    
        if (result.affectedRows === 0) return res.status(404).json({message:'user not found'});
        res.json('recived')
        
    } catch (error) {
        return res.status(500).json({message:'something goes wrong'})
    }
}
