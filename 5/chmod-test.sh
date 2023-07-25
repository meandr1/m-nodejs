#!/bin/bash
DIR=$1
while true; 
do
find $DIR -type f -exec chmod 660 {} \;;
find $DIR -type d -exec chmod 770 {} \;;
sleep 5;
done