function userAuth(req ,res ,next ){
    if(req.role == 'user'){
        next()
    }else{
        console.log('unautherised access....');
        res.status(404).json({msg : 'unautherised access....'})
    }
}

export default userAuth