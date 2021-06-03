# robdog-tweeter

# https://robdog-tweeter.herokuapp.com/

Node.js site called tweeter hosted on Heroku and uses MongoDB. Originally a class project provided by professor, which I implemented further. All twits are public and can be created by anyone.

Provides live search functionality, adding new twits with author and text (and alert if you haven't fileld both fields). Dark mode button also supported, and remembers your choice stored locally. 404 page is supported, and go to /twits/n replacing "n" with a number starting at 0 to view a page with that single twit. 

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
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
