<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Movie-ticket-app

This is a simple movie ticket booking application. The application uses NestJS, Postgres for a DB.

#### Available Scripts

In the project directory, you can run:

##### `npm install` 

which installs all the necessary packages.

#### Create movie-app database

##### 1. `sudo -u postgres psql`

##### 2. `CREATE DATABASE movie_app;`

##### 3. `\connect movie_app;`

#### Run Migrations

##### `npm run typeorm:run-migrations`

### Start server
In the app directory run.<br />
##### `npm run start:dev`

This runs the server in development environment. <br />
The server will reload if you make any changes. <br />

## Database Structure

The DB consistis of Tables: { RoomsTable, MoviesTable, SeatsTable, ScreeningsTable, ScreeningSeatsTable, UsersTable, TicketsTable }

`RoomsTable` - responsible for storing the rooms in cinema. <br />
`MoviesTable` - responsible for storing all the movies.<br />
`SeatsTable` - reponsible for storing the seats in a specific room, which is determines by the size of the room.<br />
`ScreeningsTable` - responsible for storing the screenings in each room. Uses movieId and roomId to construct a screening.<br />
`ScreeningsSeatsTable` - responsible for storing the seats of the screening, so that it is identifiable which seats are available for users to choose.<br />
`UsersTable` - responsible to store the users of the application. We have two types of users: 'customer' and 'admin'. 'customer' users can only get the movie, room, screening datas as well as buy a ticket, however they cannot make any changes to the specified entities. 'admin' users on the other hand are able to perform CRUD operations on all of the above tables.
Right now 'admin' users can also registerd by specifying their role in the request body.<br />
`TicketsTable` - responsible for storing the ticket information that the user bought. <br />

## Postman link

https://www.postman.com/gold-space-386125/workspace/movie-ticket-app



