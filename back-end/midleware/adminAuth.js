function adminAuth(req ,res ,next ){
    console.log("role in admn auth",req.role);
    if(req.role == 'admin'){
 
        
        
        next()
    }else{
        console.log('unautherised access....admin');
        res.status(404).json({msg : 'unautherised access....'})
    }
}

export default adminAuth