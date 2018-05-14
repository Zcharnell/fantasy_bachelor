var aws = require('aws-sdk');
var crypto = require('crypto');

var sha512 = function(password, salt){
  var hash = crypto.createHmac('sha512', salt.toString()); /** Hashing algorithm sha512 */
  hash.update(password);
  var value = hash.digest('hex');
  return {
      salt:salt,
      hash:value
  };
};

function comparePasswordToHash(userpassword, salt, hash) {
  var passwordData = sha512(userpassword, salt);
  return passwordData.hash === hash;
}

exports.handler = (event, context, callback) => {
  var dynamodb = new aws.DynamoDB.DocumentClient({region: 'us-west-2'});

  var params = {
    Key: {
     email: event.email
    },
    TableName: "Users"
   };
   var userData = dynamodb.get(params, function(err, data) {
    if (err) {
     callback(err);
     console.log(err, err.stack); // an error occurred
    } else {
      console.log(data);
      var isPasswordCorrect = comparePasswordToHash(event.password, data.Item.salt, data.Item.hash);
      if (isPasswordCorrect) {
          callback(null, 200);
      } else {
          callback(401);   
      }
    }
  });
};