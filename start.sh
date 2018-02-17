#!/bin/bash

export PORT=5200

cd ~/www/memory
./bin/tt1 stop || true
./bin/tt1 start 
