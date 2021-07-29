import mongoose from 'mongoose';

const todosSchema = mongoose.Schema({
    title: {type:String,required:true},
    content:{type:String,required:true},
},
    {timestamps:true}
);

const Todo = mongoose.model('Todo', todosSchema);

export default Todo;