from __future__ import print_function # Python 2/3 compatibility
import boto3

# Local
# dynamodb = boto3.resource('dynamodb', region_name='us-west-2', endpoint_url="http://localhost:8000")
# Online
dynamodb = boto3.resource('dynamodb', region_name='us-west-2')

table1 = dynamodb.Table('Contestants')
table2 = dynamodb.Table('Users')

table1.delete()
table2.delete()