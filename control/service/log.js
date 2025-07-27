/* log action */
function log(req,res) 
{
    const fs = require('fs');
    fs.readFile('./log/loanapp.log', function (err, data) 
    {
        var dataString = data + ''  ;
        var outputString = dataString.replace(new RegExp("\n", "g"),'<br>');
        if (err) throw err;   
        var parameters = {'data': outputString}
        res.render('log',parameters);
    });
}
module.exports = {log};