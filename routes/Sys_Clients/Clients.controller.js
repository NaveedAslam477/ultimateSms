'use strict';
var mongoose = require('mongoose');
var ClientModal = require('./Clients.Model');
var uploadModal = require('../upload/upload');
var multer  = require('multer');
var path  = require('path');

    var controller = {}
var imageData = uploadModal.find({});
// router.use(express.static(__dirname+".public/"));

var Storage = multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,image,cb)=>{
        cb(null,image.fieldname+"_"+Date.now+ path.extname(image.originalname));
    }
})
var upload = multer({
    storage : Storage
}).single('image');

// router.post('/upload',upload,function (req,res,next)
controller.upload_file_ClientModal = upload,function(req,res){
var imageFile= req.image.filename;
var imageDetail = new uploadModal({
    imagename:imageFile
});
imageDetail.save(function(err,res){
    if(err) throw err;
    imageData.exec(function(err,data){
        if(err) throw err;
        // res.status(200).send({
        //     message: 'SuccessFully Uploaded'
        //  });
        res.send(data);
        console.log(data);
    })
})
}
controller.upload_listfile_ClientModal=function(req,res){
    imageData.exec(function(err,data){
        if(err) throw err;
        res.send(data);
        console.log(data);
    })
}



    controller.get_all_ClientModals = function(req,res){
        ClientModal.find({},function(err,cm){
            console.log('All Staff are Successfully Retreived')
            if(err)
            res.send(err);
            res.json(cm);
        });
    }
    controller.create_a_ClientModal = upload,function(req,res){
        var new_ClientModal = new ClientModal(req.body,req.body.image);
        console.log(req.image);
        new_ClientModal.save(function(err,cm){
            console.log('Successfully Inserted');
            if (err)
            res.send (err);
            res.json(cm);
        });   
    }
    controller.getByUserId = function (req, res) {
            console.log('i a working');
            ClientModal.find( { Id:req.params.id},function (err, cm){
            if (err)
                res.send(err);
            res.json(cm);
        });
    };
    controller.read_a_ClientModal = function(req,res){
        ClientModal.findById(req.params.id, function(err,cm){
            console.log('Successfully Retreived')
            if(err)
            res.send(err);
            var ClientArray = [];
            CMArray.push(cm)
        res.json(ClientArray);
        });
    }
    controller.update_a_ClientModal = function(req,res){
        ClientModal.findOneAndUpdate({_id: req.params.id},req.body,{new : true},function(err,cm){
        console.log('successfully updated')
        if(err)
        res.send(err);
        res.json(cm);
    });
    }
    controller.Delete_a_ClientModal = function (req, res) {
        ClientModal.remove({
            _id: req.params.id
        }, function (err, cm) {
            if (err)
                res.send(err);
            res.json({ message: 'item Model successfully deleted' });
            res.json(cm);
        });
    };
    

    module.exports = controller; 