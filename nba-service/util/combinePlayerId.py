import nba_api.stats.static.players as players
import json
import unicodedata

def strip_accents(text):
    text = unicodedata.normalize('NFD', text)
    text = text.encode('ascii', 'ignore')
    text = text.decode("utf-8")
    return str(text)


players = players.get_players()

with open('players-playoffs.json', 'r', encoding='utf-8') as f:
    playerDict = json.load(f)


for key in list(playerDict):
    value = playerDict.pop(key)
    playerDict[strip_accents(key)] = value

playerNames = list(playerDict.keys())
newPlayerDict = {}

for player in players:
    playerName = player['full_name']

    badNames = []
    if playerName not in playerDict:
        print(playerName)
        badNames.append(playerName)
    else:
        newPlayerDict[player['id']] = playerDict[playerName]

with open('playerPlayoffsId.json', 'w') as f:
    json.dump(newPlayerDict, f)

