# XDC Voting Admin Webapp

- XDC Voting Dapp is the admin portal of Governance in which admin can add, edit or delete any address for proposal creation and voting.
- Admin can connect to wallet and can add any address to whitelist address and give the permissions of voting or creating proposal in whitelisted voters porta.

## Usage

This webapp is having following features.

- Connect Wallet - Admin can install XDCPay extension and can login to the portal by connect the wallet.
- Add Address - Admin can add any address to whitelist address and can give the permissions of creating and voting proposal.
- Edit Address - Admin can edit any permissions of creating proposal or voting any proposal to whitelist address in voters portal.
- Delete Address - Admin can delete any particular address if he wants any address to remove from whitelist addresses.
- Search Functionality - Admin can also search any address from the whitelisted addresses table.
- Other XDC Products - Admin can also view all other XDC products from the admin portal.

## Steps for local setup

- clone the repository in your local system
- run `npm install` : To install the dependencies
- run `npm start` : It will start your server on your local machine
- Dependencies : Defined under `package.json`
- Deployment instructions : Docker based deployment, Dockerfile is there in parent directory

## About env file

This file is having different types of variables like:

- All the microservice url that is required in webapp
- Admin address
- Master contract address
- etc.
