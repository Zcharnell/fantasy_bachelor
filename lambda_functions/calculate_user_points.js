var aws = require('aws-sdk');

var dynamodbDoc = new aws.DynamoDB.DocumentClient({region: 'us-west-2'});
var sns = new aws.SNS();

var contestantsParams = {
  TableName: "Contestants",
  // FilterExpression: "wentHome = :went_home or wentHomeWeek > :week",
  // ExpressionAttributeValues : {':week' : 3, ':went_home': false}
};

var userParams = {
  TableName: "Users",
  FilterExpression: "league = :league_name",
  ExpressionAttributeValues : {':league_name' : 'Olivia'}
};

var getSnsParams = function(message) {
  var json = JSON.stringify({
    users: message
  });
  
  return {
    MessageStructure: 'json',
    Message: {
      default: json,
      email: 'Hello this is the email notification',
    },
    TopicArn: 'arn:aws:sns:us-west-2:057343057172:UpdateUserPoints'
  }
}

var sendPointsToSns = function(users, callback) {
  var usersWithPoints = users.map(user => (
    {
      email: user.email,
      name: user.name,
      points: user.points
    }
  ));

  sns.publish(getSnsParams(usersWithPoints), function(err, data) {
    if (err) {
    callback(err, 'Failed to publish to SNS Topic');
    // console.log(err, err.stack); // an error occurred
    } else {
    //  console.log(data);           // successful response
      callback(null, "Success");
    }
  });
}

var writeUserPointsToDynamo = function(users, callback) {
  users.forEach((user) => {
    var params = {
        TableName: "Users",
        Item: user
    };

    dynamodbDoc.put(params, function(err, data) {
       if (err) {
           console.error("Unable to update user", user.name, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("Put User succeeded:", user.name);
       }
    });
  });

  sendPointsToSns(users, callback);
}

var calculateUserPoints = function(contestants, users, callback) {
  let week = 3;
  const weeks = 6;
    users.forEach(user => {
      const points = {};
      for (let i=week; i<= weeks; i++) {
        const contestantsForWeek = contestants.filter(contestant => !contestant.wentHome || contestant.wentHomeWeek > i);
        points[`week${i}`] = 0 + (points[`week${i-1}`] ? points[`week${i-1}`] : 0);
        contestantsForWeek.forEach(contestant => {
          if (user.contestants[`week${i}`].indexOf(contestant.id) > -1) {
            points[`week${i}`] += 2;
          }
        })
      }
      user.points = points;
    })
    writeUserPointsToDynamo(users, callback);
    // callback(null, users.map(user => ({ name: user.name, points: user.week3Points })))
}

var requestUserData = function(contestants, callback) {
  var userData = dynamodbDoc.scan(userParams, function(err, userData) {
    if (err) {
     callback(err);
    //  console.log(err, err.stack); // an error occurred
    } else {
      calculateUserPoints(contestants, userData.Items, callback);
    }
  });
}

exports.handler = (event, context, callback) => {
  /* event
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
   var contestantData = dynamodbDoc.scan(contestantsParams, function(err, data) {
       if (err) {
         callback(err);
        //  console.log(err, err.stack); // an error occurred
        } else {
        //   console.log(data);
        //   callback(null, data.Items.map(item => item.id));
          requestUserData(data.Items, callback);
        }
   });
};