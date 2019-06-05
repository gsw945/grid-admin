# grid-admin

### build note
```bash
mkdir grid-admin
cd grid-admin
django-admin startproject main .
python manage.py startapp pages
python manage.py migrate
python manage.py runserver 0.0.0.0:8787
```