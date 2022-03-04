# personal-site

## Description

A simple fullstack app, where show information about me. This app has been deployed on [Heroku](https://www.heroku.com/home)
and has SSR (Server side rendering) and caching system with [Redis](https://redis.io)

## Resources

This app has been developed with [Vite](https://vitejs.dev/), [Express](https://www.npmjs.com/package/express) and
the following dependencies and resources:

* [@octokit/core](https://www.npmjs.com/package/@octokit/core)
* [cors](https://www.npmjs.com/package/cors)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [express](https://www.npmjs.com/package/express)
* [FontAwesome](https://fontawesome.com/)
* [nodemon](https://www.npmjs.com/package/nodemon)
* [redis](https://www.npmjs.com/package/redis)
* [vite-plugin-html](https://www.npmjs.com/package/vite-plugin-html)

## Configuration instructions

Clone repository

```shell
git clone https://github.com/agustinbarbalase/contact-manager.git
```

Create two ```.env``` file on your repository with the following options:

````./backend```

```shell
GH_ACCESS_TOKEN=your-gh-access-token-here
VITE_BASE_URL=your-vite-base-url-here
NODE_ENV=your-node-env-here
REDIS_URL=your-redis-url-here
```

````./frontend```

```shell
VITE_BASE_URL=your-vite-base-url-here
```

## Installation instructions

### Production

```shell
cd ./backend && npm install
cd ./frontend && npm install
npm start
```

### Dev

```shell
cd ./backend && npm install
cd ./frontend && npm install
npm run dev:frontend
npm run dev:backend
```

## Deploy on Heroku

This application was deployed in Heroku with Github actions. Here is the action and [here](https://abarbalase.herokuapp.com/) is the page

```yml
name: Deploy personal site to Heroku

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: ${{ secrets.HEROKU_APP_NAME }}
          heroku_email: ${{ secrets.HEROKU_EMAIL }}
          procfile: 'web: npm start'
        env:
          HD_VITE_BASE_URL : ${{ secrets.VITE_BASE_URL }}
          HD_GH_ACCESS_TOKEN: ${{ secrets.GH_ACCESS_TOKEN }}
          HD_REDIS_URL: ${{ secrets.REDIS_URL }}
```

## License

This app has a [MIT License](./LICENSE)
