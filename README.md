# NestJS Rest Template :rocket:

The goal of this project is to provide a fast and robust solution to start your project in NestJS.

## How to start using this project?

1. Clone repo: `git@github.com:Alejandrehl/nestjs-rest-template.git`
2. Create .env file: `cp .env.example .env`
3. Setup your environment variables in `.env` file.
4. Change `name`, `version`, `description` and `author` in `package.json` file.
5. Install dependencies: `yarn install`
6. Run project: `yarn start:dev`

## Features

1. OpenAPI (Swagger)
2. MongoDB
3. Typegosee
4. JWT
5. Sendgrid

## Libraries and dependencies

1. [@nestjs/config](https://yarnpkg.com/package/@nestjs/config): Configuration module for Nest based on the dotenv (to load process environment variables) package.
2. [@nestjs/schedule](https://yarnpkg.com/package/nestjs-schedule): Distributed Schedule module for Nest based on the node-schedule package.
3. [@nestjs/terminus](https://yarnpkg.com/package/@nestjs/terminus): This module contains integrated healthchecks for Nest.
4. [nestjs-typegoose](https://yarnpkg.com/package/nestjs-typegoose): Injects typegoose models for nest components and controllers. Typegoose equivalant for @nestjs/mongoose.
5. [@ntegral/nestjs-sendgrid](https://yarnpkg.com/package/@ntegral/nestjs-sendgrid): Injectable SendGrid client for your nestjs projects.
6. [mongoose](https://yarnpkg.com/package/mongoose): Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
7. [@typegoose/typegoose](https://yarnpkg.com/package/@typegoose/typegoose): Define Mongoose models using TypeScript classes.
8. [@nestjs/swagger](https://yarnpkg.com/package/@nestjs/swagger): OpenAPI (Swagger) module for Nest.
9. [swagger-ui-express](https://yarnpkg.com/package/swagger-ui-express)
10. [bcryptjs](https://yarnpkg.com/package/bcrypt): A bcrypt library for NodeJS.
11. [class-validator](https://yarnpkg.com/package/class-validator): Allows use of decorator and non-decorator based validation. Internally uses [validator.js](https://yarnpkg.com/package/validator) to perform validation. Class-validator works on both browser and node.js platforms.
12. [BcryptJS](https://yarnpkg.com/package/bcryptjs): Optimized bcrypt in plain JavaScript with zero dependencies. Compatible to 'bcrypt'.
13. [@nestjs/passport](https://yarnpkg.com/package/@nestjs/passport): Passport utilities module for Nest.
14. [passport-jwt](https://yarnpkg.com/package/passport-jwt): Passport authentication strategy using JSON Web Tokens.
15. [@nestjs/jwt](https://yarnpkg.com/package/@nestjs/jwt): JWT utilities module for Nest based on the jsonwebtoken package.
16. [passport](https://yarnpkg.com/package/passport): Simple, unobtrusive authentication for Node.js.
17. [class-transformer](class-transformer): Proper decorator-based transformation / serialization / deserialization of plain javascript objects to class constructors.

## Technical Debt

1. Testing
2. HealthCheck
