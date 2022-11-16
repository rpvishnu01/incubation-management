const express = require('express')
const { route } = require('express/lib/application')
const authMidleware=require('../middlewares/authMidleware')
const { registerUser, authUser, userApplication, status, bookSlot, appList, viewApp, updateNewAppStat, approveNewAppStat,
    processingApp, rejectNewAppStat, approvedApp, allSlots, addSlot, cancelSlot, getAllUser, DeleteUser, GetUser,EditUser,rejectedApp ,getApplication,
    oneSlots } = require('../controllers/userController')
const router = express.Router()

router.post('/', registerUser)
router.post('/login', authUser)
router.post('/userApplication', userApplication)
router.get('/status/:id', status)
router.get('/adminHome',authMidleware, appList)
router.get('/viewApplication/:id', viewApp)
router.patch('/updateNewAppStatus/:id', updateNewAppStat)
router.patch('/approveNewAppStatus/:id', approveNewAppStat)
router.patch('/rejectNewAppStatus/:id', rejectNewAppStat)
router.get('/approved',authMidleware, approvedApp)
router.get('/processing',authMidleware, processingApp)
router.get('/rejected',authMidleware, rejectedApp)
router.get('/allSlots',authMidleware, allSlots)
router.get('/oneSlots/:id',authMidleware, oneSlots)
router.post('/addSlot',authMidleware, addSlot)
router.get('/cancelSlot/:appId', cancelSlot)
router.get('/slotBooking/:appId/:userId/:slotNo', bookSlot)
router.get('/getalluser', getAllUser)
router.get('/getapplication/:id', getApplication)
router.delete('/deleteuser/:id', DeleteUser)
router.get('/getuser/:id',authMidleware, GetUser)
router.put('/edituser',authMidleware, EditUser)

module.exports = router



