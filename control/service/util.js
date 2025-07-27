/* util */

/* display exception in form */
function displayError(err, res, message) 
{
    if (message===undefined) message = err.message
    
    /* convert line endings in stack to <br> so it will disaplay better in html */
    var stackString = err.stack.toString() + '';
    var outputString = stackString.replace(new RegExp("\n", "g"),'<br>');
    
    /* output form */
    var parameters = {'message':message, 'errno':err.errno, 'stack':outputString};
    res.render('error', {'error': parameters});
    return;
};

/* convert date to string */
function dateString(date)
{
    var day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    var month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
    var year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    return `${day}-${month}-${year}`;
};

/* check date string is a valid date in format 99-99-9999 */
function isDate(dateString)
{
    if (dateString.length != 10) return false;
    if (dateString.substring(2,3) != '-') return false;
    if (dateString.substring(5,6) != '-') return false;

    var day = dateString.substring(0,2);
    var month = dateString.substring(3,5);
    var year = dateString.substring(6);    
    var testDateString = year + '-' + month + '-' + year;
    try
    {
        var testDate = Date.parse(testDateString);
        return true;
    }
    catch(err)
    {
        return false;
    }
}

/* convert date string to sql date format */
function toDate(dateString)
{
    var day = dateString.substring(0,2);
    var month = dateString.substring(3,5);
    var year = dateString.substring(6);    
    return year + month + day;
}

/* convert string to float */
function toNumber(numberString)
{
    return parseFloat(numberString);
}

/* convert string to integer */
function toInt(intString)
{
    return parseInt(intString);
}

module.exports = {dateString, displayError, isDate, toDate, toInt, toNumber};