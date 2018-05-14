from __future__ import print_function
import boto3

# Local
# dynamodb = boto3.resource('dynamodb', region_name='us-west-2', endpoint_url="http://localhost:8000")
# Online
dynamodb = boto3.resource('dynamodb', region_name='us-west-2')

table1 = dynamodb.create_table(
  TableName='Contestants',
  KeySchema=[
    {
      'AttributeName': 'id',
      'KeyType': 'HASH'
    },
    {
      'AttributeName': 'season',
      'KeyType': 'RANGE'
    }
  ],
  AttributeDefinitions=[
    {
      'AttributeName': 'id',
      'AttributeType': 'N'
    },
    {
      'AttributeName': 'season',
      'AttributeType': 'N'
    }
  ],
  ProvisionedThroughput={
    'ReadCapacityUnits': 10,
    'WriteCapacityUnits': 10
  }
)

print("Table status:", table1.table_status)

table2 = dynamodb.create_table(
  TableName='Users',
  KeySchema=[
    {
      'AttributeName': 'email',
      'KeyType': 'HASH'
    }
  ],
  AttributeDefinitions=[
    {
      'AttributeName': 'email',
      'AttributeType': 'S'
    }
  ],
  ProvisionedThroughput={
    'ReadCapacityUnits': 10,
    'WriteCapacityUnits': 10
  }
)

print("Table status:", table2.table_status)