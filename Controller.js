let knex=require("./DataBase");
const { GenrateToken } = require('./jwt');



//UserCreate   
// Before creating a user, ensure that an image is uploaded and retrieve its ID to be assigned as the avatarId.
const UserCreate=async(req,res)=>{
    try{
        console.log(req.body);
        await knex("UserData").insert(req.body);
        res.send({data:req.body,message:"your data inserted successfuly...!"});
        console.log("your data inserted successfuly...!");
    }
    catch(error){
        res.send("your data is not inserted...!");
        console.log("your data is not inserted...!",error);
        
    }
}

// Read User.

const UserRead=async(req,res)=>{
    try{
        const info=await knex("UserData").where({id:req.body.id});
        res.send(info);
        console.log(info);
    }
    catch(error){
        res.send(error);
        console.log(error);
    }
}

// Update User.

const UserUpdate=async(req,res)=>{
    try{
        const info=await knex("UserData").where({id:req.body.id}).update(req.body);
        res.send({message:'your data updated succesfully...!'})
    }
    catch(err){
        res.send("Data not updated")
    }

};

// Delete User.

const UserDelete=async(req,res)=>{
    try{
        const info=await knex("UserData").where({id:req.body.id}).delete(req.body)
        res.send(200)
        console.log("your data is deleted succesfully....!");
    }
    catch(error){
        res.send(error)
    }
}

// Login User.

const LoginUser=async(req,res)=>{
    const {id,Name}=req.body
    try{
        const info=await knex("UserData").where({id:id,Name:Name});
        if(!info == ''){
            let token = GenrateToken(id)       
            res.cookie('Token',token)
            console.log("Logged in successfully....");
            res.send('Logged in successfully');
        }else{
            res.json({message:'id or Name is wrong'})
        }

    }catch(error){
        console.log(error);
    }
}


// ImagesUpload.     //Here is using multer module. this function is conected with (fileUploadServer-file)

const imageUpload=async(req, res, next)=>{
	try {
		let data = {};
		if (req.file && req.file.filename) {
			data.path = `http://localhost:3000/static/${req.file.filename}`;
            data.filename=req.file.filename
		}
        const id=await knex("Avatar").insert(data)
		res.status(200).json({...data,id:id[0]});
	} catch (error) {
		next(error);
	}
}



module.exports={
    UserCreate,
    UserRead,
    UserUpdate,
    UserDelete,
    LoginUser,
    imageUpload
}