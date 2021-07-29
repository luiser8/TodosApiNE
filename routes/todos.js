import express from 'express';
import { createTodos, deleteTodos, readTodos, readTodosForId, updateTodos } from '../controller/todos.js';

const routerTodos = express.Router();
routerTodos.get('/', readTodos);
routerTodos.get('/:id', readTodosForId);
routerTodos.post('/', createTodos);
routerTodos.put('/:id', updateTodos);
routerTodos.delete('/:id', deleteTodos);

export default routerTodos;