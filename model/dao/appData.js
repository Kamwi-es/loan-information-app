/* 
 * project properties
 */
class AppData
{
   constructor()
    {
        this.appname = 'loanapp';
        this.author='Kamwinula Shilogile';
        this.version = '100';
        this.date = '08-07-2025';
        this.port = 8088;
        this.sessionName = 'loanapp';
        this.sessionSecret = 'sirikabisa';    
        this.dbhost = 'localhost';
        this.dbuser = 'dba';
        this.dbpassword = 'password';
        this.dbdatabase = 'loanapp';
        this.logFile = 'loanapp.log';
        this.pool;
    }

    /* setters */
    
    setPool(pool){this.pool=pool;}
    
    /* getters */
    
    getAppname(){return this.appname;}
    getAuthor(){return this.author;}
    getVersion(){return this.version;}
    getDate(){return this.date;}
    getPort(){return this.port;}
    getSessionName(){return this.sessionName;}
    getSessionSecret(){return this.sessionSecret;}
    getDbhost(){return this.dbhost;}
    getDbuser(){return this.dbuser;}    
    getDbpassword(){return this.dbpassword;}
    getDbdatabase(){return this.dbdatabase;}
    getLogFile(){return this.logFile;}
    getPool(){return this.pool;}
}

module.exports = AppData;