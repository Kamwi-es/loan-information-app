/* error action */
function error (req,res) 
{
    const util = require('./util');
    
    /* display example error */
    var err = new Error("example error");
    err.errno = 99; /* add non-standard property - as mysql errors do */
    util.displayError(err, res);
}
module.exports = {error};
