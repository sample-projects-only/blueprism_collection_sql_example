var Connection = require('tedious').Connection;
var config = {
    server: 'nitinserver.database.windows.net:1433',
    database: 'nitindb' ,//update me
    authentication: {
        type: 'default',
        options: {
            userName: 'njain51', //update me
            password: '*****'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'your_database'  //update me
    }
};
var connection = new Connection(config);
connection.on('connect', function(err) {
    // If no error, then good to proceed.
    console.log("Connected");
});

connection.connect();