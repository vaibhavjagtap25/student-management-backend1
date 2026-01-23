export const validateStudent=(req,res,next)=>{
    const {name,age}=req.body
    if(!name || !age){
        return res.status(400).json({
            message:"Name and Age are Required"
        })
    }
    next()
}