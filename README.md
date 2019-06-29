# Flickpick API

## Description

Flickpick API is the back end of the Flickpick app. Flickpick is an app where users can sign up, peruse popular movies, and save specific movies into a favorites list. This API includes full CRUD distributed across three models (User, Movie, and Genre) using RESTful routes. The data used was pulled from The Movie Database(TMDb), found at https://www.themoviedb.org/?language=en-US.

This app was built by a team of three collaborators:

Shane Vann-Shirley: https://github.com/ashanev

Paula Bannerman: https://github.com/dcartist

Melika Rasti: https://github.com/mrasti

## Technologies Used

Express.js, MongoDB, Mongoose, Passport, Passport-JWT, JWT-Simple

## Links to Flickpick

Front end github repository found at: https://github.com/ashanevs/flickpick

Deployed app: http://www.flickpick.surge.sh

# Getting Started / Installation Instructions

If you want to work with the full repo, first fork and clone it (https://help.github.com/en/articles/fork-a-repo). Ensure you have node installed (node --version from your CLI to check the version, if not, it is available for free from their website) then run

```
npm install
```

from the root directory of your cloned project to install dependencies (e.g. Express, Mongoose).

There are three files that need to be run in order to seed your local database: one for movies, videos (embedded youtube videos), and genres. You will need to run the following three seed files <b>in order</b> via your terminal. Note that movies and videos will take several minutes, as there are ~2000 entries that process with intermittent pauses.

```
node db/seed-movies.js
node db/seed-videos.js
node db/seed-genres.js
```

In order to have the database running, you can run:

```
nodemon index.js
```

in your terminal from the root directory to begin hosting from http://localhost:3000/.

# Endpoints

## Routes for Movie collection

\*Note that getById uses a unique "id" property for each movie, <i>not</i> its Object Id.

|      Name       |           Path            | HTTP Verb |                 Purpose                 |
| :-------------: | :-----------------------: | :-------: | :-------------------------------------: |
|  getAllMovies   |   /api/movies/allmovies   |    GET    |           Displays all movies           |
|     getById     |      /api/movies.:id      |    GET    |    Display one class by its movie Id    |
|   getByTitle    | /api/movies/title/:title  |    GET    |     Displays one movie by its title     |
|  searchByTitle  | /api/movies/search/:title |    GET    | Displays one movie by its title(regexp) |
| getRandomMovies |       /api/movies/        |    GET    |  Display 21 movies (selected randomly)  |

## Routes for Genre collection

|       Name       |       Path        | HTTP Verb |            Purpose            |
| :--------------: | :---------------: | :-------: | :---------------------------: |
|   getAllGenres   |    /api/genre     |    GET    |      Displays all genres      |
| getMoviesByGenre | /api/genre/id/:id |    GET    | Displays 21 movies of a genre |

## Routes for User collection

\*Note that a body containing properties for email (String) and password (String) are required to use signup and login routes

|    Name     |            Path            | HTTP Verb |                       Purpose                       |
| :---------: | :------------------------: | :-------: | :-------------------------------------------------: |
|   getById   |         /api/user          |    GET    |         Displays a user by their Object Id          |
|   signUp    |      /api/user/signup      |   POST    |      Allows a user to sign up (requires body)       |
|    logIn    |      /api/user/login       |   POST    |       Allows a user to log in (requires body)       |
|  addMovie   | /api/user/:userId/:movieId |    PUT    |    Adds a movie to user's favorites by objectId     |
| removeMovie | /api/user/:userId/:movieId |    PUT    | Removes a movie from a user's favorites by objectId |
|   delete    |     /api/user/:userId      |  DELETE   |     Deletes an existing user from the database      |

# Project History

The MVP goal was to create a working back end of the API for our full-stack app. We utilized object references between models and used populate to make the relationships between models more flushed out.

As a bonus goal, we implemented authentication and a user model with routes to store favorite movies in a list. Authentication mostly used a dependency called passport and JSON Web Tokens to verify users for access to user actions.

## Issues

There is an issue where a user who is "signed up" is not authenticated properly. Otherwise the database functions well and as expected.

## Prospective Goals

A user must log in even after completing sign up for authentication on some user routes to function propery. It appears to be a back end issue and we hope to resolve this in the future.

The movie GET route using id utilizes a unique id number from the database (~5 digits); ideally this would utilize the mongoose id (stored as \_id) instead.

# Contribution Resources

Source code: https://github.com/ashanevs/flickpick-api

Issue tracker: https://github.com/ashanevs/flickpick-api/issues
