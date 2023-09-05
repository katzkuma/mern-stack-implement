# Journey of Transferring Javascript to Typescript
---

## Transferring Backend
### 1. Install dependency
```shell
cd backend
npm -D i typescript @types/node @types/express
```
### 2. Initial the config.ts
```shell
npx tsc --init
```
### 3. Specify output destination to ./dist in `tsconfig.json`
```json
"outDir": "./dist"
```
### 4. Create a file `./env.d.ts` to declare types of .env property
```typescript
namespace NodeJS {
    interface ProcessEnv {
        PORT: string
        MONGO_URI: string
    }
}
```
### 5. Transpile all the `*.js` files to `*.ts`

### 6. Edit the launch script of package.json to build transpiling pipeline.
Because `tsc` will only transpile all the `.ts` files to `./dist/*.js`, the other files need to be copied separately.

#### Install wait-on package
First of all, to make sure `nodemon ./dist/server.js` is executed after `./dist` is ready, use `wait-on` package for it
```shell
npm i wait-on --save-dev
```
#### Edit launch scripts
Add transpiling process into launch script of `package.json`
```json
"scripts": {
    "prepare": "rm -rf ./dist/ && mkdir -p ./dist/ && cp .env ./dist/.env",
    "transpile": "npm run prepare & tsc -w & wait-on ./dist/",
    "nodemon": "nodemon ./dist/server.js",
    "start": "npm run prepare && tsc && node ./dist/server.js",
    "dev": "npm run transpile && npm run nodemon"
}
```
| Pipeline | Description |
|-|-|
| prepare | Reset the directory `dist` and prepare for transpiling |
| transpile | Run `prepare` pipeline and transpile all the `.ts` files |
| nodemon | Launch `./dist/server.js` by `nodemon` |
| start | Launch `./dist/server.js` |
| dev | Launch `./dist/server.js` with listening mode |
| test | Run the testing code `*.test.ts` |

### 7. Done!
---
## Transferring Testing
### 1. Replace `jest` to `ts-jest`
```shell
npm uninstall jest
npm install --save-dev ts-jest @types/supertest
```

### 2. Transpile all the `*.js` files to `*.ts`

### 3. Customize jest setting to only test `*.test.ts`
Generate `jest.config.js`
```shell
npx ts-jest config:init
```
Add `testMatch` in `jest.config.js`
```javascript
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/*.test.ts"], // add this line
};
```

### 4. Edit test script in `package.json`
Leave the original testing command. `ts-jest` will use the same command to run the testing.
```json
"scripts": {
    "prepare": "rm -rf ./dist/ && mkdir -p ./dist/ && cp .env ./dist/.env",
    "transpile": "npm run prepare & tsc -w & wait-on ./dist/",
    "nodemon": "nodemon ./dist/server.js",
    "start": "npm run prepare && tsc && node ./dist/server.js",
    "dev": "npm run transpile && npm run nodemon",
    "test": "./node_modules/.bin/jest --coverage",      // Leave this line
}
```
### 5. Done!
---
## Happy Transferring!