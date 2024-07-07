// const express = require('express');
// const app = express();
// const router = express.Router();
// const Post = require('../models/post');
// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const jwtsecret = process.env.jwtSECRET;

// const adminLayout = '../views/layouts/admin';
// const authmiddleware = (req,res,next) => {
//     const token = req.cookies.token;
//     if(!token){
//         return res.status(401).json( { message: 'Unauthorized'} );
//     }
//     try{
//         const decoded = jwt.verify(token, jwtsecret);
//         req.userId = decoded.userId;
//         next();
//     }catch(error){
//         console.log(error);
//     }
// }
// /**
//  * get /
//  * home
//  */
// router.get('/admin',async (req,res) =>{
// try {
//     const locals = {
//         title: "Admin",
//         description: "Simple Blog "
//     }
//     res.render('admin/index',{locals, layout: adminLayout});
// }catch(error){  
//     console.log(error);
// }
// });


// /**
//  * post /
//  * admin - chack login
//  */
// router.post('/admin',async (req,res) =>{
//     try {
//         const { username, password } = req.body;
//         const user = await User.findOne({username});
//         if(!user){
//             res.redirect('/errorfile');
//         }
//         const isPasswordvalid  = await bcrypt.compare(password, user.password);
//         if(!isPasswordvalid){
//             res.redirect('/errorfile');
//         }
//         const token = jwt.sign({userId: user._id},jwtsecret);
//         res.cookie('token', token, {httpOnly: true});
//         res.redirect('/dashboard');
//     }catch(error){
//         console.log(error);
//     }
//     });
//     router.get('/errorfile',async (req,res) =>{
//         res.send('errorfile');
//     });

// router.get('/dashboard', authmiddleware ,async (req,res) =>{
//         const locals = {
//             title: 'DashBoard',
//             description : 'Simple Blog DashBoard'
//         };
//         try{
//             const data = await Post.find();
//             res.render('admin/dashboard',{locals, data, layout: adminLayout});
//         }catch(error){
//             console.log(error);
//         // Handle error rendering dashboard
        
//         }
         
//     });
    



//     router.get('/add-Post', authmiddleware ,async (req,res) =>{
//         const locals = {
//             title: 'Add Post',
//             description : 'Simple Blog DashBoard'
//         };
//         try{
//             const data = await Post.find();
//             res.render('admin/add-Post',{locals,layout: adminLayout});
//         }catch(error){
//             console.log(error);
//         // Handle error rendering dashboard
//         res.send('/errorfile');
//         }
         
//     });
    
//     /**
//      * post
//      * admin-add new post
//      */

//     router.post('/add-Post', authmiddleware ,async (req,res) =>{
        
//         try{
//             try{
//                 const newpost = new Post({
//                     title: req.body.title,
//                     body: req.body.body
//                 });
//                 await Post.create(newpost);  
//                 res.redirect('/dashboard');

//             }catch(error){
//                 res.send('/errorfile');
//             }


          
//         }catch(error){
//             console.log(error);
//         // Handle error rendering dashboard
//         res.send('/errorfile');
//         }
         
//     });


//     router.put('/edit-post/:id', authmiddleware ,async (req,res) =>{
       
//         try{
//             await Post.findByIdAndUpdate(req.params.id, {
//                 title: req.body.title,
//                 body: req.body.body,
//                 updatedAt: Date.now()
//             });
//             res.redirect(`/edit-post/${req.params.id}`);
//         }catch(error){
//             console.log(error);
//         // Handle error rendering dashboard
//         res.send('/errorfile');
//         }
         
//     });
    



//     router.get('/edit-post/:id', authmiddleware ,async (req,res) =>{
       
//         try{
//             const locals = {
//                 title: 'Edit Post',
//                 description : 'Simple Blog Edititng DashBoard'
//             };
//             const data = await Post.findOne({ _id: req.params.id});
//             res.render('admin/edit-post',
//             {locals,
//             data,
//             layout: adminLayout});
//         }catch(error){
//             console.log(error);
//         // Handle error rendering dashboard
//         res.send('/errorfile');
//         }
         
//     });
    
//    /**
//  * delete /
//  * admin - delete post
//  */


//     router.delete('/delete-post/:id', authmiddleware ,async (req,res) =>{
       
//         try{
//            await Post.deleteOne({ _id: req.params.id});
//            res.redirect('/dashboard');
//         }catch(error){
//             console.log(error);
//         // Handle error rendering dashboard
//         res.send('/errorfile');
//         }
         
//     });
//  /**
//  * get /
//  * admin - logout
//  */
// router.get('/logout', authmiddleware ,async (req,res) =>{
//     res.clearCookie('token');
//     res.redirect('/');
// });
    
//     /**
//  * post /
//  * admin - chack register
//  */
// router.post('/register',async (req,res) =>{
//     try {
//         const { username, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         try{
//             const user = await User.create({username, password: hashedPassword});
//             res.status(201).json({message: 'User Created', user});
//         }catch(error){
//             if(error.code === 11000){
//                 res.status(409).json({message: 'user already in use'});
//             }
//             res.status(500).json({message: 'Internal Server error'});
//         }

       
//     }catch(error){
//         console.log(error);
//     }
//     });
    
    









// module.exports = router;
const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtsecret = process.env.jwtSECRET;

const adminLayout = '../views/layouts/admin';

const authmiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, jwtsecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};

/**
 * GET /admin
 * Admin Home
 */
router.get('/admin', async (req, res) => {
    try {
        const locals = {
            title: "Admin",
            description: "Simple Blog"
        };
        res.render('admin/index', { locals, layout: adminLayout });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * POST /admin
 * Admin - Check Login
 */
router.post('/admin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.redirect('/errorfile');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.redirect('/errorfile');
        }
        const token = jwt.sign({ userId: user._id }, jwtsecret);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/errorfile', async (req, res) => {
    res.send('Error occurred. Please try again.');
});

/**
 * GET /dashboard
 * Admin Dashboard
 */
router.get('/dashboard', authmiddleware, async (req, res) => {
    try {
        const locals = {
            title: 'Dashboard',
            description: 'Simple Blog Dashboard'
        };
        const data = await Post.find();
        res.render('admin/dashboard', { locals, data, layout: adminLayout });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * GET /add-post
 * Add New Post
 */
router.get('/add-post', authmiddleware, async (req, res) => {
    try {
        const locals = {
            title: 'Add Post',
            description: 'Simple Blog Dashboard'
        };
        res.render('admin/add-post', { locals, layout: adminLayout });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * POST /add-post
 * Admin - Add New Post
 */
router.post('/add-post', authmiddleware, async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            body: req.body.body
        });
        await Post.create(newPost);
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * PUT /edit-post/:id
 * Edit Post
 */
router.put('/edit-post/:id', authmiddleware, async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
        });
        res.redirect(`/edit-post/${req.params.id}`);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * GET /edit-post/:id
 * Edit Post Page
 */
router.get('/edit-post/:id', authmiddleware, async (req, res) => {
    try {
        const locals = {
            title: 'Edit Post',
            description: 'Simple Blog Editing Dashboard'
        };
        const data = await Post.findOne({ _id: req.params.id });
        res.render('admin/edit-post', {
            locals,
            data,
            layout: adminLayout
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * DELETE /delete-post/:id
 * Delete Post
 */
router.delete('/delete-post/:id', authmiddleware, async (req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.id });
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * GET /logout
 * Admin Logout
 */
router.get('/logout', authmiddleware, (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

/**
 * POST /register
 * Admin - Register New User
 */
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const user = await User.create({ username, password: hashedPassword });
            res.status(201).json({ message: 'User Created', user });
        } catch (error) {
            if (error.code === 11000) {
                return res.status(409).json({ message: 'Username already in use' });
            }
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
