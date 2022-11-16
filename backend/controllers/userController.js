const asyncHandler = require('express-async-handler')
const User = require('../models/userMOdel')
const generateToken = require('../utils/generateToken')
const Note = require('../models/newApplication')

const ObjectId = require('mongoose').Types.ObjectId;
const Slot = require('../models/slotBooking');
const SlotInfo = require('../models/addSlot');
const { json } = require('express/lib/response');
const { response, application } = require('express');


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  userExists = await User.findOne({ email })
  if (userExists) {

    res.status(201).json({ status: false })
    // throw new Error('User already exists')
  }

  const user = await User.create({
    name, email, password, isAdmin: false,
  })

  if (user) {
    console.log('new user');
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      admin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Error')
  }

})

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        admin: user.isAdmin,
        token: generateToken(user._id)
      });
    }
    else {
      console.log('password');
      res.status(401).json({ Error: Error.message })
      throw new Error("Server error");

    }
  } catch (err) {
    console.log('error');

    throw new Error("Server error");

  }
});


const userApplication = asyncHandler(async (req, res) => {


 


  const { companyName, address, city, state, teamAndBackground, companyAndProducts, solutions, prepositions, incubType, userId } = req.body

  if (companyName && address && city && state && teamAndBackground && companyAndProducts && solutions && prepositions && incubType && userId) {

    console.log('123');
    const newApp = await Note.create({
      companyName, address, city, state, teamAndBackground, companyAndProducts, solutions, prepositions, incubType, status: "PENDING", userId, bookingStat: false
      , slotCode: "null"
    })
    // const note = new Note({companyName,address,city,state,teamAndBackground,companyAndProducts,solutions,prepositions,incubType,status:"PENDING"});
    // const createdNote = await note.save();
    console.log('new', newApp);
    res.status(201).json({ newApp });

  } else {
    console.log('2');
    res.status(401).json({ Error })
  }

})

const status = asyncHandler(async (req, res) => {
  const notes = await Note.find({ userId: ObjectId(req.params.id) });
  res.json(notes);
})

const appList = asyncHandler(async (req, res) => {
  const notes = await Note.find({ status: 'PENDING' });
  if (notes.length > 0) {
    res.json(notes);
  } else {
    res.json({ status: false })
  }
})

const viewApp = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const notes = await Note.findOne({ _id: req.params.id });
  res.json(notes);
})
const updateNewAppStat = asyncHandler(async (req, res) => {
  const notes = await Note.updateOne({ _id: req.params.id }, { $set: { status: "PROCESSING" } });
  res.json({ status: true });
})
const approveNewAppStat = asyncHandler(async (req, res) => {
  const notes = await Note.updateOne({ _id: req.params.id }, { $set: { status: "APPROVED" } });
  res.json({ status: true });
})
const rejectNewAppStat = asyncHandler(async (req, res) => {
  const notes = await Note.updateOne({ _id: req.params.id }, { $set: { status: "REJECTED" } });
  res.json({ status: true });
})
const approvedApp = asyncHandler(async (req, res) => {
  const approved = await Note.find({ status: 'APPROVED' });
  if (approved.length > 0) {
    res.json({ approved });
  } else {
    res.json({ status: false })

  }
})


const processingApp = asyncHandler(async (req, res) => {
  const processing = await Note.find({ status: 'PROCESSING' });
  if (processing.length > 0) {
    res.json({ processing });
  } else {
    res.json({ status: false })
  }
})
const rejectedApp = asyncHandler(async (req, res) => {
  const rejected = await Note.find({ status: 'REJECTED' });
  if (rejected.length > 0) {
    res.json({ rejected });
  } else {
    res.json({ status: false })
  }
})


const bookSlot = asyncHandler(async (req, res) => {
  appId = req.params.appId
  userId = req.params.userId
  slotId = req.params.slotNo
  console.log(slotId, appId, userId);
  const data = await SlotInfo.updateOne({ _id: slotId }, { $set: { appId: appId, userId: userId, status: true } }, { multi: true })
  const slotInfo = await SlotInfo.findOne({ _id: slotId })
  console.log('nowerere', slotInfo);
  await Note.updateOne({ _id: appId }, { $set: { bookingStat: true, slotCode: slotInfo.slotId } })
  console.log('mongo', data);
  res.json({ data })
})


const allSlots = asyncHandler(async (req, res) => {
  const allSlots = await SlotInfo.find()
  if (allSlots.length > 0) {
    res.json({ allSlots })
  } else {
    res.json({ status: false })
  }
})



const oneSlots = asyncHandler(async (req, res) => {
  const id = req.params.id
  try {
    const response = await SlotInfo.find({ userId: id })
    console.log("-----------------------");
    console.log(response);
    console.log("-----------------------");
    if (response.length > 0) {
      res.json({ status: true });
    }else{
      res.json({ status: false });
    }


  } catch (error) {
    res.json({error})
    console.log(error);
  }
})



const addSlot = asyncHandler(async (req, res) => {
  const slotId = req.body.sloteCode
  const mongo = await SlotInfo.create({ slotId, appId: "", userId: "", status: false })
  res.json({ mongo })

})

const cancelSlot = asyncHandler(async (req, res) => {
  const data = await SlotInfo.updateOne({ appId: req.params.appId }, { $set: { appId: " ", userId: " ", status: false } }, { multi: true })
  await Note.updateOne({ _id: req.params.appId }, { $set: { bookingStat: false, slotCode: "null" } })
  console.log('123');
  res.json(data)
})


const getAllUser = asyncHandler(async (req, res) => {

  try {
    const users = await User.find({})
    if (users) {

      res.json(users);
    } else {
      res.json({ status: false })
    }
  } catch (error) {

  }
})
const getApplication = asyncHandler(async (req, res) => {
  const id = req.params.id


  try {
    const response = await Note.find({ userId: id })

    if (response.length > 0) {
      res.json({ status: false });
    }
    res.json({ status: true });

  } catch (error) {
    console.log(error);
  }
})


const DeleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id


  try {
    const response = await User.findByIdAndDelete(id)

    res.json({ status: true });


  } catch (error) {

    console.log(error);

  }
})


const GetUser = asyncHandler(async (req, res) => {
  const id = req.params.id


  try {
    const response = await User.findById(id)

    res.json(response)

  } catch (error) {

    console.log(error);

  }
})
const EditUser = asyncHandler(async (req, res) => {

  try {
    const response = await User.findByIdAndUpdate(req?.body?._id,
      {
        name: req?.body?.name,
        email: req?.body?.email
      },
      {
        new: true,
        runValidators: true,
      }
    )
  
    res.json({ status: true })

  } catch (error) {

    console.log(error);

  }
})

module.exports = {
  registerUser, authUser, userApplication, status, appList, viewApp, updateNewAppStat,
  approveNewAppStat, approvedApp, processingApp, rejectNewAppStat, bookSlot, allSlots, addSlot, cancelSlot, getAllUser, DeleteUser, GetUser, EditUser, rejectedApp, getApplication,
  oneSlots
}
