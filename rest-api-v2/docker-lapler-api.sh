#!/bin/bash

sudo docker build -t lapler-api .

sudo docker tag lapler-api:latest rizkij/lapler-api:latest

sudo docker push rizkij/lapler-api:latest  