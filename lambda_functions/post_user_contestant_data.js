var aws = require('aws-sdk');

var dynamodbDoc = new aws.DynamoDB.DocumentClient({region: 'us-west-2'});

var postNewUserData = function(event, callback) {

  // Post to DynamoDB
  var params = {
    Item: {
      email: event.email,
      name: event.name,
      contestants: event.contestants
    },
    TableName: "Users"
   };
   dynamodbDoc.put(params, function(err, data) {
     if (err) {
      callback(err, 'Failed to put User data');
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
      "email": "zcharnell@gmail.com",
      "name": "Tom Ford",
      "contestants": {
        week3: [],
        week4: [],
        week5: [],
        week6: [],
        week7: [],
        week8: [],
        week9: [],
        week10: []
      }
    }
  */

  var params = {
    Key: {
     email: event.email
    },
    TableName: "Users"
   };
   var userData = dynamodbDoc.get(params, function(err, data) {
    if (err) {
     callback(err);
     console.log(err, err.stack); // an error occurred
    } else {
      if (data.Item) {
        callback(null, "user already exists");
      } else {
        postNewUserData(event, callback);
      }
    }
  });
};