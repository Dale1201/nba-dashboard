import json
from distutils.util import strtobool

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from nba_api.stats.endpoints import LeagueLeaders
from nba_api.stats.endpoints import playercareerstats
from nba_api.stats.endpoints import commonallplayers
from nba_api.stats.endpoints import commonteamroster
from nba_api.stats.endpoints import commonplayerinfo
import nba_api.stats.static.teams as teams
import nba_api.stats.static.players as players
from config import CURRENT_SEASON
from django.contrib.staticfiles.storage import staticfiles_storage

# Create your views here.
# request --> response

def getLeagueLeaders(request, stat_category_abbreviation="PTS"):
    per_mode = request.GET.get('per_mode', "PerGame")
    season = request.GET.get('season', CURRENT_SEASON)
    season_type = request.GET.get('season_type', "Regular Season")

    only_total_stats = ["FG_PCT", "FG3_PCT", "FT_PCT"]
    if stat_category_abbreviation in only_total_stats:
        per_mode = "Totals"

    stat_leaders = LeagueLeaders(season=season, league_id='00', stat_category_abbreviation=stat_category_abbreviation, per_mode48=per_mode, season_type_all_star=season_type)
    df = stat_leaders.get_data_frames()[0]
    return HttpResponse(df.to_json(orient='records'))


def getPlayerCareerStats(request, player_id):
    isPlayoffs = strtobool(request.GET.get('playoffs', 'false'))

    if isPlayoffs:
        players_path = staticfiles_storage.path('players-playoffs.json')
    else:
        players_path = staticfiles_storage.path('players.json')

    with open(players_path, 'r') as f:
        data = json.load(f)

    player_info = data.get(player_id, None)["SeasonAverages"]
    return JsonResponse(player_info, safe=False)


def getPlayerInfo(request, player_id):
    players_path = staticfiles_storage.path('players.json')
    with open(players_path, 'r') as f:
        data = json.load(f)

    player_info = data.get(player_id, None)
    return JsonResponse(player_info, safe=False)
    # player_info = commonplayerinfo.CommonPlayerInfo(player_id=player_id)
    # df = player_info.get_data_frames()[0]
    # return HttpResponse(df.to_json(orient='records'))


def getAllPlayers(request):
    season = request.GET.get('season', None)
    players_path = staticfiles_storage.path('players.json')
    with open(players_path, 'r') as f:
        data = json.load(f)

    players_list = [{"id": id, **value} for id, value in data.items()]
    season_players = []
    if season:
        for player in players_list:
            for season_stats in player['SeasonAverages']:
                if season_stats['Season'] == season:
                    season_players.append(player)
                    break
        return JsonResponse(season_players, safe=False)
    else:
        return JsonResponse(players_list, safe=False)


def getTeamRoster(request, team_id, season):
    team_roster = commonteamroster.CommonTeamRoster(team_id=team_id, season=season)
    return HttpResponse(team_roster.get_json())


def getAllTeams(request):
    all_teams = teams.get_teams()
    return JsonResponse(all_teams, safe=False)

def getAwardWinners(request):
    # award_winners_path = '/staticfiles/award_winners.json'
    award_winners_path = staticfiles_storage.path('award_winners.json')
    season = request.GET.get('season', None)
    with open(award_winners_path, 'r') as f:
        data = json.load(f)

    if season:
        data = [x for x in data if x['year'] == season]
    return JsonResponse(data, safe=False)
