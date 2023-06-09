const asyncHandler = require('express-async-handler')

const jobs = require('../models/jobModel')

// @desc Set articles
// @route POST /api/articles
// @access Private
const setJobs = asyncHandler (async(req, res)=>{
    if(!req.body.jobTitle || !req.body.jobDescription || !req.body.jobTags){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Article.create({
       title: req.body.title,
       author: req.body.author,
         body: req.body.body,
            published: req.body.published,
            tag: req.body.tag
            
    })
    res.status(200).json(goal)
   
})

const setApplication = asyncHandler (async(req, res)=>{

    console.log(req.files)

    res.send({"ASD": "asd"})

    let file =  req.files.file;
    // let asd = req.file.asd;

    file.mv(".\\"+ file.name, (err)=>{

        res.send(err)
      
    })

        
})


module.exports = {setApplication, setJobs}