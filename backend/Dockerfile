FROM python:3.10

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/backend

COPY requirements.txt /app/backend/
RUN     pip install --no-cache-dir -r requirements.txt

COPY . /app/backend/

ENV PORT=8000
EXPOSE 8000

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
