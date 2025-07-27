/* process login request */
//const UserDao = require('../../model/dao/userDao')
const userDao = require('../../model/dao/userDao')
const util = require('./util');

/* display login form initially */
async function login(req, res)
{
    loginForm("","","",res);
}

/* display login form with optional message */
async function loginForm(username, password, message, res)
{
    var parameters = {'username': username, 'password': password, 'errormessage': message};
    res.render('login',parameters);
}

/* login action */
async function loginAction(req,res) 
{
    var submit = req.body.submit;    
    switch (submit)
    {
        case 'Ok':
            await loginRequest(req, res);
            break;
        case 'Register':
            await register(req, res);
            break;
    }
}
    
/* process login request */    
async function loginRequest(req, res)
{
    /* validate parameters */
    var username = req.body.username;
    var password = req.body.password;
    if (!validate(username, password, res)) return;

    /* check user exists in database */
    try
    {
//        userDao = new UserDao();
        var user = await userDao.select(username);
        if (user==undefined)
        {    
            var message = 'Username not recognised';
            loginForm(username, password, message, res);
            return;
        }
        else
        {    
            encryptedpassword = user.password;
        }    
    }
    catch(err)
    {    
        util.displayError(err, res);
        return;
    }  

    /* check password */
    const bcrypt = require("bcryptjs");
    var ok = await bcrypt.compare(password, encryptedpassword);
    if (!ok)
    {
        var message = 'Password not recognised';
        loginForm(username, password, message, res);
        return;
    }
    else
    /* username and password OK so add user to session and display home form */
    {
        req.session.username = username;
        res.render('home');
        return;
    };
}

/* register request */
async function register(req, res)
{
    var username = req.body.username;
    var password = req.body.password;
    
    /* validate parameters */
    if (!validate(username, password, res)) return;

    /* create new user: */
    /* encrypt password */
    const bcrypt = require("bcryptjs");
    var encryptedpassword = await bcrypt.hash(password, 10);

    /* save user to database */
    try
    {
//        userDao = new UserDao();
        var user = await userDao.getUserObject(username, encryptedpassword);
        var results = await userDao.insert(user);
        if (!results.ok)
        {
            loginForm(username, password, results.errormessage, res);
            return;
        }    
    }
    catch(err)
    {    
        util.displayError(err, res)
    }    

    /* add user to session and display home form */
    req.session.username = username;
    res.render('home');
}

/* validate input parameters */
function validate (username, password, res)
{
    if (username == 0 | password == 0)
    {
        var message = 'Please enter user name and password';
        loginForm(username, password, message, res);
        return false;
    }
    else
    {
        return true;
    }    
}
module.exports = {login, loginAction};