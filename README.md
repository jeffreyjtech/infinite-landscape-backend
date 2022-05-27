
# ***Infinite Landscape***
---------------------------------

---------------------------------
## We are deployed on Heroku!!

[Deployed](https://guarded-peak-17951.herokuapp.com/api-docs)

---------------------------------
## Web Application
***[Explain your app, should be at least a paragraph. What does it do? Why should I use? Sell your product!]***


---------------------------------

## Tools Used
- VSCode
-   "dependencies": {
    "base-64": "^1.0.0",
    "bcrypt": "^5.0.1",
    "cors": "^2.8.5",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "jest": "^28.1.0",
    "jsonwebtoken": "^8.5.1",
    "pg": "^8.7.3",
    "sequelize": "^6.20.0",
    "sequelize-cli": "^6.4.1",
    "supertest": "^6.2.3",
    "swagger-ui-express": "^4.4.0"
  }
---------------------------------

## Recent Updates

#### V 1.0
- deployment 5/27

---------------------------

## Getting Started

Clone this repository to your local machine.
```
$ git clone https://github.com/YourRepo/YourProject.git
```
```
```

Run testing suites with NPM test

---------------------------------

## Usage
[Click me!](https://guarded-peak-17951.herokuapp.com/api-docs)
---------------------------
## Data Flow (Frontend, Backend, REST API)
***[Add a clean and clear explanation of what the data flow is. Walk me through it.]***
![Data Flow Diagram](/assets/img/Flowchart.png)

---------------------------
## Data Model

### Overall Project Schema
***[Add a description of your DB schema. Explain the relationships to me.]***
![Database Schema](/assets/img/ERD.png)

---------------------------
## Model Properties and Requirements

### Adjacencies

| Parameter | Type | Required |
| --- | --- | --- |
| ID  | int | YES |
| StoryId | int | YES |
| neighbors | list | YES |

### User

| Parameter | Type | Required |
| --- | --- | --- |
| ID  | int | YES |
| UserName | string | YES |
| History | list | YES |
| Favorites | list | YES |
| Contributions | list | YES |

### Story

| Parameter | Type | Required |
| --- | --- | --- |
| ID  | int | YES |
| Label | string | YES |
| UserName | string | YES |
| PeName | string | YES |
| Description | string | YES |
| Group | list | YES |
| Color | string | YES |
| Tooltips | list | YES |
| Neighbors | list | YES |

---------------------------

## Change Log
1.0: Product Launch

------------------------------

## Authors
Tanner Percival,
Brady Camp,
Micha Davis,
Jeffrey Jenkins

------------------------------



### Routes

<!-- Route documentation goes here -->

#### `/routeA`

<!-- Sample for an endpoint below. Refer to sample-README.md for more -->
<!-- - GET : `/magikarp[/:id]`
  - Parameters
    - Optional: an `id` param will specify a single record to return.
  - Response
    - status `200`, and a JSON body which is an array of all records in the table if `id` **is not** present, or a single record if `id` **is** present.
      - body: `{ // refer to schema }`
    - status `500`, `id` param is invalid. -->

### Schemas

