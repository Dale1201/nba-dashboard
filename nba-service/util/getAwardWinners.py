import time
import json
import requests
from bs4 import BeautifulSoup
import nba_api.stats.static.players as players

# first bath 1983 - 2023

# Saving and opening html files
def save_html(html, path):
    with open(path, 'wb') as f:
        f.write(html)

def open_html(path):
    with open(path, 'rb') as f:
        return f.read()

# Fetching data from the web

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

# save_html(r.content, 'espn_awards')

# content = open_html('espn_awards')

# soup = BeautifulSoup(content, 'html.parser')

awards_name_translation = {
    "MVP": "MVP",
    "Defensive Player of the Year": "DPOY",
    "Rookie of the Year": "ROY",
    "Sixth Man of the Year": "6MOY",
    "Most Improved Player": "MIP",
    "Coach of the Year": "COY",
    "Finals MVP": "FMVP",
    "Finals MVP*": "FMVP",
    "All-Star MVP": "ASG MVP",
}

years = ["2022-23", "2021-22", "2020-21", "2019-20", "2018-19", "2017-18", "2016-17", "2015-16", "2014-15", "2013-14",
         '2012-13', "2011-12", "2010-11", "2009-10", "2008-09", "2007-08", "2006-07", "2005-06", "2004-05", "2003-04",
         '2002-03', "2001-02", "2000-01", "1999-00", "1998-99", "1997-98", "1996-97", "1995-96", "1994-95", "1993-94",
         '1992-93', "1991-92", "1990-91", "1989-90", "1988-89", "1987-88", "1986-87", "1985-86", "1984-85", "1983-84",
         '1982-83', "1981-82", "1980-81", "1979-80", "1978-79", "1977-78", "1976-77", "1975-76", "1974-75", "1973-74",
         '1972-73', "1971-72", "1970-71", "1969-70", "1968-69", "1967-68", "1966-67", "1965-66", "1964-65", "1963-64",
         '1962-63', "1961-62", "1960-61", "1959-60", "1958-59", "1957-58", "1956-57", "1955-56"]

season_award_winners = []

all_players = players.get_players()
def getPlayerId(name):
    for player in all_players:
        if name in player['full_name']:
            return player['id']

for year in years:
    translated_year = year.split("-")[0][:2] + year.split("-")[1]
    if year == "1999-00":
        translated_year = "2000"
    url = f'https://www.espn.com/nba/history/awards/_/year/{translated_year}'
    r = requests.get(url, headers=headers)
    soup = BeautifulSoup(r.content, 'html.parser')
    season_awards = {"year": year, "awards": {}}

    for row in soup.find_all('tr'):
        cells = row.find_all('td')
        if len(cells) > 1:
            award_name = cells[0].text
            award_winner = cells[1].text.split(",")[0]
            award_winner_id = getPlayerId(award_winner)

            if award_name in awards_name_translation:
                season_awards["awards"][awards_name_translation[award_name]] = {"player": award_winner, "player_id": award_winner_id}

    season_award_winners.append(season_awards)
    print(season_awards)
    time.sleep(5)

with open('../staticfiles/award_winners.json', 'w') as f:
    json.dump(season_award_winners, f)



