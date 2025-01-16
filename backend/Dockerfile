FROM python:3.10-slim

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/backend

COPY requirements.txt /app/backend/

RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/backend/
RUN python3 -m nltk.downloader punkt

ENV PORT=8000
EXPOSE 8000

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
