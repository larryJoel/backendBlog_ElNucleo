import{pool} from '../db.js'

export const getCategory = async(req, res)=>{
    try {
       const[rows] = await pool.query('select * from category')
       res.json(rows)
    
   } catch (error) {    
    return res.status(500).json({message:'something goes wrong'})
   }
}

export const getOneCategory = async(req, res)=>{
    try {
        //throw new Error('My error')
        const [rows] = await pool.query('select * from category where id = ?',[req.params.id])
        if(rows.length <= 0) return res.status(404).json({message: 'Category not found'});
        res.json(rows[0]);
        
    } catch (error) {
        return res.status(500).json({message:'something goes wrong'})
    }
 }

export const createCategory = async(req, res) => {
    
    try {
        const{name, description}=req.body;
        const[rows] = await pool.query('insert into category(name, description)values(?,?)',[name, description])
        res.send({
            id:rows.insertId,
            name, description
        })
        
    } catch (error) {
        return res.status(500).json({message:'something goes wrong'})
    }
}

export const deleteCategory  = async (req, res)=>{
    
    try {
        const [result] = await pool.query('delete from category where id = ?',[req.params.id]);
       if(result.affectedRows <= 0) return res.status(404).json({message:'category not found'});
        res.sendStatus(204)
        
    } catch (error) {
        return res.status(500).json({message:'something goes wrong'})
    }
}

export const editCategory = async(req, res)=> {
    
    try {
        const {id}=req.params;
        const {name, description}=req.body;
        
        const [result] = await pool.query('update category set name = IFNULL(?, name), description = IFNULL(?, description) where id = ?',[name, description,id]);
        
        if(result.affectedRows === 0) return res.status(404).json({message:'category not found'})
        res.json('recived')
        
    } catch (error) {
        return res.status(500).json({message:'something goes wrong'})
    }
}
