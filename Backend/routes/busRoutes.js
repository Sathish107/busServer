const router=require('express').Router()
const {registerBus,getBus,updateRoute}=require('../controllers/busController')

router.route("/register").post(registerBus)
router.route("/watch/:id").get(getBus)
router.route("/route").put(updateRoute)

module.exports=router