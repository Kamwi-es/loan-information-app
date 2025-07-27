/* app.js - application entry point */

/* configure app */
const express = require('express');
const app = express();

/* create appData object and save as global variable */
const AppData = require('./model/dao/appData');
global.appData = new AppData();

/* create logger and save as global variable */
global.logger = configureLogger();

/* login to database and save pool to appData so as to be available globally */
appData.setPool(login());

/* configure app */
configureApp();

/* initialise routing */
const main = require('./control/route/main');
main.main(app);

/* collect the port number that the app will run over */
const port = appData.getPort();

/* start the app */
app.listen(port, function() { logger.info('Test app listening on port ' + port);});

/* configure app */
function configureApp()
{
    const bodyParser = require('body-parser');
    const session = require('express-session');

    /* html will be generated with pug */
    app.set('view engine', 'pug');

    /* location of pug files */
    app.set('views', './view/pug')

    /* output pretty print html */
    app.locals.pretty = true;

    /* base directory for files to be linked into html files including css and img */
    app.use(express.static('./view'));

    /* enable parsing of data coming from forms */
    app.use(bodyParser.urlencoded({ extended: true }));

    /* enable sessions */
    app.use(session({
        name: 'loanapp',
        secret: 'sirikabisa',  
        resave: false,
        saveUninitialized: false,
    //  cookie: { httpOnly: false, secure: false, maxAge: 60 * 1000},
    }));
}

/* configure logger */
function configureLogger()
{
    const log4js = require("log4js");
    log4js.configure(
    {
        appenders: 
        {
            out: 
            { 
                type: "stdout", 
                layout: {type: "basic"} 
            },
            app: 
            { 
                type: "file", 
                filename: "./log/" + appData.getLogFile(),
                layout: {type: "basic"} 
            }
        },
        categories: 
        {
            default: { appenders: ["out", "app"], level: "debug" },
        }
    });
    return log4js.getLogger();
}   

/* login to database */
function login()
/* note that mysql.createPool is not asynchronous, but nevertheless generates asynchronous errors 
   see: https://github.com/mariadb-corporation/mariadb-connector-nodejs/issues/180 */
{
    const mysql = require('mysql2');
    try
    {
        const pool = mysql.createPool({
            host: appData.getDbhost(),
            user: appData.getDbuser(),
            password: appData.getDbpassword(),
            database: appData.getDbdatabase()
        });
        return pool;
    }
    catch(err)
    {
        var stackString = err.stack.toString() + '';
        stackString = stackString.replace(new RegExp("\n", "g"),'<br>');
        var error = {'message':'Cannot login to database:', 'errno':err.errno, 'stack':stackString};
        res.render('error', {'error': error});
        return null;
    }    
}