const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Admin = require('../../model/Staff/Admin');
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");
const { hashPassword, isPassMatched } = require("../../utils/helpers");




//@desc Register Admin
//@route POST/api/admins/register
//@access Private
exports.registerAdminCtrl = AsyncHandler(async (req, res)=>{
    const {name, email, password } = req.body;
    
        //Check if email exists
        const adminFound = await Admin.findOne({email});
        if(adminFound){
            throw new Error('Admin Exists');
        }
        //Hash Password
        
        //register
        const user = await Admin.create({
            name,
            email,
            password: await hashPassword(password),
        });
        res.status(201).json({
            status:'Success',
            data: user,
            message: "Admin Registered Sucessfully",
        });

});

//@desc login Admin
//@route POST/api/admins/login
//@access Private
exports.loginAdminCtrl = AsyncHandler(async (req, res)=>{
    const {email, password } = req.body;
    
        //Find User
         const user = await Admin.findOne({email});
        if(!user){
            return res.json({message: 'Invalid login Credentials'});
        }
        //Verify Password
        const isMatched = await bcrypt.compare(password, user.password);

        if(!isMatched){
            return res.json({message: 'Invalid login Credentials'});
        }else{
            return res.json({
                data: generateToken(user._id),
                message: "Admin Logged in Sucessfully"
            });
        }  
});

exports.getAdminsCtrl = AsyncHandler(async (req, res)=>{
    const admins = await Admin.find();
    res.status(200).json({
        status: "Success",
        message: "Admin Fetched Sucessfully",
        data: admins,
    });
});

exports.getAdminProfileCtrl = AsyncHandler(async(req, res)=>{
    // console.log(req.userAuth);
    const admin = await Admin.findById(req.userAuth._id).select("-password -createdAt -updatedAt");
    if(!admin){
        throw new Error ("Admin not found");
    }else{
        res.status(200).json({
            status:"Success",
            data: admin,
            message: "Admin Profile fetched Sucessfully",
        });
    }

});

exports.updateAdminCtrl = AsyncHandler(async(req, res)=>{
    const {email, name, password} = req.body
    //if email taken
    const emailExist = await Admin.findOne({email})
    if(emailExist){
        throw new Error("this email Exist");
    }
//Check if user updating the password
if(password){
    //update
    const admin = await Admin.findByIdAndUpdate(req.userAuth._id, {
        email,
        password: await hashPassword(password),
    },{
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: "Success",
        data: admin,
        message: "Admin Updated Successfully"
    })

}else{
    //update
    const admin = await Admin.findByIdAndUpdate(req.userAuth._id, {
        email,
        name,
    },{
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: "Success",
        data: admin,
        message: "Admin Updated Successfully"
    })
}
        

});


exports.deleteAdminCtrl = (req, res)=>{
    try{
        res.status(201).json({
            status:'Success',
            data:'Delete Admin',
        })

    }catch(error){
        res.json({
            status:'Failed',
            error:error.message,
        })
    }
};

exports.adminSuspendTeacherCtrl = (req, res)=>{
    try{
        res.status(201).json({
            status:'Success',
            data:'Admin Suspend Teacher',
        })

    }catch(error){
        res.json({
            status:'Failed',
            error:error.message,
        })
    }
};

exports.adminUnsuspendTeacherCtrl = (req, res)=>{
    try{
        res.status(201).json({
            status:'Success',
            data:'Admin unuspend Teacher',
        })

    }catch(error){
        res.json({
            status:'Failed',
            error:error.message,
        })
    }
};

exports.adminWithdrawTeacherCtrl = (req, res)=>{
    try{
        res.status(201).json({
            status:'Success',
            data:'Admin withdraw Teacher',
        })

    }catch(error){
        res.json({
            status:'Failed',
            error:error.message,
        })
    }
};

exports.adminUnwithdrawTeacherCtrl = (req, res)=>{
    try{
        res.status(201).json({
            status:'Success',
            data:'Admin unwithdraw Teacher',
        })

    }catch(error){
        res.json({
            status:'Failed',
            error:error.message,
        })
    }
};

exports.adminPublishExamCtrl = (req, res)=>{
    try{
        res.status(201).json({
            status:'Success',
            data:'Admin Publish Exam',
        })

    }catch(error){
        res.json({
            status:'Failed',
            error:error.message,
        })
    }
};

exports.adminUnpublishExamCtrl = (req, res)=>{
    try{
        res.status(201).json({
            status:'Success',
            data:'Admin unpublish Exam',
        })

    }catch(error){
        res.json({
            status:'Failed',
            error:error.message,
        })
    }
};