import jwt from 'jsonwebtoken';

export const encodeTokenAndSetCookie=(res,email,id)=>{
    const token = jwt.sign({email,id},process.env.JWT_KEY,{expiresIn:'30d'})

    res.cookie('token',token,{
        httpOnly:true,
        secure:true,
        sameSite:'none',
        maxAge: 30*24*60*60*1000
    });
    return token
}


export const decodeToken = (token)=>{
    try {
        return jwt.verify(token,process.env.JWT_KEY)
    } catch (error) {
        return null
    }
}
