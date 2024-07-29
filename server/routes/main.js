const express = require('express');
const app = express();
const router = express.Router();
const Post = require('../models/post');
const Event = require('../models/event');
const CommunityPost = require('../models/community_post');

// const multer = require('multer');
const communityLayout = '../views/layouts/communitylayout';
// Configure Multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

const multer = require('multer');


// Configure Multer
const storage = multer.memoryStorage(); // Use memory storage for handling files in memory

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size if needed
  },
});

module.exports = upload;

router.get("", async (req,res)=>{
  const locals = {
    title: "Node Js Blog",
    description: "Simple Blog Creation"
  }
  try {
    const data = await Post.find();
    res.render("index", {data});
  } catch(error){
    console.log(error);
  }
    
  });

  router.get("/about", async (req,res)=>{
    try {
      const data = await Event.find();
      res.render("about", {data});
    } catch(error){
      console.log(error);
    }
  });
  router.get("/contact", async (req,res)=>{
    const locals = {
      title: "Node Js Blog",
      description: "Simple Blog Creation"
    }
    try {
      res.render("contact", locals);
    } catch(error){
      console.log(error);
    }
  });
  
  router.get("/community", async (req,res)=>{
    const locals = {
      title: "Community",
      description: "Simple Blog Creation"
    }
    try {
      res.render("community", {locals, layout: communityLayout});
    } catch(error){
      console.log(error);
    }
  });

  router.get("/weather", async (req,res)=>{
    try {
      res.render("weather");
    } catch(error){
      console.log(error);
    }
  });

  router.get("/weather", async (req,res)=>{
    try {
      res.render("weather");
    } catch(error){
      console.log(error);
    }
  });
  // **
  // * Get /
  // * Post: id
  // */
 router.get("/post/:id", async (req,res)=>{
   try {
     let slug = req.params.id;
     const data = await Post.findById({_id : slug});

     const locals = {
       title: data.title,
       description: "Simple Blog Creation"
     }
     
     
     res.render('post', {locals, data, currentRoute: `/post/${slug}`});
   } catch(error){
     console.log(error);
   }
     
   });
   /**
  * post /
  * Post: search
  */
 router.post("/search", async (req,res)=>{
   try {
     const locals = {
       title: "Search",
       description: "Simple Blog Creation"
     }
     let searchTerm = req.body.searchTerm;
     const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")

     const data = await Post.find({
       $or: [
        { Name: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { phone: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { state: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { city: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { pincode: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
      ]

       
     });
     res.render( 'search',{
       locals,
       data
     });
   } catch(error){
     console.log(error);
   }
     
   });

    // COMMUNITY ROUTES
  //   router.get('/api/posts', async (req, res) => {
  //     try {
  //         const posts = await CommunityPost.find();
  //         res.json(posts);
  //     } catch (err) {
  //         res.status(500).json({ message: err.message });
  //     }
  // });
//   router.get('/api/posts', async (req, res) => {
//     try {
//       // Assuming you have a model named CommunityPost for posts
//       const posts = await CommunityPost.find();
//       res.json(posts);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
  
  
//   // router.post('/api/posts', upload.single('photo'), async (req, res) => {
//   //   console.log(req.file);
//   //     const cpost = new CommunityPost({
//   //         title: req.body.title,
//   //         body: req.body.body,
//   //         photo: req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null

//   //     });
    
//   //     try {
//   //         const newCPost = await cpost.save();
//   //         res.status(201).json(newCPost);
//   //     } catch (err) {
//   //         res.status(400).json({ message: err.message });
//   //     }
//   // });
//   const axios = require('axios');

// router.post('/api/posts', upload.single('photo'), async (req, res) => {
//   try {
//     const formData = new FormData();
//     formData.append('title', req.body.title);
//     formData.append('body', req.body.body);
//     if (req.file) {
//       formData.append('photo', req.file.buffer, { filename: req.file.originalname });
//     }

//     const response = await axios.post('https://krishisahyog.onrender.com/posts', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         ...formData.getHeaders()
//       }
//     });

//     res.status(201).json(response.data);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

//   // router.patch('/api/posts/:id/like', async (req, res) => {
//   //     try {
//   //         const cpost = await CommunityPost.findById(req.params.id);
//   //         if (!cpost) return res.status(404).json({ message: 'Post not found' });
  
//   //         cpost.likes = (cpost.likes || 0) + 1;
//   //         const updatedPost = await cpost.save();
//   //         res.json(updatedPost);
//   //     } catch (err) {
//   //         res.status(400).json({ message: err.message });
//   //     }
//   // });
//   router.patch('/api/posts/:id/like', async (req, res) => {
//     try {
//       const postId = req.params.id;
  
//       const response = await axios.patch(`https://krishisahyog.onrender.com/posts/${postId}/like`);
  
//       res.json(response.data);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });
router.get('/api/posts', async (req, res) => {
  try {
    const posts = await CommunityPost.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new post with photo upload to Cloudinary
router.post('/api/posts', upload.single('photo'), async (req, res) => {
  try {
    let photoURL = '';

    if (req.file) {
      const formData = new FormData();
      formData.append('file', req.file.buffer, { filename: req.file.originalname });
      formData.append('upload_preset', 'Krishisahyog'); // Replace with your Cloudinary upload preset

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/Ydzz0ng826/image/upload`, // Replace with your Cloudinary cloud name
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
      );

      photoURL = cloudinaryResponse.data.secure_url;
    }

    const newPost = new CommunityPost({
      title: req.body.title,
      body: req.body.body,
      photo: photoURL,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Like a post
router.patch('/api/posts/:id/like', async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await CommunityPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.likes += 1;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//  function insertPostData (){
//    Post.insertMany([
//      {
//        title: "Bhartiya Janta Party",
//      body: "Lorem",    state: "Delhi",    city: "jfhio",    pincode: "8945"
//    }
      
//     ])
//     }
// insertPostData();

//function insertEventData (){
//     Event.insertMany([
//       {
//         title: "Aam Aadmi Party",
//       body: "badhiya party hai",
//       link: "https://www.google.com/search?q=Aam+Aadmi+party&sca_esv=2e47e62a151241ca&bih=679&biw=1366&hl=en&tbm=nws&sxsrf=ADLYWII7XkWRdBQ7BhdeATaAujSKYFIVUw:1716026142398&story=GiMSIUFBUCBNUCBTd2F0aSBNYWxpd2FsIGFzc2F1bHQgY2FzZTIyCij1rqiq4vHb69UBhs7Km7f9konkAbKekr6WiKP7jwHK04vVw_O36tQBELLY0NALGAVyAhAB&fcs=ACgqzeda-5htx4fotKoM2mIX4vka4wmSyw&sa=X&ved=2ahUKEwj445HF95aGAxUlfGwGHRVdBIsQjcEJegQIGxAD"
//     },
//     {
//       title: "Bhartiya Janta Party",
//     body: "Donation should be done",
//      link: "https://www.bjp.org/home"
//     },
//     {
//      title: "Samajwadi Party",
//    body: "Kardo inhe bhi",
//    link: "https://www.samajwadiparty.in/"
//  }
//        ])
//      }
//  insertEventData();
 module.exports = router;