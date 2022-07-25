# <p align = "center"> Projeto Repoprovas </p>

<p align="center">
   <img width="200px" src="https://user-images.githubusercontent.com/98065049/180673463-fb95f793-bc85-428b-8972-51b4f4c790cd.png" />
</p>

##  :clipboard: Description
um sistema de compartilhamento de provas entre estudantes!

This is an API for sharing tests between students. In RepoProvas, anyone can search for old tests of their subjects and teachers or send old tests to help freshmen

## :computer:	 Technologies

<p>
   <img style='margin: 5px;' src='https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white'>
   <img style='margin: 5px;' src='https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white'>
   <img style='margin: 5px;' src='https://img.shields.io/badge/Express.js-404D59?style=for-the-badge'>
   <img style='margin: 5px;' src='https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white'>
   <img style='margin: 5px;' src='https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white'>
   </br>
   <img style='margin: 5px;' src='https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white'>
   <img style='margin: 5px;' src='https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white'>
   <img style='margin: 5px;' src='https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white'>
   <img style='margin: 5px;' src='https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white'>
   <img style='margin: 5px;' src='https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E'>
</p>

## :rocket: Routes

- [Authentication](#authentication)
- [Tests](#tests)
- [Categories](#categories)



### Authentication 

#### Sign-up

```yml
POST /sign-up
    - Route to register a new user
    - headers: {}
    - body:{
      "email": "lorem@gmail.com",
      "password": "loremipsum",
      "confirmPassword": "loremipsum"
      }
```

#### Sign-in
    
```yml 
POST /sign-in
    - Route to login with credentials
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
    "password": "loremipsum"
    }
```

```yml
GET /sign-in/github
    - Route to login with github account
    - headers: {}
    - body: {}
```

### Tests

#### Create (authenticated)
    
```yml 
POST /tests
    - Route to register a new test
    - headers: { "Authorization": "Bearer $token" }
    - body: {
    "name": "lorem",
    "pdfUrl": "https://link",
    "category": "p1",
    "discipline": "math",
    "teacher": "name"
    }
```

#### Read (authenticated)

```yml
GET /tests?groupBy=
    - Route to list all tests, must have groupBy query to work (groupBy=teachers) or (groupBy=disciplines)
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

### Categories

#### Read (authenticated)
    
```yml
GET /categories
    - Route to list all tests categories
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 
