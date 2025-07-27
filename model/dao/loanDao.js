/* loan dao class */

/* return a loan object: data formatted as in database */
function getLoanObject(username, loanType, description, amount, start, term, rate)
{
    var loan = 
    {
        'username': username,         /* string */
        'loanType': loanType,         /* string */
        'description': description,   /* datetime */
        'amount': amount,             /* integer */
        'start': start,               /* datetime */
        'term': term,                 /* decimal */
        'rate': rate                  /* decimal */
    };
    return loan;
}

/* return a loan object with empty fields */
function getDefaultLoanObject(username, loanType)
{
    var loan = 
    {
        'username': username,
        'loanType': loanType,
        'description': '',
        'amount': 0.00,
        'start': new Date(),
        'term': 0.00,
        'rate': 0
    };
    return loan;
};

/* insert a loan */
/* parameter is a loan object */
/* returns an object of {ok, errormessage} */
async function insert(loan)
{
    var pool = appData.getPool();
    var sql = "insert into loan values (?,?,?,?,?,?,?)";
    var values = 
        [   loan.username, 
            loan.loanType, 
            loan.description, 
            loan.amount, 
            loan.start, 
            loan.term, 
            loan.rate
        ];
    try
    {
        const [rows, fields, err] = await pool.promise().execute(sql, values);
        return {'ok': true, 'errormessage': ''};           
    }
    catch(err)
    {    
        if(err.errno==1062)
        {   
            return {'ok': false, 'errormessage': 'Loan already exists'};
        }
        else
        {
            throw err;
        }
    }  
};

/* update a loan */
/* parameter is a loan object */
async function update(loan)
{
    var pool = appData.getPool();
    var sql = "update loan set description = ?, amount = ?, start = ?, term = ?, "
            + "rate = ? where username = ? and loanType = ?";
    var values = 
        [   
            loan.description, 
            loan.amount, 
            loan.start, 
            loan.term, 
            loan.rate,
            loan.username, 
            loan.loanType
        ];
    try
    {
        const [rows, fields, err] = await pool.promise().execute(sql, values);
        return {'ok': true, 'errormessage': ''};           
    }
    catch(err)
    {    
        throw err;
    }  
};


/* select a loan */
/* parameters are username and loan strings */
/* returns a loan object */
async function select(username, loanType)
{   
    var pool = appData.getPool();
    var sql = "select * from loan where username = ? and loanType = ?";
    var values = [username, loanType];
    const [rows, fields, err] = await pool.promise().execute(sql, values);
    if (rows.length == 1)
    {
        return rows[0];
    }    
    else
    {    
        throw new Error('Loan cannot be selected');
    }    
};

/* select a loan - create one if it does not exist*/
/* parameters are username and loan strings */
/* returns a loan object */
async function getLoan(username, loanType)
{   
    var pool = appData.getPool();
    var sql = "select * from loan where username = ? and loanType = ?";
    var values = [username, loanType];
    const [rows, fields, err] = await pool.promise().execute(sql, values);
    if (rows.length == 1)
    {
        return rows[0];
    }    
    else
    {    
        var loan = getDefaultLoanObject(username, loanType);
        insert(loan);
        return loan;
    }    
};

module.exports = { getLoanObject,  getDefaultLoanObject, insert, update, select, getLoan};