/* init action */
/* preliminary processing of all requests */
async function init(req,res,next) 
{
    logger.info(req.originalUrl);
    const login = require('../service/login');
    
    /* if this is a request for the exit form then remove the username from the session 
       to force the login form to be shown */
    if (req.originalUrl == '/loanapp/exit')
    {
        if (req.session.username) delete req.session.username;
    }

    /* if this is a request for the error form then process the request */
    else if (req.originalUrl == '/loanapp/error')
    {
        next();
    }

    /* check for username on session i.e. is user already logged in? */
    if (req.session.username)
    {    
        next();
    }
 
    /* if this is a request from the login form then process the request */
    else if (req.originalUrl == '/loanapp/loginAction')
    {
        next();
    }
    
    /* otherwise load the login form */
    else
    {    
        login.login(req, res);
    }    
};
module.exports = {init};
