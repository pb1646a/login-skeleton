This is the backend config for project files, in order to include add, "backend":"" in dependencies in package.json
Add main.js with following code to link to frontend


require('backend/server');
const app = require('backend/app');
const express = require('express');
const path = require('path');
app.use(express.static(__dirname + '/dist/metro-bus-app'));

app.get('/', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/metro-bus-app/index.html'));
});


Add require('db'); to add Mongoose DB Config


REMEMBER TO SEND CONFIG_VARIABLES
**ANY CHANGES MADE TO MASTER BACKEND FILES WON'T SAVE UNLESS PUSHED UP TO REPO