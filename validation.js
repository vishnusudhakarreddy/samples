function check_validations(req) {
    if (req.body.address_proof_type == "Aadhar Card") {
        req.checkBody({
            'address_proof_number': {
                notEmpty: true,
                matches: {
                    options: /^[1-9]{1}\d{11}$/
                },
                errorMessage: 'Invalid Aadhar Card' // Error message for the parameter
            }
        });
    } else if (req.body.address_proof_type == "Driving License") {
        req.checkBody({
            'address_proof_number': {
                notEmpty: true,
                matches: {
                    options: /^[0-9a-zA-Z]{4,9}$/
                },
                errorMessage: 'Invalid Driving License' // Error message for the parameter
            }
        });
    } else if (req.body.address_proof_type == "Pan Card") {
        req.checkBody({
            'address_proof_number': {
                notEmpty: true,
                matches: {
                    options: /^[A-z]{5}\d{4}[A-z]{1}$/
                },
                errorMessage: 'Invalid Pan Card' // Error message for the parameter
            }
        });
    } else if (req.body.address_proof_type == "Ration Card") {
        req.checkBody({
            'address_proof_number': {
                notEmpty: true,
                matches: {
                    options: /^[0-9a-zA-Z]$/
                },
                errorMessage: 'Invalid Ration Card' // Error message for the parameter
            }
        });
    } else if (req.body.address_proof_type == "Voter Id") {
        req.checkBody({
            'address_proof_number': {
                notEmpty: true,
                matches: {
                    options: /^[A-Za-z]{3}\d{7}$/
                },
                errorMessage: 'Invalid Voter Id' // Error message for the parameter
            }
        });
    } else if (req.body.address_proof_type == "Passport") {
        req.checkBody({
            'address_proof_number': {
                notEmpty: true,
                matches: {
                    options: /^[a-zA-Z]{1}\d{7}$/
                },
                errorMessage: 'Invalid Passport' // Error message for the parameter
            }
        });
    }

    req.checkBody({
        'first_name': {
            notEmpty: true,
            matches: {
                options: /^[A-z]+$/
            },
            errorMessage: 'Invalid  first name' // Error message for the parameter
        },

        'last_name': {
            notEmpty: true,
            matches: {
                options: /^[A-z]+$/
            },
            errorMessage: 'Invalid  last name' // Error message for the parameter
        },

        'mother_name': {
            notEmpty: true,
            matches: {
                options: /^[A-z]+$/
            },
            errorMessage: 'Invalid  mother name' // Error message for the parameter
        },

        'gender': {
            notEmpty: true,
            errorMessage: 'Select gender' // Error message for the parameter
        },

        'age': {
            notEmpty: true,
            errorMessage: 'Enter age' // Error message for the parameter
        },
        'birthDate': {
            notEmpty: true,
            errorMessage: 'Select birthDate' // Error message for the parameter
        },
        'height': {
            notEmpty: true,
            matches: {
                options: /^[0-9][0-9]{1,2}$/
            },
            errorMessage: 'Invalid height' // Error message for the parameter
        },
        'weight': {
            notEmpty: true,
            matches: {
                options: /^[0-9][0-9]{1,2}$/
            },
            errorMessage: 'Invalid weight' // Error message for the parameter
        },
        'caste': {
            notEmpty: true,
            matches: {
                options: /^[A-z]+$/
            },
            errorMessage: 'Invalid occupation' // Error message for the parameter
        },
        'occupation': {
            notEmpty: true,
            matches: {
                options: /^[A-z]+$/
            },
            errorMessage: 'Invalid occupation' // Error message for the parameter
        },
        'citizenship': {
            notEmpty: true,
            matches: {
                options: /^[A-z]+$/
            },
            errorMessage: 'Invalid citizenship' // Error message for the parameter
        },
        'education': {
            notEmpty: true,
            matches: {
                options: /^[A-z]+$/
            },
            errorMessage: 'Invalid education' // Error message for the parameter
        }
    });
};
var paginate = function(req) {
    return require('./paginate').paginate(req);
}

exports.addUser = function(req, res) {
    check_validations(req);

    var errors = req.validationErrors();
    if (errors) {
        var validation_errors = [];
        for (var i = 0; i <= errors.length - 1; i++) {
            validation_errors.push(errors[i].msg);

        }
        res.send({
            status: "error",
            message: validation_errors
        });
        return;
    } else if (req.body.center_code) {}
}
