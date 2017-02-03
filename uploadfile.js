var service = require('../services/uploadFiles');

var paginate = function(req) {
    return require('./paginate').paginate(req);
}

exports.uploadNewFile = function(req, res) {
    service.uploadNewFile(req).then(function(data) {
        res.send(data);

    }).fail(function(err) {
        res.send(err);
    })
}

exports.updateExistingFile = function(req, res) {
    if (!req.body.filename || !req.body.s3Path) {
        res.send({
            status: "error",
            message: "Please upload atleast one file"
        })
    } else {
        service.updateExistingFile(req).then(function(data) {
            res.send(data);

        }).fail(function(err) {
            res.send(err);
        })
    }

}


exports.deleteFile = function(req, res) {
    service.deleteFile(req.params.fileID).then(function(data) {
        res.send(data);

    }).fail(function(err) {
        res.send(err);

    })
}

exports.allUploadedFiles = function(req, res) {

    service
        .allUploadedFiles(req.params.patientID, paginate(req))
        .then(function(data) {

            res.send(data);

        })
        .fail(function(err) {
            // @TODO-DEV: Add proper error handling here
            res.send(err);
        });



}

exports.getSingleFile = function(req, res) {

    service.getSingleFile(req.params.fileID).then(function(data) {

        res.send(data);

    }).fail(function(err) {

        res.send(err);
    })
}
///service


exports.uploadNewFile = function(req) {




    var deferred = Q.defer();

    var uploaded_data = [];

    if (req.files.file && req.files.file.length === undefined) {
        var file = req.files.file;
        var fileName = Date.now() + "-" + file.originalFilename;
        fs.readFile(file.path, function(err, data) {
            if (err) throw err; // Something went wrong!
            var s3bucket = new AWS.S3({
                params: {
                    Bucket: S3_BUCKET
                }
            });
            s3bucket.createBucket(function() {
                var params = {
                    Key: fileName,
                    Body: data,
                    ACL: 'public-read'
                };
                s3bucket.upload(params, function(err, data) {
                    if (err) {

                        deferred.reject({
                            status: "error",
                            message: err
                        })
                    } else {
                        console.log(data)
                        deferred.resolve({
                            status: "success",
                            message: data
                        });
                    }

                });
            });
        });
    } else {
        var i = 0;
        async.forEach(req.files.file, function(file, callback) {

            var fileName = Date.now() + "-" + file.originalFilename;
            fs.readFile(file.path, function(err, data) {
                if (err) throw err; // Something went wrong!
                var s3bucket = new AWS.S3({
                    params: {
                        Bucket: S3_BUCKET
                    }
                });
                s3bucket.createBucket(function() {
                    var params = {
                        Key: fileName,
                        Body: data,
                        ACL: 'public-read'
                    };
                    s3bucket.upload(params, function(err, data) {
                        // 
                        uploaded_data.push(data);
                        i++;
                        //This is temporary
                        if (i == req.files.file.length) {
                            if (err) {

                                deferred.reject({
                                    status: "error",
                                    message: err
                                })
                            } else {

                                deferred.resolve({
                                    status: "success",
                                    message: uploaded_data
                                });
                            }
                        }



                    });
                });
            });
            callback();


        }, function(err) {


        });
    }



    return deferred.promise;

}


exports.updateExistingFile = function(data) {

    var userfiles = model.model(false);
    var ObjectId = require('mongoose').Types.ObjectId;
    var deferred = Q.defer();
    var tofind = data.body._id;
    delete(data.body._id);
    userfiles.findOneAndUpdate({
        _id: tofind
    }, data.body, function(err, updatedata) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(updatedata);
        }
    })

    return deferred.promise;

}

function uploadFileToS3(req) {


    var S3_BUCKET = "blckdog";
    var file = req.files.file;
    var fileName = Date.now() + "-" + file.originalFilename;
    AWS.config.loadFromPath("../app/configurations/aws.json");
    fs.readFile(file.path, function(err, data) {
        if (err) throw err; // Something went wrong!
        var s3bucket = new AWS.S3({
            params: {
                Bucket: S3_BUCKET
            }
        });
        s3bucket.createBucket(function() {
            var params = {
                Key: fileName,
                Body: data,
                ACL: 'public-read'
            };
            s3bucket.upload(params, function(err, data) {


                if (err) {
                    console.log('ERROR MSG: ', err);
                    deferred.reject({
                        status: "error",
                        message: err
                    })
                } else {

                    var uploadedFiles = model.model(true);
                    var ObjectId = require('mongoose').Types.ObjectId;
                    var deferred = Q.defer();
                    uploadedFiles._id = new ObjectId();
                    uploadedFiles.filename = data.Location;
                    uploadedFiles.patientID = req.params.patientID;
                    uploadedFiles.created = new Date();
                    uploadedFiles.inS3 = true;
                    uploadedFiles.s3Path = data;
                    console.log("query ", req.query.patientID)
                    console.log("param ", req.params.patientID)
                    uploadedFiles.save(function(error, dbdata) {

                        if (error) {
                            deferred.reject({
                                status: "error",
                                message: error
                            });
                        } else {
                            deferred.resolve({
                                status: "success",
                                message: dbdata
                            });
                        }
                    })
                    return deferred.promise;

                    /*
                    res.status(200).send({
                        status: "success",
                        message: [{
                            Location: data.Location
                        }]
                    });*/

                }
            });
        });
    });

}

exports.deleteFile = function(Id) {
    var userfiles = model.model(false);
    var deferred = Q.defer();
    userfiles.findOneAndRemove({
        _id: Id
    }, function(err, data) {
        if (err) {
            deferred.reject({
                status: "error",
                message: err
            })

        } else {
            deferred.resolve({
                status: "success",
                message: data
            })
        }

    })


    return deferred.promise;

}


exports.allUploadedFiles = function(patientId, pagination) {

    var userfiles = model.model(false);
    var deferred = Q.defer();


    userfiles.find({
        patientID: patientId
    }).sort({
        _id: -1
    }).exec(function(err, list) {
        if (err) {
            deferred.reject({
                status: "error",
                message: err
            })
        } else {
            deferred.resolve({
                status: "success",
                message: list
            })
        }
    })

    return deferred.promise;
}
