import Projects from '../models/Projects.js'
import 'dotenv/config'

async function getAllProjects(req, res){
    const projects = await Projects.find()
    return res.status(200).json({ projects })
}

async function getOneProject(req, res){
    const id = req.params.id
    const project = await Projects.find({ _id: id })
    return res.status(200).json({ project })
}

async function getProjects(req, res){
    const user = req.params.id
    const myProjects = await Projects.find({ "createdBy.id": user })
    const otherProjects = await Projects.find({ "team.id": user })
    return res.status(200).json({ myProjects, otherProjects })
}

async function createProject(req, res){
    const project = Projects.create(req.body)
    return res.status(201).json({ project })
}

async function editProject(req, res){
    const id = req.params.id
    await Projects.updateOne({ _id: id }, { $push: { team: req.body } })
    return res.status(200).json('Project edited')
}

async function delProject(req, res){
    const id = req.params.id
    await Projects.findByIdAndDelete({ _id: id })
    return res.status(200).json('Project deleted')
}

async function addTask(req, res){
    const id = req.params.id
    await Projects.updateOne({ _id: id }, { $push: { tasks: req.body } })
    return res.status(201).json('Task added')
}

async function getTasks(req, res){
    const id = req.params.id
    const response = await Projects.find({ _id: id }, { tasks: 1 })
    return res.status(200).json(response)
}

async function removeTask(req, res){
    const id = req.params.id
    await Projects.updateOne({ _id: id }, { $pull: { tasks: req.body } })
    return res.status(200).json('Task deleted')
}

async function finishProject(req, res){
    const id = req.params.id
    await Projects.updateOne({ _id: id }, { finished: true })
    return res.status(200).json('Project finished')
}

async function removeMember(req, res){
    const id = req.params.id
    await Projects.updateOne({ _id: id }, { $pull: { team: req.body } })
    return res.status(200).json('Team member deleted')
}

async function addPost(req, res){
    const id = req.params.id
    await Projects.updateOne({ _id: id }, { $push: { posts: req.body } })
    return res.status(201).json('Added post')
}

async function removePost(req, res){
    const id = req.params.id
    await Projects.updateOne({ _id: id }, { $pull: { posts: req.body } })
    return res.status(200).json('Post removed')
}

async function getPosts(req, res){
    const id = req.params.id
    const response = await Projects.find({ _id: id }, { posts: 1 })
    return res.status(200).json(response)
}

export {
    getAllProjects,
    getOneProject,
    getProjects,
    createProject,
    editProject,
    delProject,
    addTask,
    getTasks,
    removeTask,
    finishProject,
    removeMember,
    addPost,
    removePost,
    getPosts
}