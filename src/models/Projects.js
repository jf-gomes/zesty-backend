import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: Array,
        required: true
    },
    team: {
        type: Array,
        default: []
    },
    initialDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    posts: {
        type: Array,
        default: []
    },
    tasks: {
        type: Array,
        default: []
    },
    finished: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('Projects', projectSchema)