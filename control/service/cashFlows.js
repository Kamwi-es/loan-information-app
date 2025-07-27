/* mortgageData action */
const loanDao = require('../../model/dao/loanDao')
const util = require('./util');
const amortisejs = require('amortizejs').Calculator; /* https://www.npmjs.com/package/amortizejs */

/* mortgage cashflows */
async function mortgageCashFlows(req, res)
{
    cashFlows(req, res, 'mortgage')
}

/* auto loan cash flows */
async function autoCashFlows(req, res)
{
    cashFlows(req, res, 'auto')
}

/* student loan cashflows */
async function studentCashFlows(req, res)
{
    cashFlows(req, res, 'student')
}

/* personal loan cashflows */
async function personalCashFlows(req, res)
{
    cashFlows(req, res, 'personal')
}

/* payday cashflows */
async function paydayCashFlows(req, res)
{
    cashFlows(req, res, 'payday')
}

async function cashFlows(req, res, loanType) 
{
    /* collect loan data from database */
    var username = req.session.username;
    const loan = await getLoan(res, username, loanType);
    
    /* collect amortisation data */
    var amortisationData = amortise(res, loan);

    /* display loan data */
    var parameters = getParameters(loan, amortisationData)
    res.render('cashFlows', parameters);
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
function getParameters(loan, amortisationData)
{
    var cashflows = [];
    for (var i = 0; i < amortisationData.schedule.length; i++)
    {
        var period = amortisationData.schedule[i]
        var cashflow = {
            'periodStartDate': util.dateString(period.date),
            'interest': period.interest.toFixed(2),
            'principal': period.principal.toFixed(2),
            'payment': amortisationData.periodicPayment.toFixed(2),
            'balance': period.remainingBalance.toFixed(2)
        };
        cashflows.push(cashflow);
    };
    var parameters = {
        'loanType': loan.loanType,
        'description': loan.description,
        'amount': loan.amount,
        'start': util.dateString(loan.start),
        'term': loan.term,
        'rate': loan.rate,
        'cashflows': cashflows
    };
    return parameters;
}

/* collect amortisation data */
/* example results from amortizejs.calculate:
  
  balance: '100000.00',
  periodicInterest: 0.002916666666666667,
  periods: 300,
  startDate: 2025-06-14T23:00:00.000Z,
  periodicPayment: 500.62357025949166,
  endDate: 2050-06-14T23:00:00.000Z,
  schedule: array of
    {
      interest: 291.6666666666667,
      principal: 208.95690359282497,
      remainingBalance: 99791.04309640717,
      date: 2025-06-14T23:00:00.000Z
    },
  totalPayment: 150187.0710778475,
  totalInterest: 50187.071077847504
*/
function amortise(res, loan)
{
    var loanData = {
        method:     loan.loanType,
        apr:        loan.rate,
        balance:    loan.amount,    
        loanTerm:   loan.term*12, 
        startDate:  loan.start
    };
    
    try
    {
        return amortisejs.calculate(loanData);
    }    
    catch(err)
    {
        util.displayError(err, res);
        return;
    }
}

module.exports = {mortgageCashFlows, autoCashFlows, studentCashFlows, personalCashFlows, paydayCashFlows};