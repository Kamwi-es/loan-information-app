/* main routing function */
async function main(app) 
{
    const express = require('express');

    /* initialisation tasks */
    const init = require('../service/init');    
    app.use('/loanapp',init.init);
    
    /* then individual routes */
    /* set root of url */
    const adminRouter = express.Router();
    app.use('/loanapp',adminRouter);

    /* / */
    const home = require('../service/home');
    adminRouter.get('/', home.home);
    adminRouter.get('/home', home.home);

    /* /loginAction */
    const login = require('../service/login');
    adminRouter.post('/loginAction', login.loginAction);
    
    /* /error */
    const error = require('../service/error');
    adminRouter.get('/error', error.error);

    /* loan information */
    const loanInformation = require('../service/loanInformation');
    adminRouter.get('/whatisaloan', loanInformation.whatisaloan);
    adminRouter.get('/personalLoans', loanInformation.personalLoans);
    adminRouter.get('/studentLoans', loanInformation.studentLoans);
    adminRouter.get('/mortgageLoans', loanInformation.mortgageLoans);
    adminRouter.get('/autoLoans', loanInformation.autoLoans);
    adminRouter.get('/paydayLoans', loanInformation.paydayLoans);
    adminRouter.get('/keyLoanTerms', loanInformation.keyLoanTerms);
    adminRouter.get('/howInterestWorks', loanInformation.howInterestWorks);
    adminRouter.get('/repaymentplans', loanInformation.repaymentplans);
    adminRouter.get('/totalCostOfaLoan', loanInformation.totalCostOfaLoan);
    adminRouter.get('/loanEligibilityAndCreditScore', loanInformation.loanEligibilityAndCreditScore);
    adminRouter.get('/riskAndWarnings', loanInformation.riskAndWarnings);
    adminRouter.get('/questionsToAskBeforeBorrowing', loanInformation.questionsToAskBeforeBorrowing);


    /* loan data */
    const loanData = require('../service/loanData');
    adminRouter.get('/loanData/mortgage', loanData.mortgageData);
    adminRouter.get('/loanData/auto', loanData.autoData);
    adminRouter.get('/loanData/student', loanData.studentData);
    adminRouter.get('/loanData/personal', loanData.personalData);
    adminRouter.get('/loanData/payday', loanData.paydayData);
    
    /* /loanEdit */
    const loanEdit = require('../service/loanEdit');
    adminRouter.get('/loanEdit/mortgage', loanEdit.editMortgage);
    adminRouter.get('/loanEdit/auto', loanEdit.editAuto);
    adminRouter.get('/loanEdit/student', loanEdit.editStudent);
    adminRouter.get('/loanEdit/personal', loanEdit.editPersonal);
    adminRouter.get('/loanEdit/payday', loanEdit.editPayday);

    adminRouter.post('/loanEditAction', loanEdit.editAction);

    /* /cashFlows */
    const cashFlows = require('../service/cashFlows');
    adminRouter.get('/cashFlows/mortgage', cashFlows.mortgageCashFlows);
    adminRouter.get('/cashFlows/auto', cashFlows.autoCashFlows);
    adminRouter.get('/cashFlows/student', cashFlows.studentCashFlows);
    adminRouter.get('/cashFlows/personal', cashFlows.personalCashFlows);
    adminRouter.get('/cashFlows/payday', cashFlows.paydayCashFlows);

   
    /* /about */
    const about = require('../service/about');
    adminRouter.get('/about', about.about);
};
module.exports = {main};