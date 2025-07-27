/* loanData actions */
const loanDao = require('../../model/dao/loanDao')
const util = require('./util');

async function mortgageData(req, res) 
{
    loanData(req, res, 'mortgage')
};

async function autoData(req, res) 
{
    loanData(req, res, 'auto')
};
async function studentData(req, res) 
{
    loanData(req, res, 'student')
};
async function personalData(req, res) 
{
    loanData(req, res, 'personal')
};
async function paydayData(req, res) 
{
    loanData(req, res, 'payday')
};

async function loanData(req, res, loanType) 
{
    /* collect loan data from database */
    var username = req.session.username;
    const loan = await getLoan(res, username, loanType);
    
    /* display loan data */
    var title = loanType.charAt(0).toUpperCase() + loanType.slice(1) + ' loan';
    var parameters = getParameters(loan, title)
    res.render('loanData', parameters);
};

/* collect loan data from database for a given loan  */
async function getLoan(res, username, loanType)
{
    try
    {   
        var loan = await loanDao.getLoan(username, loanType);
        return loan;
    }
    catch(err)
    {
        util.displayError(err, res);
        return;
    }
}    

/* collect parameters for a given loan */
function getParameters(loan, title)
{
    return {
        'loanType': loan.loanType,
        'description': loan.description,
        'amount': loan.amount,
        'start': util.dateString(loan.start),
        'term': loan.term,
        'rate': loan.rate,
        'title': title
    };
}
module.exports = {mortgageData, autoData, personalData, studentData, paydayData, loanData};