var Connection = require('tedious').Connection;
var config = {
    server: 'nitinserver.database.windows.net:1433',
    authentication: {
        type: 'default',
        options: {
            userName: 'njain51', //update me
            password: '***'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'nitindb'  //update me
    }
};
var connection = new Connection(config);
connection.on('connect', function(err) {
    // If no error, then good to proceed.
    console.log("Connected");
});

connection.connect();

var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

function executeStatement() {
    var request = new Request("select top 1000 brand_id,brand_name from production.brands", function(err) {
        if (err) {
            console.log(err);}
    });
    var result = "";
    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result+= column.value + " ";
            }
        });
        console.log(result);
        result ="";
    });

    request.on('done', function(rowCount, more) {
        console.log(rowCount + ' rows returned');
    });

    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
        connection.close();
    });
    connection.execSql(request);
}