from django.shortcuts import render
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import TaskSerializer, UserSerializer
from .models import Task, Answer, Results
from django.conf import settings
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User


@api_view(['POST'])
@permission_classes([~permissions.IsAuthenticated])
def UserRegisterAPIView(request):
	serializer = UserSerializer(data = request.data)
	if(serializer.is_valid()):
		data = serializer.validated_data
		if(User.objects.filter(username = data['username']).count() != 0):
			return Response({'errors':'User already exists'}, status = status.HTTP_400_BAD_REQUEST)
		user = User.objects.create_user(username = data['username'])
		user.set_password(data['password'])
		user.save()
		token = Token.objects.create(user = user).key
		return Response({'Token':token}, status = status.HTTP_200_OK)
	return Response({'errors':serializer.errors}, status = status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def UserLogoutAPIView(request):
	Token.objects.get(user = request.user).delete()
	return Response(status = status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def TaskListAPIView(request):
	serializer = []
	for t in settings.TASKS:
		data = Task.objects.filter(task_type = t[0])
		serializer.append({
			'task_type':t[0],
			'tasks':TaskSerializer(data, many = True, context = {'user':request.user}).data
		})
	return Response(serializer, status = status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def TaskSingleAPIView(request, slug):
	data = Task.objects.filter(slug = slug)
	if(len(data)!=0):
		serializer = TaskSerializer(data[0], many = False, context = {'user':request.user})
		files = list(map(lambda ob: ob.file.path,data[0].files.all()))
		return Response({'data':serializer.data,'files':files}, status = status.HTTP_200_OK)
	return Response(status = status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def SendFlagAPIView(request):
	task = Task.objects.filter(flag = request.data['flag'], active = True)
	if(len(task)!=0):
		if(len(Answer.objects.filter(user = request.user, task = task[0], right = True)) == 0):
			ob = Answer(user = request.user, task = task[0], user_flag = request.data['flag'], right = True)
			ob.save()
			res = Results.objects.get(user = request.user)
			res.points += task[0].cost
			res.save()
		return Response({'answer':'Flag is correct'},status = status.HTTP_200_OK)
	else:
		ob = Answer(user = request.user, user_flag = request.data['flag'], right = False)
		ob.save()
		return Response({'answer':'Flag is not correct'},status = status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def GetScoreBoardAPIView(request):
	users = User.objects.all()
	data=[]
	for user in users:
		last_answer = Answer.objects.filter(right = True, user = user).order_by('datetime').first()
		data.append({'username':user.username, 'points':Results.objects.get(user = user).points, 'last_flag_time':last_answer.datetime.timestamp() if last_answer else 0, 'last_flag':last_answer.datetime.strftime("%d.%m.%y %H:%M:%S") if last_answer else 'None'})
	data = sorted(data, key = lambda ob:(ob['points'],-ob['last_flag_time']))[::-1]
	return Response({'scoreboard':data}, status = status.HTTP_200_OK)








