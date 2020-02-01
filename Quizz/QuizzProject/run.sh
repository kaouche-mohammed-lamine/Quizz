#!/bin/bash


cd ..

webpack --mode development ./QuizzProject/frontend/src/index.js --output ./QuizzProject/frontend/static/frontend/main.js

cd QuizzProject/

python3.7 manage.py runserver
