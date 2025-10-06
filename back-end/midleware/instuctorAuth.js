function instructorAuth(req ,res ,next ){
        console.log('indside instuctor auth');

    if(req.role == 'instructor'){
        console.log('indside instuctor auth');
        console.log(req.name);
        
         
        next()
    }else{
        console.log('unautherised access instrutor');
        res.status(404).json({msg : 'unautherised access '})
    }
}
// instructorAuth()

export default instructorAuth