function studentAuth(req ,res ,next ){
    if(req.role == 'student'){
        next()
    }else{
        console.log('unautherised access.... student');
        res.status(404).json({msg : 'unautherised access....'})
    }
}

export default studentAuth