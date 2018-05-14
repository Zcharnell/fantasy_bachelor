var aws = require('aws-sdk');

var docClient = new aws.DynamoDB.DocumentClient({region: 'us-west-2'});

exports.handler = (event, context, callback) => {
  /* Example event:
    {
      "email": "zcharnell@gmail.com",
      "leagues": {
        "brianford": {
          girls: {
            week2: [],
            week3: [],
            week4: [],
            week5: [],
            week6: [],
          }
        }
      }
    }
  */
  var user = event.user;
  
  var params = {
    Key: {
     email: user.email
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
        postNewUser(user, callback);
      }
    }
  });
};