#!/bin/sh
git config --global credential.helper cache

git pull
git add -A
git add *
git commit -m "New changes"
git push -u origin master

