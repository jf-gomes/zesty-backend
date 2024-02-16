import Users from "../models/Users.js";
import * as bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt from 'jsonwebtoken'

async function getUsers(req, res){
    const { password } = req.body
    if (password != process.env.PASSWORD){
        return res.status(401).json('Invalid password')
    } else {
        const users = await Users.find()
        return res.status(200).json(users)
    }
}

async function createUser(req, res){
    const { password } = req.body
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    const user = req.body
    user['password'] = passwordHash
    const newUser = await Users.create(user)
    return res.status(201).json(newUser)
}

async function delUser(req, res){
    const { id, password } = req.body
    if (password != process.env.PASSWORD){
        return res.status(401).json('Invalid password')
    } else {
        await Users.findByIdAndDelete({ _id: id })
        return res.status(200).json('User deleted')
    }
}

async function login(req, res){
    const { email, password } = req.body
    const user = await Users.findOne({ email: email })
    if (!user){
        return res.status(404).json({ response: 'User not found' })
    } else {
        const verifyPassword = await bcrypt.compare(password, user.password)
        if (!verifyPassword){
            return res.status(401).json({ response: 'Wrong password' })
        } else {
            try {
                const secret = 'ASKJDMLAIHJQ'
                const token = jwt.sign({
                    id: user._id
                }, secret)
                const id = user._id
                res.status(200).json({ response: 'Login successful', token, id, user })
            }
            catch (err){
                console.log(err)
            }
        }
    }
}

function verifyToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token){
        return res.status(401).json('Access denied')
    }
    try{
        const secret = 'ASKJDMLAIHJQ'
        jwt.verify(token, secret)
        next()
    }
    catch(err){
        res.status(400).json('Invalid access token')
    }
}

async function privateRoute(req, res){
    const id = req.params.id
    const user = await Users.findById(id, '-password')
    if (!user){
        return res.status(404).json('User not found')
    }
    res.status(200).json( user['messages'] )
}

async function sendMessage(req, res){
    const id = req.params.id
    await Users.updateOne({ _id: id }, { $push: { messages: req.body } })
    return res.status(201).json('Message received')
}

async function getMessages(req, res){
    const id = req.params.id
    const response = await Users.find({ _id: id }, { messages: 1 })
    return res.status(200).json( response )
}

async function sendInvite(req, res){
    const id = req.params.id
    await Users.updateOne({ _id: id }, { $push: { invites: req.body } })
    return res.status(201).json('Invite sent')
}

async function removeInvite(req, res){
    const id = req.params.id
    await Users.updateOne({ _id: id }, { $pull: { invites: req.body } })
    return res.status(200).json('Invite deleted')
}

async function getUserId(req, res){
    const user = req.params.user
    const response = await Users.find({ name: user }, { _id: 1 })
    return res.status(200).json( response )
}

async function getInvites(req, res){
    const id = req.params.id
    const response = await Users.find({ _id: id }, { invites: 1 })
    return res.status(200).json( response )
}

export {
    getUsers,
    createUser,
    delUser,
    login,
    verifyToken,
    privateRoute,
    sendMessage,
    getMessages,
    sendInvite,
    getUserId,
    removeInvite,
    getInvites
}