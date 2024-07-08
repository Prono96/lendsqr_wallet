# LENDSQR_WALLET

This is a wallet test based project, that allow users to register, fund wallet, transfer funds to other users 
and withdraw fund.

## How To Run Lendsqr_wallet, follow these steps:

1. Clone the Repository:
   
   `git clone git@github.com:Prono96/lendsqr_wallet.git`

2. Install Dependencies:
Ensure you have Node.js and npm (Node Package Manager) installed. Then run:

   `npm install`

3. Compile TypeScript:
Compile the TypeScript code to JavaScript, you can compile directly using the TypeScript compiler:

   `npm start`

4. To Run Test:

   `npm test`



## How To Migrate The DataBase Files

   `npm run db:migration OR knex migration:latest`


## Endpoints
REGISTER USERS
`POST: https://promise-prince-lendsqr-be-test.vercel.app/api/users`

FUND WALLET
`POST: https://promise-prince-lendsqr-be-test.vercel.app/api/fund`

TRANSFER FUNDS
`POST: https://promise-prince-lendsqr-be-test.vercel.app/api/transfer`

WITHDRAW FUNDS
`POST: https://promise-prince-lendsqr-be-test.vercel.app/api/withdraw`

DELETE USER
`DELETE: https://promise-prince-lendsqr-be-test.vercel.app/api/delete-user`



## E R Diagram

![ERD](https://github.com/Prono96/lendsqr_wallet/blob/main/Start%20(1).png)

   
