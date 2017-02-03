

var uIDFormat = function(number, width) {
    return new Array(+width + 1 - (number + '').length).join('0') + number;
}
var centerIdFormat = function(number, width) {
    return number + new Array(+width + 1 - (number + '').length).join('0');
}

exports.paginate = function(req) {
    console.log(req.query)
    var pages = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10
    };

    return pages;
}


var paginate = function(req) {
    return require('./paginate').paginate(req);
}







exports.outPatientCount = function(req) {

    var patients = model.model(false);
    var deferred = Q.defer();
    var filters = {};
    if (req.query.days == 1) {
        var dat = new moment().format('DD-MM-YYYY');

        filters.created = {


            $gte: new Date(dat),
            $lt: new Date(dat)

        };
    } else {
        var first_day_of_month = new moment().date(1).format('YYYY-MM-DD');
        var last_day_of_month = new moment().date(30).add(1, 'days').format('YYYY-MM-DD');
        // if you take last day of month and given only lessthan so added one day to last day of month
        filters.created = {
            $gte: new moment(first_day_of_month).format('YYYY-MM-DD'),
            $lt: new moment(last_day_of_month).format('YYYY-MM-DD')
        }

    }
    console.log(filters.created)

    filters.center_code = req.query.center_code;

    patients.find(filters, function(err, list) {
        if (err) {
            deferred.reject({
                status: "error",
                message: err
            })
        } else {
            deferred.resolve({
                status: "success",
                message: list.length
            });
        }
    })
    return deferred.promise;

}

exports.findAllPatients = function(filter, pagination) {
    var users = model.model(false);
    var centers = center_model.model(false);
    var deferred = Q.defer();

    /**
    CHecking whether searchValue is Integer or not. 
    If it is integer then search for Phone number or UUID
    If it is String then search for First_name or 
    **/
    if (filter.searchValue && filter.searchValue.length > 0) {

        if (isNaN(filter.searchValue) === true) {
            filter = {
                $or: [{
                    first_name: {
                        '$regex': filter.searchValue,
                        '$options': 'i'
                    }
                }, {
                    last_name: {
                        '$regex': filter.searchValue,
                        '$options': 'i'
                    }
                }]
            }
        } else {

            filter = {
                $or: [{
                    phone: parseInt(filter.searchValue)
                }, {
                    uuid: parseInt(filter.searchValue)
                }]
            }
        }
    } else {
        filter = {};
    }


    users.paginate(
        filter, {

            page: pagination.page,
            limit: pagination.limit,
            sortBy: {
                _id: 1
            }
        },
        function(err, list, pages, itemCount) {
            if (err) {
                var errorMessage = require('./error_logs').getModelErrors(err);
                deferred.reject({
                    status: 'error',
                    message: errorMessage
                });
            } else {
                console.log(list.length)
                deferred.resolve({
                    status: 'success',
                    message: list,
                    total_pages: pages,
                    total_items: itemCount
                });

            }
        }
    );


    return deferred.promise;
};
