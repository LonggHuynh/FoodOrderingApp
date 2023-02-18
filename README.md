# Description

Food ordering app, with multiple restaurants. Users can create a restaurant and adding dish in responding restaurant. 
## Tech stack

- NodeJS/Express
- Postgres
- Javascript
- ReactJS (Hooks, Routers, Redux)
- HTML/CSS/TailwindCSS




# Run locally
## Front end 
```
cd front-end
npm ci
npm start
```
### Enviroment variables

| Variable Name           | Description                                                                                                 |
|-------------------------|-------------------------------------------------------------------------------------------------------------|
| REACT_APP_SERVER_URL            | URL of the backend |

## Back end 
You first need to set up the database server using schema.sql, then use the connection string to set the CONNECTIONSTRING variable.
### Enviroment variables.

| Variable Name           | Description                                                                                                 |
|-------------------------|-------------------------------------------------------------------------------------------------------------|
| CONNECTIONSTRING            | Connection string of POSTGRES SQL. |
| CREDS            | Service account of Firebase server. |

Be aware that you need to enable your traffic in the Security Settings of your Google Firebase project.

```
cd front-end
npm ci
npm start
```


## Using Docker
Alternatively you can use Docker to run the application. This approach is simpler, but the application still needs your service account from Firebase.

### Enviroment variables.
| Variable Name           | Description                                                                                                 |
|-------------------------|-------------------------------------------------------------------------------------------------------------|
| PG_PASSWORD            | Password of for the PostgresSQL server (You can set whatever here as long as it is longer than 6 characters) |
| CREDS                     | Service account of Firebase server |


To start, use
```
docker compose up
```
Then web application is avaible at port 3000

To clean up after using, use
```
docker compose down --remove-orphans -v
```


# Bussiness model
![plot](./model.png)
