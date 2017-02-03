var schedule = require('node-schedule');
var async = require('async');
var consultation_model = require('../models/consultations');
var schedule_model = require('../models/schedule');
var scheduled_consultations_model = require('../models/scheduled_consultations');
var weekOffs_model = require('../models/weekOffs');
var holidays_model = require('../models/holidays');
var moment = require('moment');
var _ = require('underscore');
var Q = require('q');
var DateDiff = require('date-diff');

//No show if consultations are with status new
var no_show_cron_job = schedule.scheduleJob('0 0 0 * * *', function() {

    var consultations = consultation_model.model(false);
    consultations.find({
        status: {
            $regex: 'new',
            $options: 'i'
        }
    }, function(err, consultationsList) {
        if (err) {
            console.log(err);
        } else if (consultationsList.length > 0) {
            async.forEach(consultationsList, function(consultation, callback) {
                consultation.is_no_show = true;
                consultation.no_show_remarks = "AUTO_UPDATE";
                var tofind = consultation._id;
                delete(consultation._id);
                consultations.findOneAndUpdate({
                    _id: tofind
                }, consultation, function(e, updated) {
                    console.log(e);

                    console.log("record updated");
                })
                callback();
            })


        } else {
            console.log("No Consultation has status with NEW")
        }

    })

});



//List of Schedule dates for remote consultations excluding weekOffs and Holidays
var schedule_dates_cron_job = schedule.scheduleJob('0 0 0 1 * *', function() {
    var weekOffs = weekOffs_model.model(false);



    weekOffs.find({}, function(err, weeks) {
            if (err) {
                console.log(err);
            } else if (weeks.length > 0) {
                var weekOffDays = _.compact(_.pluck(weeks, 'day'));

                insertMonthlyWorkingDays(weekOffDays);

            } else {
                var weekOffDays = [];
                insertMonthlyWorkingDays(weekOffDays);
                //call insert function

            }
        })
        // schedule_date =  moment(schedule_date).add(1, 'days').format('DD-MM-YYYY');


});

function insertMonthlyWorkingDays(weekOffDays) {

    var holidays = holidays_model.model(false);

    var schedule_date = new Date();

    for (var i = 1; i <= 30; i++) {

        schedule_date = new Date(Date.now() + i * 24 * 60 * 60 * 1000);

        var schedule_day = moment(schedule_date).format('dddd');

        if (weekOffDays.length == 0 || (weekOffDays.length == 1 && schedule_day.toLowerCase() !== weekOffDays[0].toLowerCase()) || (weekOffDays.length == 2 && (schedule_day.toLowerCase() !== weekOffDays[0].toLowerCase()) && (schedule_day.toLowerCase() !== weekOffDays[1].toLowerCase()))) {

            roasterPlan(schedule_date);
        }


    }


}

function roasterPlan(schedule_date) {
    var scheduled_consultations = scheduled_consultations_model.model(true);
    var ObjectId = require('mongoose').Types.ObjectId;
    scheduled_consultations._id = new ObjectId();
    scheduled_consultations.schedule_date = schedule_date;
    scheduled_consultations.created = new Date();

    scheduled_consultations.save(function(error, schedule_data) {

        if (error) {
            console.log(error)
        } else {
            console.log(schedule_date + " inserted")

        }
    })



}

exports.scheduleConsultation = function(req) {
    var schedule = schedule_model.model(true);

    var deferred = Q.defer();

    schedule.speciality = req.body.speciality;
    schedule.schedule_date = req.body.schedule_date;
    schedule.number_of_slots_per_day = req.body.number_of_slots_per_day;
    schedule.timings = req.body.timings;

    schedule.author = req.body.author;
    schedule.author_type = req.body.author_type;
    schedule.created = new Date();

    /*timings = [{
        start_time: new Date(),
        end_time: new Date(date.setTime(date.getTime() + 2 * 60 * 60000))
    }]*/
    timings = req.body.timings;
    var available_slots = [];

    var minutes = 10;

    for (var i = 0; i <= timings.length - 1; i++) {
        var slot = timings[i].start_time;
        for (var j = 0; j <= 200; j++) {

            if (new DateDiff(timings[i].end_time, slot) !== 0) {

                available_slots.push(new Date(slot));

                slot.setTime(slot.getTime() + minutes * 60000);

            }
        }



    }

    schedule.available_slots = available_slots;


    schedule.save(
        function(error, result) {
            if (error) {
                var errorMessage = require('./error_logs').getModelErrors(error);
                deferred.reject({
                    status: "error",
                    message: errorMessage
                })
            } else {

                deferred.resolve({
                    status: "success",
                    message: "updated succesfully"
                })
            }

        });
    return deferred.promise;



}
