from django.db import models
import uuid
    
class Journal(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False, primary_key=True)
    name = models.CharField(max_length=200, null=True)
    about = models.CharField(max_length=20000, null=True, blank=True)
    abbrv = models.CharField(max_length=200, null=True, blank = True)
    impact = models.CharField(max_length=200, null=True, blank = True)
    pic = models.ImageField(null=False, blank=False)
    issn = models.CharField(max_length=200, null=True, blank = True)
    date_created = models.DateTimeField(auto_now_add=True, null = True) # This basically takes a snapshot of when the object was added to the database automatically
    aim_scope = models.TextField(null=True, blank=True)
    reviewer_board = models.TextField(null=True, blank=True)
    author_instructions = models.TextField(null=True, blank=True)
    article_processing_charge = models.TextField(null=True, blank=True)
    indexing_and_archiving = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name
    
    @property
    def article_count(self):
        papers = self.paper_set.all()
        article_no = papers.count()
        return article_no
    
class Volume(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False, primary_key=True)
    number = models.IntegerField(null=True)
    journal = models.ForeignKey(Journal, null=True, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True, null = True)

    def __str__(self):
        return str(self.number) +" "+ self.journal.name

class Issue(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False, primary_key=True)
    number = models.IntegerField(null=True)
    volume = models.ForeignKey(Volume, null=True, on_delete=models.CASCADE)
    journal = models.ForeignKey(Journal, null=True, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True, null = True) # This basically takes a snapshot of when the object was added to the database automatically

    def __str__(self):
        return 'Issue:' + str(self.number) + ' < Volume:' + ' ' + str(self.volume.number) + ' < ' + self.volume.journal.name

class Paper(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False, primary_key=True)
    title = models.CharField(max_length=200, null=True)
    author = models.CharField(max_length=200, null=True)
    description = models.TextField(null=True)
    institution = models.CharField(max_length=200, null=True)
    keywords = models.CharField(max_length=200, null=True)
    volume = models.ForeignKey(Volume, null=True, on_delete=models.CASCADE)
    issue = models.ForeignKey(Issue, null=True, on_delete=models.CASCADE)
    journal = models.ForeignKey(Journal, null=True, on_delete=models.CASCADE)
    document = models.FileField(upload_to='docs/%Y/%m/%d/', null=True, blank=True)
    # recieved = models.DateField(null=True)
    date_created = models.DateTimeField(auto_now_add=True, null = True) # This basically takes a snapshot of when the object was added to the database automatically
    doi = models.CharField(max_length=200, null=True)
    editorsChoice = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class News(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False, primary_key=True)
    title = models.CharField(max_length=200, null=True)
    body = models.TextField(null=True)
    date_created = models.DateTimeField(auto_now_add=True, null = True)

    def __str__(self):
        return self.title

class HomeSlider(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False, primary_key=True)
    title = models.CharField(max_length=200, null=True)
    body = models.TextField(null=True)
    pic = models.ImageField(null=False, blank=False)
    date_created = models.DateTimeField(auto_now_add=True, null = True)

    def __str__(self):
        return self.title

class Submission(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False, primary_key=True)
    firstname = models.CharField(max_length=200, null=True)
    lastname = models.CharField(max_length=200, null=True)
    email = models.EmailField(max_length=200, null=True)
    phonenumber = models.CharField(max_length=200, null=True)
    institution = models.CharField(max_length=200, null=True)
    country = models.CharField(max_length=200, null=True)
    manuscript = models.FileField(upload_to ='papers/%Y/%m/%d/')
    supplementary =  models.FileField(upload_to ='papers/%Y/%m/%d/')
    journal = models.ForeignKey(Journal, null=True, on_delete=models.CASCADE)
    date_submitted = models.DateTimeField(auto_now_add=True, null = True)

    def __str__(self):
        return self.firstname + " " + self.lastname

class Newsletter(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False, primary_key=True)
    journal = models.ForeignKey(Journal, null=True, on_delete=models.CASCADE)
    email = models.EmailField(max_length=200, null=True)

    def __str__(self):
        return self.email
        
        
# OTHER LINKS

class About(models.Model):
    content = models.TextField()

    def __str__(self):
        return self.content
    
class Contact(models.Model):
    title = models.CharField(max_length=200, null=True)
    content = models.TextField()
    pic = models.ImageField(null=True, blank=True)

    def __str__(self):
        return self.title

class Author(models.Model):
    content = models.TextField()

    def __str__(self):
        return self.content

class Reviewer(models.Model):
    content = models.TextField()

    def __str__(self):
        return self.content
    
class Editor(models.Model):
    content = models.TextField()

    def __str__(self):
        return self.content
    
class OpenAccess(models.Model):
    content = models.TextField()

    def __str__(self):
        return self.content
    
class EditorialProcess(models.Model):
    content = models.TextField()

    def __str__(self):
        return self.content
    
class Ethics(models.Model):
    content = models.TextField()

    def __str__(self):
        return self.content
    
class Charges(models.Model):
    content = models.TextField()

    def __str__(self):
        return self.content
        
class VisibilityStatement(models.Model):
    content = models.TextField()

    def __str__(self):
        return self.content
