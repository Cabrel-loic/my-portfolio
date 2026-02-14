make migrations for project

cd portfolio
python manage.py makemigrations project --name project_domain

this is an unused error i will start with when next i want to work on this project
the frontend is not loading projects. that is another issue to check
ValidationError at /admin/project/project/add/
["Invalid keys in architectural_overview: ['api_design', 'authentication']. Allowed: ['backend', 'database', 'deployment', 'frontend', 'media_handling', 'overview', 'stages']."]
Request Method:	POST
Request URL:	http://localhost:8000/admin/project/project/add/
Django Version:	6.0.1
Exception Type:	ValidationError
Exception Value:	
["Invalid keys in architectural_overview: ['api_design', 'authentication']. Allowed: ['backend', 'database', 'deployment', 'frontend', 'media_handling', 'overview', 'stages']."]
Exception Location:	C:\Users\KEMLOUNG\Desktop\dev\Fullstack\Personal Portfolio app\portfolio\project\validators.py, line 74, in validate_architecture_structure
Raised during:	django.contrib.admin.options.add_view
Python Executable:	C:\Users\KEMLOUNG\Desktop\dev\Fullstack\Personal Portfolio app\portfolio\.venv\Scripts\python.exe
Python Version:	3.13.4
Python Path:	
['C:\\Users\\KEMLOUNG\\Desktop\\dev\\Fullstack\\Personal Portfolio '
 'app\\portfolio',
 'C:\\Program Files\\Python313\\python313.zip',
 'C:\\Program Files\\Python313\\DLLs',
 'C:\\Program Files\\Python313\\Lib',
 'C:\\Program Files\\Python313',
 'C:\\Users\\KEMLOUNG\\Desktop\\dev\\Fullstack\\Personal Portfolio '
 'app\\portfolio\\.venv',
 'C:\\Users\\KEMLOUNG\\Desktop\\dev\\Fullstack\\Personal Portfolio '
 'app\\portfolio\\.venv\\Lib\\site-packages']
Server time:	Sat, 14 Feb 2026 16:32:25 +0000