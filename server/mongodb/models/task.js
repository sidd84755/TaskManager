import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    taskType: { type: String, required: true},
    collaborators: { type: String, required: true},
    deadline: { type: Number, required: true},
    photo: { type: String, required: true},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const taskModel = mongoose.model('Task', TaskSchema);

export default taskModel;