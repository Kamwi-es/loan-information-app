/* loan information */
function whatisaloan(req,res) 
{
    res.render('whatisaloan');
};
function personalLoans(req,res) 
{
    res.render('personalLoans');
};
function studentLoans(req,res) 
{
    res.render('studentLoans');
};
function mortgageLoans(req,res) 
{
    res.render('mortgageLoanInformation');
};
function autoLoans(req,res) 
{
    res.render('autoLoans');
};
function paydayLoans(req,res) 
{
    res.render('paydayLoans');
};
function keyLoanTerms(req,res) 
{
    res.render('keyLoanTerms');
};
function howInterestWorks(req,res) 
{
    res.render('howInterestWorks');
};
function repaymentplans(req,res) 
{
    res.render('repaymentplans');
};
function totalCostOfaLoan(req,res) 
{
    res.render('totalCostOfaLoan');
};
function loanEligibilityAndCreditScore(req,res) 
{
    res.render('loanEligibilityAndCreditScore');
};
function riskAndWarnings(req,res) 
{
    res.render('riskAndWarnings');
};
function questionsToAskBeforeBorrowing(req,res) 
{
    res.render('questionsToAskBeforeBorrowing');
};

module.exports = 
{
    whatisaloan, personalLoans, studentLoans, mortgageLoans, autoLoans, paydayLoans, keyLoanTerms, howInterestWorks,
    repaymentplans, totalCostOfaLoan, loanEligibilityAndCreditScore, riskAndWarnings, questionsToAskBeforeBorrowing
};

