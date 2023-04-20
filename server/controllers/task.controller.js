import Property from '../mongodb/models/task.js';
import User from '../mongodb/models/user.js';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,    
});

const getAllTasks = async (req, res) => {

    const { _end, _order, _start, _sort, title_like = "", taskType = "" } = req.query;

    const query = {};

    if (taskType !== '') {
        query.taskType = taskType;
    }

    if (title_like !== '') {
        query.title = { $regex: title_like, $options:'i' };
    }

    try {
        const count = await Property.countDocuments({ query });

        const properties = await Property
            .find(query)
            .limit(_end)
            .skip(_start)
            .sort({ [_sort]: _order })
        
            res.header('X-Total-count', count);
            res.header('Access-Control-Expose-Headers','x-total-count');
        
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTaskDetail = async (req, res) => {
    const { id } = req.params;
    const propertyExists = await Property.findOne({ _id: id }).populate('creator');

    if (propertyExists) {
        res.status(200).json(propertyExists)
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

const createTask = async (req, res) => {
    try {
        const { title, nickname, description, taskType, collaborators, deadline, 
        photo, email } = req.body;
    
        const session = await mongoose.startSession();
        session.startTransaction();
    
        const user = await User.findOne({ email }).session(session);
    
        if(!user) throw new Error('User not found');
    
        const photoUrl  = await cloudinary.uploader.upload(photo);
    
        const newProperty = await Property.create({
            title,
            nickname,
            description,
            taskType,
            collaborators,
            deadline,
            photo: photoUrl.url,
            creator: user._id
        });
        user.allTasks.push(newProperty._id);
        await user.save({ session });
        await session.commitTransaction();
        res.status(200).json({ message: 'Task created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message })        
    }
    
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, propertyType, location, price, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);

        await Property.findByIdAndUpdate({ _id: id }, {
            title,
            description,
            propertyType,
            location,
            price,
            photo: photoUrl.url || photo
        })

        res.status(200).json({ message: "Property updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const propertyToDelete = await Property.findById({ _id: id }).populate(
            "creator",
        );

        if (!propertyToDelete) throw new Error("Task not found");

        const session = await mongoose.startSession();
        session.startTransaction();

        propertyToDelete.deleteOne({ session });
        propertyToDelete.creator.allTasks.pull(propertyToDelete);

        await propertyToDelete.creator.save({ session });
        await session.commitTransaction();

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getAllTasks,
    getTaskDetail,
    createTask,
    updateTask,
    deleteTask,
}