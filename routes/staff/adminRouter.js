const express = require('express');
const {registerAdminCtrl, 
    loginAdminCtrl, 
    getAdminsCtrl,
    getAdminProfileCtrl,
    deleteAdminCtrl,
    updateAdminCtrl,
    adminPublishExamCtrl,
    adminUnpublishExamCtrl,
    adminWithdrawTeacherCtrl,
    adminUnwithdrawTeacherCtrl,
    adminSuspendTeacherCtrl,
    adminUnsuspendTeacherCtrl,
} = require('../../controller/staff/adminCtrl');
const islogin = require("../../middlewares/isLogin");
const isAdmin = require('../../middlewares/isAdmin');

const adminRouter = express.Router();


//Register
adminRouter.post("/register", registerAdminCtrl);

//Login
adminRouter.post("/login", loginAdminCtrl);

//Get all
adminRouter.get('/', islogin, isAdmin, getAdminsCtrl);

//Get Admin Profile
adminRouter.get('/profile', islogin, isAdmin, getAdminProfileCtrl);

//update
adminRouter.put('/',islogin, isAdmin, updateAdminCtrl);

//delete
adminRouter.delete('/:id', deleteAdminCtrl);

//suspend teacher
adminRouter.put('/suspend/teacher/:id', adminSuspendTeacherCtrl);

//unsuspend teacher
adminRouter.put('/unsuspend/teacher/:id', adminUnsuspendTeacherCtrl);

//withdraw teacher
adminRouter.put('/withdraw/teacher/:id', adminWithdrawTeacherCtrl);

//unwithdraw teacher
adminRouter.put('/unwithdraw/teacher/:id', adminUnwithdrawTeacherCtrl);

//publsih exam
adminRouter.put('/publish/exam/:id', adminPublishExamCtrl);

//unpublish Exam
adminRouter.put('/unpublish/exam/:id', adminUnpublishExamCtrl);

module.exports = adminRouter;