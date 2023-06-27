#!/bin/bash

sudo docker build -t lapler-react .

sudo docker tag lapler-react:latest rizkij/lapler-react:latest

sudo docker push rizkij/lapler-react:latest  