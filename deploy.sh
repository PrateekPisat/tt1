#!/bin/bash

export PORT=5200
export MIX_ENV=prod
export GIT_PATH=/home/tt1/src/tt1

PWD=`pwd`
if [ $PWD != $GIT_PATH ]; then
	echo "Error: Must check out git repo to $GIT_PATH"
	echo "  Current directory is $PWD"
	exit 1
fi

if [ $USER != "tt1" ]; then
	echo "Error: must run as user 'memory'"
	echo "  Current user is $USER"
	exit 2
fi

mix deps.get
(cd assets && npm install)
(cd assets && ./node_modules/brunch/bin/brunch b -p)
mix phx.digest
mix release --env=prod

mkdir -p ~/www
mkdir -p ~/old

NOW=`date +%s`
if [ -d ~/www/tt1 ]; then
	echo mv ~/www/tt1 ~/old/$NOW
	mv ~/www/tt1 ~/old/$NOW
fi

mkdir -p ~/www/tt1
REL_TAR=~/src/tt1/_build/prod/rel/tt1/releases/0.0.1/tt1.tar.gz
(cd ~/www/tt1 && tar xzvf $REL_TAR)

crontab - <<CRONTAB
@reboot bash /home/tt1/src/tt1/start.sh
CRONTAB

. start.sh
