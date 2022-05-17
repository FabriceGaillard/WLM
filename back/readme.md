# WLM

1.  [Get latest version of postgres](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) and install it.

    > :rice: !
    > During installation you will have to choose a password. Keep it carefully, it will be necessary later. Let all things to default config.

2.  Create a **.env file** (_into back folder_) and define all properties defined into readme.example.env

    > :rice_ball: !
    > `PG_PASSWORD` must be equal to your password set during installation of postgres
    > `PG_USER` must be equal to your username* used to connect to postgres — *by default : `postgres`

    > `MAILGUN_API_KEY` and `MAILGUN_DOMAIN` depends to a mailgun account. Ask to core developper to give you these informations.

3.  Depencies installation

    > :rice_cracker: !
    > `npm i`

4.  Database Initialization
    > :fish_cake: !
    > `npm run db:init`
5.  Launch project
    > :ramen: !
    > `npm run dev`
