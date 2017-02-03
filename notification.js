exports.paginate = function(req) {
    console.log(req.query)
    var pages = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10
    };

    return pages;
}
exports.filterByNotifications = function(req, res) {
    var filters = sanitizeFilters(req);

    if (!Object.keys(filters).length) {
        res.send({
            status: "error",
            message: "Please enter a valid filter!"
        });
    } else {
        console.log(filters)
        service
            .filterByNotifications(filters)
            .then(function(data) {
                res.send(data);
            })
            .fail(function(err) {
                res.send(err);
            });
    }
}
var paginate = function(req) {
    var pages = {
        page: req.query.page,
        limit: req.query.limit
    };

    return pages;
}
var sanitizeFilters = function(req, type) {

    var sanitizedFilters = {};
    try {
        var filters = configurations['search_filters'];
        for (var i in filters) {
            if (typeof filters[i] == 'object') {
                for (var key in filters[i]) {
                    if (typeof filters[i] != 'function' && req.param(key)) {
                        filters[i][key]['value'][filters[i][key]['dynamic']] = req.param(key);
                        sanitizedFilters[filters[i][key]['field']] = filters[i][key]['value'];
                    }
                }
            } else if (req.param(filters[i])) {
                sanitizedFilters[filters[i]] = req.param(filters[i]);
            }
        }
    } catch (e) {
        console.log(e);
    }

    return sanitizedFilters;
}
////service

var model = require('../models/notifications');
var Q = require('q');


exports.saveNotification = function(data) {

    var notification = model.model(true);
    var ObjectId = require('mongoose').Types.ObjectId;
    var deferred = Q.defer();

    notification._id = new ObjectId();
    notification.title = data.title;
    notification.description = data.description;
    notification.created = new Date();
    notification.notify_type = data.notify_type;
    notification.link = data.link;
    notification.isRead = data.isRead;
    notification.sender_id = data.sender_id;
    notification.sender_type = data.sender_type;
    notification.reciever_id = data.reciever_id;
    notification.reciever_type = data.reciever_type;

    notification.save(function(error, data) {
        if (error) {
            deferred.reject({
                status: "error",
                message: error
            });
        } else {
            /*io.on('connection', function(socket) {
                socket.emit('newConsultation', {
                    data: data
                });
            });
*/
            deferred.resolve({
                status: "success",
                message: data
            })
        }
    });

    return deferred.promise;
}

exports.updateNotification = function(data) {
    var notification = model.model(false);
    var ObjectId = require('mongoose').Types.ObjectId;
    var deferred = Q.defer();

    var tofind = data.body._id;

    delete(data.body._id);

    notification.findOneAndUpdate({
        _id: tofind
    }, data.body, function(err, updatedata) {
        if (err) {
            deferred.reject({
                status: "error",
                message: err
            });
        } else {

            deferred.resolve({
                status: "success",
                message: updatedata
            })
        }
    })

    return deferred.promise;

}

exports.filterByNotifications = function(filter) {
    var notification = model.model(false);
    var deferred = Q.defer();
    if (filter.isRead == 'true' || filter.isRead == 1) {
        filter.isRead = true;
    } else {
        filter.isRead = false;
    }
    notification.find(filter).sort({
        created: -1
    }).exec(function(err, list) {
        if (err) {
            deferred.reject({
                status: "error",
                message: err
            });
        } else {

            deferred.resolve({
                status: "success",
                message: list
            })
        }
    })
    return deferred.promise;
}

exports.sanitizeFilters = function(req, filters_page, filters) {

    var sanitizedFilters = {};

    try {
        var allowed_filters = require("../configurations/filters/" + filters_page);

        var filters = allowed_filters[filters];

        for (var i in filters) {

            if (typeof filters[i] == 'object') {
                for (var key in filters[i]) {
                    if (typeof filters[i] != 'function' && req.param(key)) {

                        filters[i][key]['value'][filters[i][key]['dynamic']] = req.param(key);

                        sanitizedFilters[filters[i][key]['field']] = filters[i][key]['value'];
                    }
                }
            } else if (req.param(filters[i])) {
                sanitizedFilters[filters[i]] = req.param(filters[i]);
            }
        }

    } catch (e) {
        console.log(e);
    }


    return sanitizedFilters;
}
