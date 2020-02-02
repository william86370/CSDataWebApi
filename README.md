# CSDataWebApi Development Guide () {

*Developed For CS-452 Database System*
## Purpose

Allow for easy access and usage for a backend Server Written in NodeJS


## How dose the Api Work?

1. Generate the following AUTH api for you at `http://localhost:3000`


|Method| URL                        | data(if needed)                        | server action(if request is good)                 |
| ---- |----------------------------| ---------------------------------------| --------------------------------------------------|
| GET | /api/v1/Auth                |                                        |Lists The Api Structure and usage Calls            |
| GET | /api/v1/Auth/CreateAccount  | {name: ..., email: ..., password: ...} |Checks inputs and creates new Account              |
| GET | /api/v1/Auth/Login          | {email: ..., password: ...}            |Checks username/passwords and Generates APi Token  |
| GET | /api/v1/Auth/TestToken      | {token(the generated token)}           |verifies token and displays test data              |
| GET | /api/v1/Data                | {token(the generated token)}           |verifies token and displays Users Data             |

(more details in the code)


## TODOS

   - [ ] better http status code
   - [ ] better config params
   - [ ] docs
   - [ ] new feature

## license

     MIT

}
