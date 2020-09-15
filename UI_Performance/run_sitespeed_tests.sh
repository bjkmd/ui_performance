#!/bin/sh

ip=$(ip -f inet -o addr show eth0|cut -d\  -f 7 | cut -d/ -f 1)


docker run --network=host -v ${PWD}:/sitespeed.io sitespeedio/sitespeed.io:13.1.1 UI_Performance/openMainPageScript.js --config UI_Performance/sitespeedConfig.json   --graphite.host=$ip --browsertime.hostname HOST_PREPROD --outputFolder output/cpu/HOST_PREPROD --cpu

docker run --network=host -v ${PWD}:/sitespeed.io sitespeedio/sitespeed.io:13.1.1 UI_Performance/openMainPageScript.js --config UI_Performance/sitespeedConfig.json   --graphite.host=$ip --browsertime.hostname HOST_PROD --outputFolder output/cpu/HOST_PROD --cpu

docker run --network=host -v ${PWD}:/sitespeed.io sitespeedio/sitespeed.io:13.1.1 UI_Performance/addToCartScript.js --config UI_Performance/sitespeedConfig.json   --graphite.host=$ip --browsertime.hostname HOST_PREPROD --outputFolder output/HOST_PREPROD 

docker run --network=host -v ${PWD}:/sitespeed.io sitespeedio/sitespeed.io:13.1.1 UI_Performance/addToCartScript.js --config UI_Performance/sitespeedConfig.json    --graphite.host=$ip --browsertime.hostname HOST_PROD --outputFolder output/HOST_PROD

