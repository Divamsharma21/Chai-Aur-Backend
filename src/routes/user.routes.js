import {Router} from 'express'
import {registerUser} from "../controllers/user.controller.js"
import {upload} from "../middleware/multer.middleware.js";
const router=Router()

router.route('/register').post( 
// router.post("/register",registerUser)
 
upload.fields([
    {
        name: "avatar",
        maxCount: 1
    }, 
    {
        name: "coverImage",
        maxCount: 1
    }
]),
registerUser

)



export default router