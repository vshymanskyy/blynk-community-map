# blynk-community-map

[![Preview](/preview.png)](https://vshymanskyy.github.io/blynk-community-map/)

https://vshymanskyy.github.io/blynk-community-map/

## building index

```bash
pip3 install -U --user geolite2
pip3 install -U --user maxminddb-geolite2
python3 map_update.py ./data/user-list.csv.gz
```
