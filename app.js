import express from 'express'
import * as db from './util/database.js'
import cors from 'cors'

const PORT = 3010;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/users', (req, res) =>{
    try{
        const users = db.getUsers();
        res.status(200).json(users);
    }
    catch(err){
        res.status(500).json({message: `${err}`})
    }
});
app.get('/users/:id', (req, res) =>{
    try{
        const user = db.getUser(req.params.id);
        if(!user){
            return res.status(404).json({message: 'User not found!'})
        }
        
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({message: `${err}`})
    }
});
app.post('/users', (req, res) =>{
    try{
        const {name} = req.body;
        if(!name){
            return res.status(400).json({message: 'Invalid format!'});
        }

        const savedUser = db.saveUser(name);
        if(savedUser.changes != 1){
            return res.status(501).json({message: 'User save failed!'});
        }
        
        res.status(201).json({id: savedUser.lastInsertRowid, name});
    }
    catch(err){
        res.status(500).json({message: `${err}`})
    }
});
app.put('/users/:id', (req, res) =>{
    try{
        const {name} = req.body;
        if(!name){
            return res.status(400).json({message: 'Invalid format!'});
        }

        const id = req.params.id;

        const updatedUser = db.updateUser(id, name);
        if(updatedUser.changes != 1){
            return res.status(501).json({message: 'User update failed!'});
        }
        
        res.status(200).json({id, name});
    }
    catch(err){
        res.status(500).json({message: `${err}`})
    }
});
app.delete('/users/:id', (req, res) =>{
    try{
        const deletedUser = db.deleteUser(req.params.id);
        if(deletedUser.changes != 1){
            return res.status(501).json({message: 'User delete fail!'});
        }

        res.status(200).json({message: 'Delete succesful!'});
    }
    catch(err){
        res.status(500).json({message: `${err}`});
    }
});

app.get("/blogs", (req, res) => {
    try{
        const blogs = db.getBlogs();
        res.status(200).json(blogs);
    }
    catch(err)
    {
        res.status(500).json({message : `${err}`});
    }
});
app.get('/blogs/:id', (req, res) =>{
    try{
        const blog = db.getBlog(req.params.id);
        if(!blog){
            return res.status(404).json({message: 'Blog not found!'})
        }
        
        res.status(200).json(blog);
    }
    catch(err){
        res.status(500).json({message: `${err}`})
    }
});
app.post("/blogs", (req, res) => {
    try{
        const {userId, title, category, content, creationDate, lastModifiedDate} = req.body;
        if(!userId || !title || !category || !content ||!creationDate || !lastModifiedDate)
        {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const savedBlog = db.saveBlog(userId, title, category, content, creationDate, lastModifiedDate);
        if(savedBlog.changes != 1)
        {
            return res.status(501).json({message: "Blog save failed"});
        }

        res.status(201).json({id: savedBlog.lastInsertRowid, userId, title, category, content, creationDate, lastModifiedDate});
    }
    catch(err)
    {
        res.status(500).json({message : `${err}`});
    }
});
app.put("/blogs/:id", (req, res) => {
    try{
        const {userId, title, category, content, creationDate, lastModifiedDate} = req.body;
        if(!userId || !title || !category || !content ||!creationDate || !lastModifiedDate)
        {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const id = req.params.id;
        const updatedBlog = db.updateBlog(id, userId, title, category, content, creationDate, lastModifiedDate);
        if(updatedBlog.changes != 1)
        {
            return res.status(501).json({message: "Blog update falied"});
        }

        res.status(200).json({id, userId, title,category,content,creationDate, lastModifiedDate});
    }
    catch(err)
    {
        res.status(500).json({message : `${err}`});
    }
});
app.delete("/blogs/:id", (req, res) => {
    try{
        const deletedBlog = db.deleteBlog(req.params.id);
        if (deletedBlog.changes !== 1) {
            return res.status(501).json({message: "Blog delete failed"});
        }

        res.status(200).json({message : "Delete succesful"});
    }
    catch(err)
    {
        res.status(500).json({message : `${err}`});
    }
});

app.listen(PORT, () =>{
    console.log(`Server runs on ${PORT}`);
});