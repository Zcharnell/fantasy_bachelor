# Fantasy Bachelor Bracket Creator

This is a project I put together in a couple of days back in January for the most recent season of Bachelor. By no means is it a great representation of React best practices or the use of Lambda, though it provides a good look at a rapid prototype.

Uses React for the front end and Lambda + DynamoDB for the back end.

## Directories

### website
Contains the code for the website, including ESLint profile and script for deploying to S3.

### lambda_functions
The code used in AWS Lambda functions. Post functions, for users and contestants, are triggered by an API call from the React site. Functions for calculating points are manually executed in Lambda to grab weekly data.

### dynamodb
Extremely basic scripts for creating tables and loading data to DynamoDB. Check the Lambda functions for more detailed use of DynamoDB.