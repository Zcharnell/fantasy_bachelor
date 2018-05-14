var aws = require('aws-sdk');
var fs = require('fs');

var docClient = new aws.DynamoDB.DocumentClient({region: 'us-west-2'});

exports.handler = (event, context, callback) => {
    var allContestants = JSON.parse(fs.readFileSync('contestantsdata.json', 'utf8'));
    allContestants.forEach(function(contestant) {
        var params = {
            TableName: "Contestants",
            Item: contestant
        };
    
        docClient.put(params, function(err, data) {
           if (err) {
               console.error("Unable to add contestant", contestant.name, ". Error JSON:", JSON.stringify(err, null, 2));
           } else {
               console.log("PutItem succeeded:", contestant.name);
           }
        });
    });
};