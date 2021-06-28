const express = require('express');
const app = express();
require('./models/showSchema');
require('./models/userSchema');
const bodyParser = require('body-parser');
const PORT = process.env.PORT||3000;
const mongoose = require('mongoose');
const multer = require('multer');
const upload = require('./multer');
const cloudinary = require('./cloudinary');
const fs = require('fs');
const requireToken = require('./middleware/requireToken');
const cors = require('cors');


const showRoutes = require('./routes/showRoutes');
const userRoutes = require('./routes/userRoutes');


mongoose.connect('mongodb+srv://pbhati55:pbhati55@cluster0-0xans.mongodb.net/test?retryWrites=true&w=majority');

app.use(bodyParser.json());
app.use(cors());
app.use(userRoutes);
app.use(showRoutes);


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.use('/upload-images', upload.single('image'), async (req, res) => {
    const uploader = async (path) => await cloudinary.uploads(path, 'Images')
    if(req.method === "POST"){
        // const urls = []
        const file = req.file
        // for(const file of files){
        //     const {path} = file
        //     const newPath = await uploader(path)
        //     urls.push(newPath)
        //     fs.unlink(path)
        // }
        const {path} = file;
        const newPath = await uploader(path);
        let url = newPath
        fs.unlinkSync(path)
        res.status(200).json({
            message: "Images are uploaded succesfuly",
            data: url
        })
    }
    else {
        res.status(405).json({
            err: "Images not uploaded succesfuly"
        })
    }
})

// app.use('/upload-images', upload.single('image'), async (req, res) => {
//     const uploader = async (path) => await cloudinary.uploads(path, 'Images')
//     if(req.method === "POST"){
//         // const urls = []
//         // const files = req.files
//         // const url 
//       try {  const file = req.file
//     //     for(const file of files){
//     //         const { path } = file
//     //         const newPath =  await uploader(path)
//     //         urls.push(newPath)
//     //         fs.unlinkSync(path)
//     //     }
//     //     res.status(200).json({
//     //         message: "Images are uploaded succesfully",
//     //         data: urls
//     //     })
//     // }
//     // else {
//     //     res.status(405).json({
//     //         err: "Images not uploaded succesfully"
//     //     })
//     // }
//     const { path } = file
//     const url = await uploader(path) 
//     fs.unlinkSync(path)
//     res.status(200).json({
//         message: "Image has been uploaded succesfully",
//         data: url
//     })
//     }
//     catch {
//         res.status(405).json({
//             err: "Images are not been uploaded succefully"
//         })
//     }
// }
// })


// app.use(multer({dest:'./uploads/',
//     rename: function (fieldname, filename){
//         return filename;
//     }
// }));


mongoose.connection.on('connected', () => {
     console.log("connected to mongo database yeahh")
 });

 mongoose.connection.on('error', (err) => {
    console.log("This is error ",err)
});

app.get('/', requireToken, (req, res) => {
    res.send("Your email is "+ req.user.Email);
})

app.listen(PORT, () => {
    console.log("The server is up and running")
});


