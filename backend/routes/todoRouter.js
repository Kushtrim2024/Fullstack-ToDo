import express from "express";
import {getTodos} from "../controllers/todoController.js";
import {addTodo} from "../controllers/todoController.js";
import {deleteTodo} from "../controllers/todoController.js";
import {updateTodo} from "../controllers/todoController.js";  

export const todoRouter = express.Router();


todoRouter.post("/", getTodos);
todoRouter.post("/addTodo", addTodo);
todoRouter.delete("/deleteTodo", deleteTodo);
todoRouter.put("/updateTodo", updateTodo);

