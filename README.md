# mastering-mean
Course MEAN Web Development - Second Edition by Amos Q. Haviv

## For Windowns
```
> set NODE_ENV=development
```

## For Linux/Mac OSX
```
$ export NODE_ENV=development
```

## Make sure that mongo instance are up and runnning. If not:
```
$ mongodb
```

## Then, to run the app:
```
$ npm install
$ node server
```

## Test a CRUD
### Create
Perform an HTTP POST request to the base _users_ route with the following example of JSON:

```
{
  "firstName": "First",
  "lastName": "Last",
  "email": "user@example.com",
  "username": "username",
  "password": "password"
}
```

Another way to test through CLI

```
$ curl -X POST -H "Content-Type: application/json" -d '{"firstName":"First", "lastName":"Last","email":"user@example.com","username":"username","password":"password"}' localhost:4040/users
```

### Read
To retrieve all the users:

```
http://localhost:4040/users
```

To retrieve only one user:

```
http://localhost:4040/users/:userId
```