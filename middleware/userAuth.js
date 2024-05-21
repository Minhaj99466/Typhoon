

const userIsLogin = async(req,res,next)=>{
    try{
        if(req.session.user_id){
            next()
        }else{
            res.redirect('/login');
        }
    }catch(error){
        console.log(error.message);
    }
}


const userIsLogout = async(req,res,next)=>{
    try{
        if(req.session.user_id){
            res.redirect('/');
        }else{
            next()
        }
    }catch(error){
        console.log(error.message);
    }
}

module.exports = {
    userIsLogin,
    userIsLogout
}