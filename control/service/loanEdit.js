/* loans */
const loanDao = require('../../model/dao/loanDao');
const loanData = require('./loanData')
const util = require('./util');

/* edit mortgage */
async function editMortgage(req, res)
{
    edit(req, res, 'mortgage');
}

/* edit auto */
async function editAuto(req, res)
{
    edit(req, res, 'auto');
}

/* edit student */
async function editStudent(req, res)
{
    edit(req, res, 'student');
}

/* edit personal */
async function editPersonal(req, res)
{
    edit(req, res, 'personal');
}

/* edit payday */
async function editPayday(req, res)
{
    edit(req, res, 'payday');
}

/* edit loan */
async function edit(req, res, loanType)
{
    /* collect loan from database */
    var loan = await getLoan(res, req.session.username, loanType);

    /* prepare parameters */
    var message = '';
    var parameters = await getParameters(loan, message);
    
    /* display edit form */
    editForm(req, res, parameters);
}

/* collect edit parameters from a loan object */
async function getParameters(loan, message)
{
    /* compile and return parameters */
    return {
        'loanType': loan.loanType,
        'description': loan.description,
        'amount': loan.amount,
        'start': util.dateString(loan.start),
        'term': loan.term,
        'rate': loan.rate,
        'errormessage': message
    };
}

/* collect parameters to edit a loan from request following a validation error */
async function getParametersFromRequest(req, message)
{
    
    /* compile and return parameters */
    return {
        'loanType': req.body.loanType,
        'description': req.body.description,
        'amount': req.body.amount,
        'start': req.body.start,
        'term': req.body.term,
        'rate': req.body.rate,
        'errormessage': message
    };
}

/* collect loan data from database for a given loan  */
async function getLoan(res, username, loanType)
{
    try
    {   
        var loan = await loanDao.select(username, loanType);
        return loan;
    }
    catch(err)
    {
        util.displayError(err, res);
        return;
    }
}    

/* display edit form */
function editForm(req, res, parameters)
{
 //   console.log(parameters);
    res.render('loanEdit', parameters);    
}

/* handle requests from loan edit form */
async function editAction(req, res) 
{    
    var action = req.body.action;

    switch (action)
    {
        case 'Save':
            
            /* validate input date */
            var message = validate(req.body);
//            console.log(message);
            if (message != 'OK')
            {    
                /* if not ok redisplay form with error message */
                var parameters = await getParametersFromRequest(req, message);
//                console.log(parameters);
                editForm(req, res, parameters);
                return;
            }    
            
            /* if OK save results */
            var loan = loanDao.getLoanObject
            (
                req.session.username,
                req.body.loanType,
                req.body.description,
                util.toNumber(req.body.amount),
                util.toDate(req.body.start),
                util.toNumber(req.body.term),
                util.toNumber(req.body.rate)
            );
            await save(req, res, loan);
            break;

        case 'Cancel':
            /* exit edit form and redisplay data form */
             await loanData.loanData(req, res, req.body.loanType);
            break;
    }
}

/* validate input parameters */
function validate (data)
{
    if (data.description.trim() == '' )
        return 'Please enter loan description';
    else if (isNaN(data.amount))
        return 'Please enter amount in format 99999.99';
    else if (!util.isDate(data.start))
        return 'Please enter start date in the format 99-99-9999';
    else if (isNaN(data.term))
        return 'Please enter term as an integer';
    else if (isNaN(data.rate))
        return 'Please enter rate in format 99999.99';
    else
        return 'OK';
}

/* save loan */
async function save(req, res, loan)
{
    try
    {   
        /* save results */
        var results = await loanDao.update(loan);
        if (results.ok)
        {                
            /* if results saved Ok, redisplay data form */
            await loanData.loanData(req, res, loan.loanType);
        }    
        else
        {    
           /* otherwise redisplay edit form with error message */
            var message = results.errormessage;
            var parameters = await getParameters(loan, message);
            edit(req, res, parameters);
        }
        return;
    }    
    catch(err)
    {    
        util.displayError(err, res);
        return;
    }  
}
module.exports = {editMortgage, editAuto, editStudent, editPersonal, editPayday, editAction};