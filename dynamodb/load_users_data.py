from __future__ import print_function # Python 2/3 compatibility
import boto3
import json
import decimal

dynamodb = boto3.resource('dynamodb', region_name='us-west-2', endpoint_url="http://localhost:8000")

table = dynamodb.Table('Users')

with open("usersdata.json") as json_file:
    users = json.load(json_file, parse_float = decimal.Decimal)
    for user in users:
        email = user['email']

        print("Adding user:", email)

        table.put_item(
            Item=user
        )