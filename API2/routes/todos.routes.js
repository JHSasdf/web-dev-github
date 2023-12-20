const express = require('express');

const todosController = require('../controller/todos.controller');

const router = express();

router.get('/', todosController.getAllTodos);

router.post('/', todosController.addTodo);

module.exports = router;