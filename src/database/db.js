import mongoose from "mongoose";

async function connectDb(){
    await mongoose.connect(`mongodb+srv://jfgomes458:9qRtj0mSGK8oxo5k@zesty.926es18.mongodb.net/?retryWrites=true&w=majority`)
}

export default connectDb