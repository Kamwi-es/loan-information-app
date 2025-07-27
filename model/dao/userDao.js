/* user dao functions */

/* create a user object */
async function getUserObject(username, password)
{
    return {'username': username, 'password': password}
}

/* select a user */
/* parameter is a username string */
/* returns an object of {username, password} which may be null */
async function select(username)
{   
    var pool = appData.getPool();
    var sql = "select username, password from user where username = '" + username + "'";
    var [rows, fields, err] = await pool.promise().query(sql);
    if (rows.length == 1)
    {
//            return {'username': rows[0].username, 'password': rows[0].password};
        return rows[0];
    }    
    else
        return null;
}

/* insert a user */
/* parameter is an object of {username, password} */
/* returns an object of {ok, errormessage} */
async function insert(user)
{
    var pool = appData.getPool();
    var sql = "insert into user values ('" + user.username + "', '" + user.password + "')";
    try
    {
        var [rows, fields, err] = await pool.promise().query(sql);
        return {'ok': true, 'errormessage': ''};           
    }
    catch(err)
    {    
        if(err.errno==1062)
        {    
            return {'ok': false, 'errormessage': 'User already registered'};
        }    
        else 
            throw err;
    }    
}

module.exports = {getUserObject, select, insert};