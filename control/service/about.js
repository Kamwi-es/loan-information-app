/* about action */
function about(req,res) 
{
    var parameters = 
    {
        appname: appData.getAppname(),
        author: appData.getAuthor(),
        version: appData.getVersion(),
        date: appData.getDate(),        
    }

    /* this is how to preview the generated html in the console before it is sent out ... */
    // res.render('about', parameters, function (err, html) {console.log(html);res.send(html)});
    
    /* normal render : 'about' is the name of the pug file */
    res.render('about', parameters);
};
module.exports = {about};

