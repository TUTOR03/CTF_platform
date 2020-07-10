from rest_framework import serializers
from .models import Task, Answer
from django.contrib.auth.models import User

class TaskSerializer(serializers.ModelSerializer):
	solved = serializers.SerializerMethodField()
	class Meta:
		model = Task
		fields = [
			'title',
			'text',
			'active',
			'task_type',
			'slug',
			'cost',
			'solved'
		]
	def get_solved(self, instance):
		print(self.context['user'])
		if(not self.context['user'].is_anonymous):
			ob = Answer.objects.filter(task = instance, right = True, user = self.context['user'])
			if(len(ob)!=0):
				return(True)
		return(False)

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = [
			'username',
			'password'
		]
