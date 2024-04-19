const aysnchandler =(requestHandler)=>{
    (req,res,next) =>{
        Promise.resolve(requesthandler(req,res,next)).catch((err)=
        >next(err))
    }
}

export (asyncHandler)


//const asynchandler= () =>{}
// const asynchandler= (func) =>()=>{}
// const asynchandler= (func) =>async()=>{}

// const asyncHandler =(fn) =>aysnc(req,res,next) =>{
//     try{
//         await fn(req,res,next)
//     }catch(error){
//         res.status(err.code || 500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }