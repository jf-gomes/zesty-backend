import { Router } from "express";
import { getUsers, createUser, delUser, login, verifyToken, privateRoute, sendMessage, getMessages, sendInvite, getUserId, removeInvite, getInvites } from './controllers/UserController.js'
import { getAllProjects, getOneProject, getProjects, createProject, editProject, delProject, addTask, getTasks, removeTask, finishProject, removeMember, addPost, removePost, getPosts } from "./controllers/ProjectController.js";

const routes = Router()

//User routes
routes.get('/users', getUsers)
routes.post('/users', createUser)
routes.delete('/users', delUser)
routes.post('/users/login', login)
routes.get('/users/:id', verifyToken, privateRoute)
routes.patch('/users/:id', sendMessage)
routes.patch('/users/invites/:id', sendInvite)
routes.patch('/users/removeinvite/:id', removeInvite)
routes.get('/messages/:id', getMessages)
routes.get('/getid/:user', getUserId)
routes.get('/getinvites/:id', getInvites)

//Project routes
routes.get('/projects', getAllProjects)
routes.get('/projects/getone/:id', getOneProject)
routes.get('/projects/:id', getProjects)
routes.post('/projects', createProject)
routes.patch('/projects/:id', editProject)
routes.delete('/projects/:id', delProject)
routes.patch('/projects/addtask/:id', addTask)
routes.get('/projects/gettasks/:id', getTasks)
routes.patch('/projects/deletetask/:id', removeTask)
routes.patch('/projects/finish/:id', finishProject)
routes.patch('/projects/removemember/:id', removeMember)
routes.patch('/projects/addpost/:id', addPost)
routes.patch('/projects/removepost/:id', removePost)
routes.get('/projects/getposts/:id', getPosts)

export default routes