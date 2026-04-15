# Portfolio Django Backend

## Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Configuration
- PostgreSQL is used when `POSTGRES_DB` is set in `.env`.
- SQLite is used as local fallback when PostgreSQL variables are not set.
- JWT auth is enabled through `djangorestframework-simplejwt`.

## API Endpoints
- `POST /api/accounts/register/` - register user
- `POST /api/accounts/login/` - login with email/password
- `POST /api/accounts/logout/` - blacklist refresh token
- `GET/PATCH /api/accounts/profile/` - profile management
- `POST /api/token/refresh/` - refresh JWT token
- `GET/POST /api/portfolio/projects/` - list/create projects
- `GET/PUT/PATCH/DELETE /api/portfolio/projects/{id}/` - project CRUD
- `POST /api/portfolio/contact/` - submit contact form
- `/admin/` - Django admin panel
