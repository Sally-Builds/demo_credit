# Demo Credit(Lendsqr)
A demo API for Lendsqr assessment


## API ERD
![Demo credit ERD](Demo_credit_wallet.jpg "lendsqr")

## Notable Technologies used
*   Typescript
*   Knex
*   MySQL
*   Jsonwebtoken - user authentication
*   Bcryptjs - password encryption
*   Jest

## Live demo
 [heroku demo server](https://uzoagulu-joshua.lendsqr-be-test.herokuapp.com/) **NB: Expires 28 november 2022**

## Postman API documentation
[Postman docs link](https://www.postman.com/s255y/workspace/lendsqr-assessment/collection/6718885-c924251b-ca3c-47cf-8119-4f4e6c247237?action=share&creator=6718885)


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