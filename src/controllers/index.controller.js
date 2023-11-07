import {pool} from '../db.js'
export const indexController = async(req, res)=> {
    const [result] = await pool.query('select 1+1 as resut')
    res.json(result[0]);
}