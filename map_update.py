#!/usr/bin/env python3
import gzip
import csv
import json
import sys
from geolite2 import geolite2

fn = sys.argv[1]

data = []

with gzip.open(fn, mode='rt', encoding='utf-8') as f:
    table = csv.reader(f, delimiter = ',', quotechar='"')
    headers = next(table)
    system = next(table)
    for row in table:
        login = row[2]
        ip_address = row[17]
        geo = geolite2.reader()
        geo_data = geo.get(ip_address)
        geolite2.close()
        if geo_data and "location" in geo_data:
            lon = geo_data["location"]["longitude"]
            lat = geo_data["location"]["latitude"]
            data.append([lat, lon]) #, login

print("Found {} records".format(len(data)))
with open('map_data.js', 'w') as f:
    f.write("var addressPoints = ");
    json.dump(data, f) #, indent=1
    f.write(";");
