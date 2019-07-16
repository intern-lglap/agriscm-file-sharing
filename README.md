# AgriSCM File Sharing

File sharing component of AgriSCM system, using Ethereum and NodeJS.

## Prerequisites
1. Install/rollback to NodeJS 8.15.0 andusing [NVM](https://github.com/creationix/nvm)
2. From project root folder install all the dependencies: `npm install --unsafe-perm=true --allow-root`
3. Install [Truffle](https://www.trufflesuite.com/)

### Install NodeJS 8.15.0
1. `nvm use`
2. `nvm install`
3. `nvm exec`
4. `nvm run`
5. Check if you're running the correct version with `nvm which`

## Run
### Development mode
`npm run dev`:

REST API server will listen at localhost:3000

Ganache runs on localhost:7545

### Testing
#### Smart Contract
Run `truffle test` to execute the Smart Contract's unit tests.