var aws = require('aws-sdk');
var crypto = require('crypto');

var dynamodb = new aws.DynamoDB({region: 'us-west-2'});
var dynamodbDoc = new aws.DynamoDB.DocumentClient({region: 'us-west-2'});

var genRandomString = function(length){
  return crypto.randomBytes(Math.ceil(length/2))
          .toString('hex') /** convert to hexadecimal format */
          .slice(0,length);   /** return required number of characters */
};

var sha512 = function(password, salt){
  var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  var value = hash.digest('hex');
  return {
      salt:salt,
      hash:value
  };
};

function saltHashPassword(userpassword) {
  var salt = genRandomString(16); /** Gives us salt of length 16 */
  var passwordData = sha512(userpassword, salt);
  return passwordData;
}

var postNewUser = function(user, callback) {
  var passwordObj = saltHashPassword(user.password);

  // Post to DynamoDB
  var params = {
    Item: {
     "email": {
       S: user.email
      }, 
     "name": {
       S: user.name
      },
      "salt": {
        S: passwordObj.salt
      },
      "hash": {
        S: passwordObj.hash
      }
    },
    ReturnConsumedCapacity: "TOTAL", 
    TableName: "Users"
   };
   dynamodb.putItem(params, function(err, data) {
     if (err) {
      callback(err, 'Failed to put User');
      console.log(err, err.stack); // an error occurred
     } else {
       console.log(data);           // successful response
     }
   });

  callback(null, "success");
}

exports.handler = (event, context, callback) => {
  /* Example event:
    {
      "email": "zcharnell@gmail.com",
      "name": "Tom Ford",
      "password": "Password0"
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