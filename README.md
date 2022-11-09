# Demo Credit(Lendsqr)
A demo API for Lendsqr assessment


## Demo Credit - Backend Challenge

Demo credit API built with Typescript and MySQL(knex), using clean Architecture.

This API allows users to create an account, fund the account, withdraw from the account and transfer to another account. It has an authentication system that supports login and signup, with the help of JWT.

##  **Architecture**
The application structure is divided into 3 main layers - resources, middleware, utils

### 1)  **Resources -**  
This Layer is the core of our application. In this layer lies the business logic of our application. To keep the application simple 3 resources where used - User,
Transaction, Wallet. Each Resource contains a consistent folder structure of names - factory, interfaces, repository and usecase.

*   usecase: This folder contains a series of files which denotes every usecase
    that can be exhausted on the resource - eg. <br>
    *   User resource usecase to - Signup, Login, ForgotPassword,         ResetPassword, Logout etc
    *   Wallet resource usecase to - createwallet, increaseBalance, decreaseBalance etc<br />
    Following the clean architecture guide we isolate this usecases from third party libraries and rather use interface and not the real imlementaion
    of the libraries. From the code base this can be seen in the User resource signup and login usecase where we needed to use an external library
    bcrypt to hash and verify the password but rather interface or abstract class was used as a stub.

*   interface: This folder contains all the neccessary interfaces needed for the resource usecases.
*   repository: This is where the actual call to the db is made for data access.
*   factory: This is where we build all our usecases together into one piece to be called by the controller. 

### 2)   **Middleware -**
This contains all the necessary middleware functions (not third party libraries) used in our express application. ie. methods we want to run before the request gets to the controllers. Error Handling, authenticate middleware are all in this folder

### 3)  **Utils -**
This is where all other helper or global functions are initiated eg - Initializing the db, validating the env variables etc


## API ERD
<p align="center">
  <img src="Demo_credit_wallet.jpg" alt="ERD"/>
</p>

## Notable Technologies used
*   Typescript
*   Knex
*   MySQL
*   Jsonwebtoken - user authentication
*   Bcryptjs - password encryption
*   Jest

## Live demo
 [heroku demo server](https://joshua-lendsqr-be-test.herokuapp.com/) **NB: Expires 28 november 2022**

## Postman API documentation
[Postman docs link](https://www.postman.com/s255y/workspace/lendsqr-assessment/collection/6718885-454d8e1a-9336-48bb-bc92-0a97b0a8db57?action=share&creator=6718885)


## API endpoints documentation Overview

## 1) Authentication

*   **Signup** - /api/users/signup - POST
-   **request**
    ```json
        {
        "name": "Joshua",
        "email": "uzoagulujoshua@yahoo.com",
        "password": "test1234",
        "role": "lender"
        }
    ```
-   **response**
    ```json
        {
            "status": "success",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDE0ZWRhNWMzZTNkYzkzZjFjNjRiYiIsImlhdCI6MTY2MTAzMDEwNywiZXhwIjoxNjYzNjIyMTA3fQ.I8YN5RVAi_GVetj3E_rQuuaegftx_PQrXhUVgtxJRrg",
        }
    ```

*   **Login** - /api/users/login - POST
-   **request**
    ```json
        {
        "email": "uzoagulujoshua@yahoo",
        "password": "test1234"
        }
    ```
-   **response**
    ```json
        {
            "status": "success",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDEzODQ3MDdiY2FhYWZkZmZlOWUxYiIsImlhdCI6MTY2MTAyOTkyNywiZXhwIjoxNjYzNjIxOTI3fQ.c9vspFcPkGxa2yrZ6wcTvhYMUD8Jbw5_uXk1QIL-JkA",
        }
    ```

## 2)  Account Details

*   **Get current user details** - /api/users - GET
-   **response**
    ```json
        {
            "status": "success",
            "account": {
                "email": "uzoagulujoshua@yahoo.com",
                "name": "user",
                "role": "lender",
                "wallet": {
                    "balance": 500,
                    "account_no": "7010437197"
                }
            }
         }
    ```

## 3)   Transactions

*   **Credit account** - /api/transactions/credit - POST

-   **request**
    ```json
        {
            "amount": 5000
        }
    ```
-   **response**
    ```json
        {
            "status": "success",
            "data": {
                "date": "2022-11-08T23:00:00.000Z",
                "reference_id": "166796818465380000bef6073",
                "transaction_type": "credit",
                "credit_wallet": "7010437197",
                "amount": 5000
            }
        }
    ```

*   **Get Credit Transactions history** - /api/transactions/credit - GET
-   **response**
    ```json
        {
            "status": "success",
            "result": 2,
            "credit_transactions": [
                {
                    "date": "2022-11-08T23:00:00.000Z",
                    "reference_id": "166796818465380000bef6073",
                    "transaction_type": "credit",
                    "credit_wallet": "7010437197",
                    "amount": 500
                },
                {
                    "date": "2022-11-07T23:00:00.000Z",
                    "reference_id": "166793656706680000bef6073",
                    "transaction_type": "credit",
                    "credit_wallet": "7010437197",
                    "amount": 5000
                }
            ]
        }
    ```

*   **Withdraw from account** - /api/transactions/withdraw - POST

-   **request**
    ```json
        {
            "amount": 120,
            "bank_account_no": "0245910729",
            "bank_name": "GTBank"
        }
    ```
-   **response**
    ```json
        {
            "status": "success",
            "data": {
                "date": "2022-11-08T23:00:00.000Z",
                "reference_id": "166796835899780000bef6073",
                "transaction_type": "withdraw",
                "debit_wallet": "7010437197",
                "amount": 120,
                "bank_account_no": "0245910723",
                "bank_name": "GTBank"
            }
        }
    ```

*   **Get Withdrawal Transactions history** - /api/transactions/withdraw - GET
-   **response**
    ```json
        {
            "status": "success",
            "result": 1,
            "withdraw_transactions": [
                {
                    "date": "2022-11-08T23:00:00.000Z",
                    "reference_id": "166796835899780000bef6073",
                    "transaction_type": "withdraw",
                    "debit_wallet": "7010437197",
                    "amount": 120,
                    "bank_account_no": "0245910723",
                    "bank_name": "GTBank"
                }
            ]
        }
    ```

*   **Transfer to another account** - /api/transactions/transfer - POST

-   **request**
    ```json
        {
            "amount": 900,
            "credit_wallet": "8049925408"
        }
    ```
-   **response**
    ```json
        {
            "status": "success",
            "data": {
                "date": "2022-11-08T23:00:00.000Z",
                "reference_id": "166796849453180000bef6073",
                "transaction_type": "transfer",
                "credit_wallet": "8049925408",
                "debit_wallet": "7010437197",
                "amount": 900
            }
        }
    ```

*   **Get Transfer Transactions history** - /api/transactions/transfer - GET
-   **response**
    ```json
        {
            "status": "success",
            "result": 2,
            "transfer_transactions": [
                {
                    "date": "2022-11-07T23:00:00.000Z",
                    "reference_id": "166793661173480000bef6073",
                    "transaction_type": "transfer",
                    "credit_wallet": "8049925408",
                    "debit_wallet": "7010437197",
                    "amount": 900
                },
                {
                    "date": "2022-11-08T23:00:00.000Z",
                    "reference_id": "166796849453180000bef6073",
                    "transaction_type": "transfer",
                    "credit_wallet": "8049925408",
                    "debit_wallet": "7010437197",
                    "amount": 900
                }
            ]
        }
    ```

## Improvements and Considerations

*   To make the application less tightly coupled and make each resources isolated we could use the publish-observer pattern/ Events handlers where each resources subscribes to an event and listens to perform and action when needed.  

*   Also the Design of the wallet can be improved extensively as this one was designed in other to accommodate time for development