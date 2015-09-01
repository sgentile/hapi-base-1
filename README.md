# Node SupportTicket ![Build Status](http://sdsbuildserver.cloudapp.net/app/rest/builds/buildType:%28id:SupportTicket_CIBuild%29/statusIcon)

An updated version of support ticket, written with the Hapi framework in Node.


## Command Line Tools Installation

You'll need yeoman, grunt, bower, nodemon, lab for the test

npm install -g yo   (Yeoman - for our generator)

npm install -g grunt-cli  (Grunt)

npm install -g bower (Bower)

npm install -g nodemon (nodemon)

npm install -g lab  (then run lab to run them - wip)

## Installation

Run npm install && bower install (this will get all the node and bower packages the project uses)

## Swagger

To view the API documentation, run the server (node server) then you can go to http://<currentserver>/documentation

## Server side

lab server/test

## Running different environments

grunt serve  // client side only

grunt serve:nodemon // client side and node server

grunt serve:api  // node server only

nodemon server.js // production build

## Knex

Migrations

http://knexjs.org/#Migrations

npm install knex -g

Make Seed: knex seed:make seed_name

Run Seed: knex seed:run

Make Migrations knex migrate:make migration_name

Run Migrations knex migrate:latest

Rollback knex migrate:rollback

to run against prod   --env production

(note to set environment to dev test:  export NODE_ENV=qa  on windows use SET NODE_ENV=qa)

## SDS Generator

https://github.com/SMARTDATASYSTEMSLLC/generator-sds-angular

There are two ways to use the generator, simpliest way is:

npm install -g generator-sds-angular

(Or if you want to develop against it as well, you can use npm link)

This project uses the SDS Generator - here is a cheat sheet of available commands:

yo sds-angular:directive my-awesome-directive

yo sds-angular:partial my-partial

yo sds-angular:service my-service

yo sds-angular:filter my-filter

yo sds-angular:module my-module

yo sds-angular:modal my-modal


## Link commit with pivotal

git commit -am "[#1234567] commit message"

git commit -am "[Finishes #1234567] commit message"

git commit -am "[Fixes #101233024] commit message"

git commit -am "[Delivers #1234567] commit message"

or use this utility for easy access:
https://github.com/bogdan/git-storyid

## Grunt Bump

https://github.com/vojtajina/grunt-bump

grunt bump handles each revision on push
 
grunt bump:minor 0.0.1 to 0.1.0

grunt bump:major 0.0.0 to 1.0.0

grunt bump:patch 0.0.1 to 0.0.2

grunt bump:git  1.0.1-ge96c

grunt bump:prepatch 1.0.2-1

## Margin CSS Helpers

David added :  mt, mb, m, pt pb p, 0-30   ie. class="mt10"
