import mongoose from 'mongoose';
import Todo from '../models/todos.js';

export const readTodos = async(req, res) => {
    try{
        const todos = await Todo.find();
        res.status(200).json(todos)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};
export const readTodosForId = async(req, res) => {
    const { id } = req.params;
    try{
        const todos = await Todo.findById(id);
        res.status(200).json(todos)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};
export const createTodos = async(req, res) => {
    const todos = await Todo(req.body);
    try{
        await todos.save();
        res.status(201).json(todos)
    }catch(error){
        res.status(409).json({error:error.message});
    }
};
export const updateTodos = async(req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`The id ${id} is not valid`);
    }
    const todos = { title, content, _id: id };
    await Todo.findByIdAndUpdate(id, todos, { new: true });

    try{
        res.json(todos)
    }catch(error){
        res.status(409).json({error:error.message});
    }
};
export const deleteTodos = async(req, res) => {
    const todos = await Todo.findByIdAndDelete({_id: req.params.id});
    try{
        res.status(201).json(todos)
    }catch(error){
        res.status(409).json({error:error.message});
    }
};