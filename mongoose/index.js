import mongoose from 'mongoose'
import { UserModel } from './models/user.model.js';
mongoose
  .connect("mongodb://localhost/dev")
  .then(async () => {
    // once connected, give a success message
    console.log("Connected to MongoDB");
    // Make operations on user model

    // Delete
    const r = await UserModel.deleteOne({
        name: 'Test 2'
    })
    // // Delete many
    // await UserModel.deleteMany({
    //     name: 'Test'
    // })
    // // Find and delete
    // await UserModel.findOneAndDelete({
    //     name: 'Test'
    // })
    console.log(r)
    await mongoose.disconnect()
  })
  .catch(async err => {
    // if something goes wrong let us know
    console.log(err);
    await mongoose.disconnect()
  });