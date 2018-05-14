from __future__ import print_function # Python 2/3 compatibility
import boto3
import json
import decimal

dynamodb = boto3.resource('dynamodb', region_name='us-west-2', endpoint_url="http://localhost:8000")

table = dynamodb.Table('Contestants')

with open("contestantsdata.json") as json_file:
    contestants = json.load(json_file, parse_float = decimal.Decimal)
    for contestant in contestants:
        id = contestant['id']
        season = contestant['season']

        print("Adding contestant:", id, season)
        print(contestant)

        table.put_item(
            Item=contestant
        )