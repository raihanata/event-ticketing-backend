

export const cartAdd = async(req,res)=>{
     try {
     
        
        const {_id,items:[]} = req.body
       
    }

    catch (error) {
        console.log(error);

        res.status(400).json({ error: 'cart  creation failed' });

    }

}