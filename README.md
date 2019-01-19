# Type-graphql + typeorm mail-only authentication stack

This repository holds a very basic implementation of (medium-like) authentication based on 
* [type-graphql](https://github.com/19majkel94/type-graphql)
* [typeorm](https://github.com/typeorm/typeorm)
* docker

# Warning
Currently, this stack has a security issue. 
Read: https://github.com/19majkel94/type-graphql/issues/230
Unfortunatly, I am unable to fix that for now.
The underlaying problem will be resolved with the next type-graphql major version.

# Install
Install [docker](https://www.docker.com/) on your machine.

Run in your cli:
```bash
$ cd typegraphql-typeorm-auth

# downloads docker images and installs npm packages inside backend container
$ docker-compose build 

# run it
$ docker-compose up    

# optional:
# install packages locally to enable lint and package autocompletion in vs code
$ cd backend 
$ npm install   
           
```

visit [localhost/api/playground](http://localhost/api/playground)

## Prepare grapql playground
* click on the settings icon top-right in playground and set ``` "request.credentials": "same-origin",```
* otherwise session cookies are not sent to the api

# Usage
Run the following sequence of graphql queries and mutations to test:

First, we make sure that we **don't** have access to creating a todo:
```javascript
mutation{
    createTodo(text:"foo")
}
```
this should output: `"message": "accessDenied"`. Next, we create an account or request login to an already existing account by:
 
```javascript
mutation{
    requestSignIn(user:{email:"test@test.com"})
}
```
look at your consol. You should see an output like:
```bash
backend_1  | sign in using this token:
backend_1  | 55dd4e34-b3ca-4da2-8edc-db5064ad9079
```
in production, the printed token is sent to the user via email. Run the following for a test sign-in

```javascript
mutation{
    signIn(token:"55dd4e34-b3ca-4da2-8edc-db5064ad9079")
}
```
The server replies with a cookie. You can test the login status with:
```
query{
  loggedinUser{email}
}
```
or simply create a todo again;
```javascript
mutation{
    createTodo(text:"foo")
}
```
followed by listing all todos of the logged-in user:
```javascript
query{
    todos{text}
}
```
# Connecting a frontend
Check out [react-yoga-mongo-nginx-docker](https://github.com/breytex/react-yoga-mongo-nginx-docker) to see how to connect a frontend container (with react) to the stack.