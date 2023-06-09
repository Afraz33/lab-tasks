const { signup, login } = require("../controllers/userController");
const { setJobs,setApplication } = require("../controllers/jobController");
const jwt = require("jsonwebtoken");


const userRoutes = require("express").Router();
userRoutes.post("/signup" , signup)
userRoutes.post("/login" , login)
//user route to add new job only by an employee



let DecodeUser = (req , res , next)=>{
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token , process.env.SECRET_KEY , (err , decoded)=>{
        if(!err){
            req.decoded = decoded;
            next();
        }else{
            res.status(403).json({token:token, message:"Not Authorized"})
        }
    }
    )
}

let CheckIfEmployee = (req , res , next)=>{
    if(req.decoded.type == "Employee"){
        next();
    }else{
        res.status(403).json({"Message":"Not Authorized as Employee"})
    }
}
//Add jobs by Employee
userRoutes.post("/addJobs" , DecodeUser , CheckIfEmployee , setJobs)


//Add applications by user
userRoutes.post("/addApplication" , DecodeUser  , setApplication)
// userRoutes.get("/" , DecodeUser , (req , res)=>{
//     res.status(200).json({"Message":"You have viewed the to secret page"})
// })

// userRoutes.get("/admin" , DecodeUser , CheckIfAdmin , (req , res)=>{
//     res.status(200).json({"Message":"You have viewed the to, secret page admin"})
// })  
 


// //user route to add article by anyone
// userRoutes.post("/articlepublic" , DecodeUser , setArticles)

// //user route to get all articles
// userRoutes.get("/allarticles" , DecodeUser , getArticles)

// //user route to delete an article
// userRoutes.delete("/article/:id" , DecodeUser , CheckIfAdmin , deleteArticles)

// //user route to update an article
// userRoutes.patch("/article/:id" , DecodeUser , CheckIfAdmin , updateArticles)


//     //middleware to get an article by Id
//     const getArticleById = async (req , res , next)=>{
//         try{
//             const article = await Article.findById(req.params.id)
//             if(article == null){
//                 return res.status(404).json({message:"Article not found"})
//             }
//             res.article = article;
//             next();
//         }catch(err){
//             res.status(500).json({message:err.message})
//         }
//     }


module.exports = userRoutes;