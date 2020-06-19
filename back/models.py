from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save

def get_file_path(instance, filename):
	return('{0}/{1}_{2}'.format(instance.task.task_type,instance.task.title,filename))

class Task(models.Model):
	title = models.CharField(max_length = 50, unique = True)
	text = models.TextField(null = False, blank = False)
	flag = models.CharField(max_length = 70, unique = True, null = False, blank = False)
	active = models.BooleanField()
	cost = models.DecimalField(decimal_places = 0, max_digits = 4, null = True, blank = True)
	task_type = models.CharField(max_length = 50, choices = settings.TASKS, blank = False, null = False)
	slug = models.SlugField(allow_unicode = True, unique = True, null = True, blank = True)

	def __str__(self):
		return(f'{self.title}')

class Answer(models.Model):
	task = models.ForeignKey(Task, on_delete = models.CASCADE, null = True, blank = True)
	user = models.ForeignKey(User, on_delete = models.CASCADE, null = False, blank = False)
	user_flag = models.CharField(max_length = 70, null = False, blank = False)
	right = models.BooleanField()
	datetime = models.DateTimeField(auto_now_add = True)

	def __str__(self):
		return(f'{self.user.username} - {self.user_flag} - {self.datetime.strftime("%d.%m.%y %H:%M:%S")}')

class Results(models.Model):
	user = models.ForeignKey(User, on_delete = models.CASCADE, null = False, blank = False)
	points = models.DecimalField(decimal_places = 0, max_digits = 4, null = False, blank = False)

	def __str__(self):
		return(f'{self.user.username} - {self.points}')

class File(models.Model):
	task = models.ForeignKey(Task,on_delete = models.CASCADE, related_name = 'files', null = False, blank = False)
	file = models.FileField(upload_to = get_file_path, null = False, blank = False)

	def __str__(self):
		return(f'{self.file.name}')

@receiver(pre_save, sender = Task)
def add_slug(sender, instance, **kwargs):
	if(not instance.slug):
		instance.slug = instance.title.replace(' ','-')

@receiver(post_save, sender = User)
def set_points(sender,instance,created,**kwargs):
	if(created):
		Results.objects.create(points = 0, user = instance)


