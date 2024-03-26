from django.urls import path
from . import views

urlpatterns = [
    path("stat-leaders/<str:stat_category_abbreviation>", views.getLeagueLeaders),
    path("player-career-stats/<str:player_id>", views.getPlayerCareerStats),
    path("player-info/<str:player_id>", views.getPlayerInfo),
    path("all-players/", views.getAllPlayers),
    path("team-roster/<str:team_id>/<str:season>", views.getTeamRoster),
    path("teams/", views.getAllTeams),
]