from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
	path('tasks', views.TaskListAPIView, name= 'TaskList'),
	path('tasks/<slug>', views.TaskSingleAPIView, name = 'TaskSingle'),
	path('send_flag', views.SendFlagAPIView, name = 'SendFlag'),
	path('register', views.UserRegisterAPIView, name = 'UserRegister'),
	path('login', obtain_auth_token, name = 'UserLogin'),
	path('logout', views.UserLogoutAPIView, name = 'UserLogout'),
	path('scoreboard', views.GetScoreBoardAPIView, name = 'GetScoreBoard')
]