from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from nba_api.stats.endpoints import LeagueLeaders
from nba_api.stats.endpoints import playercareerstats
from nba_api.stats.endpoints import commonallplayers
from nba_api.stats.endpoints import commonteamroster
from nba_api.stats.endpoints import commonplayerinfo
import nba_api.stats.static.teams as teams

# Create your views here.
# request --> response

def getLeagueLeaders(request, stat_category_abbreviation="PTS", per_mode="PerGame"):
    only_total_stats = ["FG_PCT", "FG3_PCT", "FT_PCT"]
    if stat_category_abbreviation in only_total_stats:
        per_mode = "Totals"
    stat_leaders = LeagueLeaders(season='2023-24', league_id='00', stat_category_abbreviation=stat_category_abbreviation, per_mode48=per_mode)
    df = stat_leaders.get_data_frames()[0]
    return HttpResponse(df.to_json(orient='records'))

def getPlayerCareerStats(request, player_id):
    player_stats = playercareerstats.PlayerCareerStats(player_id=player_id)
    df = player_stats.get_data_frames()[0]
    return HttpResponse(df.to_json(orient='records'))

def getPlayerInfo(request, player_id):
    player_info = commonplayerinfo.CommonPlayerInfo(player_id=player_id)
    df = player_info.get_data_frames()[0]
    return HttpResponse(df.to_json(orient='records'))

def getAllPlayers(request, season):
    common_players = commonallplayers.CommonAllPlayers(is_only_current_season=1, league_id='00', season=season)
    # transform to array of objects instead of array of arrays
    df = common_players.get_data_frames()[0]
    return HttpResponse(df.to_json(orient='records'))

def getTeamRoster(request, team_id, season):
    team_roster = commonteamroster.CommonTeamRoster(team_id=team_id, season=season)
    return HttpResponse(team_roster.get_json())

def getAllTeams(request):
    all_teams = teams.get_teams()
    return JsonResponse(all_teams, safe=False)
