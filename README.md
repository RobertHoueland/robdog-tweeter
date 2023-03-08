# Tweeter

Website built in Node,js where users can post twits. Twits are saved on MongoDB.

Provides live search functionality, button to add new twits with author and text (and alert if you haven't fileld both fields). Dark mode button also supported, and remembers your choice stored locally. 404 page is supported, and ability to go to /twits/n replacing "n" with a number starting at 0 to view a page with that single twit. 

#

A Node.js app using [Express 4](http://expressjs.com/).

This application supports the [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone https://github.com/TheRobdog/robdog-tweeter/ # or clone your own fork
$ cd robdog-tweeter
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku main
$ heroku open
```
