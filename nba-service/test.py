from nba_api.stats.endpoints import playercareerstats
from nba_api.stats.endpoints import commonallplayers
from nba_api.stats.endpoints import LeagueLeaders
from nba_api.stats.endpoints import commonallplayers
from nba_api.stats.endpoints import commonteamroster
import pandas as pd
import nba_api.stats.static.teams as teams
import nba_api.stats.static.players as players

# Get all players
# all_players = commonallplayers.CommonAllPlayers(is_only_current_season=1, league_id='00', season='2020-21')
# print(all_players.get_dict())

# Get pts leaders
# pts_leaders = LeagueLeaders(season='2023-24', league_id='00', stat_category_abbreviation="AST")
# print(pts_leaders.get_json())
# Nikola Jokić
# jokic = playercareerstats.PlayerCareerStats(player_id='1629630')
# lebron = playercareerstats.PlayerCareerStats(player_id='2544')

# print(jokic.get_json())
# print(lebron.get_dict())

# common_players = commonallplayers.CommonAllPlayers(is_only_current_season=1, league_id='00', season='2023-24')
# df = common_players.get_data_frames()[0]
# print(df.to_dict(orient='records'))

# Get all teams
# all_teams = teams.get_teams()
# print(all_teams)

players = players.get_players()
print(players)

