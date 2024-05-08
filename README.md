
# NEST_ProjectX
Back-end application for NEXT_ProjectX

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
```bash
 Database administration
  1. Each modication to databased should be described by usin migrations
  2. Store credentials to database in .env

  Connect to database guideline
  1. Run yarn prisma:generate in terminal
  2. Put you credentials into .env file to according varibles
    * DATABASE_USERNAME
    * DATABASE_PASSWORD
  3. Only then you will be allowed to make database request
  !!! Please avoid commiting your credentials in env file
  !!! To avoid such behavior create ..env.local file and store your credentials there

  Database migration flow
  1. Change database structure by editing the schema.prisma
  2. Run yarn prisma:migrate in your terminal
  3. Name you migration according to the provided changes
  4. Review the generated migration file: make sure that data will be modified according to the your expectations
  5. If everything is good run yarn:prisma:apply
  6. If migration has been failed with error run yarn:prisma:rollback [migration name]
  7. If migrations has been applied but you want to revert it put it terminal:
    7.1. Undo migration manually by usin sql queries
    7.2. Remove related migration row in database: public._prisma.migrations
    7.3. Remove related migration folder that has been create according to your needs
```
