var aws = require('aws-sdk');

var dynamodbDoc = new aws.DynamoDB.DocumentClient({region: 'us-west-2'});

var postNewContestant = function(contestant, callback) {

  // Post to DynamoDB
  var params = {
    Item: contestant,
    TableName: "Contestants"
   };
   dynamodbDoc.put(params, function(err, data) {
     if (err) {
      callback(err, 'Failed to put Contestant');
      console.log(err, err.stack); // an error occurred
     } else {
       console.log(data);           // successful response
       callback(null, data);
     }
   });
}

exports.handler = (event, context, callback) => {
  /* Example event:
    {
      contestant: {
        "id": 1000,
        "season": 21,
        "name": "Corinne",
        "fullName": "Corinne Olympios",
        "age": 24,
        "wentHome": false,
        "points": {
        }
      }
    }
  */
  var contestant = event.contestant;
  
  var params = {
    Key: {
     id: contestant.id,
     season: contestant.season
    },
    TableName: "Contestants"
   };
   var userData = dynamodbDoc.get(params, function(err, data) {
    if (err) {
     callback(err);
     console.log(err, err.stack); // an error occurred
    } else {
      if (data.Item) {
        callback(null, "contestant already exists");
      } else {
        postNewContestant(contestant, callback);
      }
    }
  });
};