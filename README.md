This is deployment guide for the todo app.

## Prerequisites

- Docker
- Docker Compose
- Node.js
- MySQL

```mermaid
graph TB
    client(Browser) --> nginx
    
    subgraph docker[Docker Environment]
        subgraph frontend[Frontend Container]
            nginx[Nginx 80] --> vue[Vue.js Static Files]
        end
        
        subgraph backend[Backend Container]
            api[Node.js API 3000]
        end
        
        subgraph db[Database Container]
            postgres[MySQL 3128]
        end
    end
    
    nginx -->|/api/* requests| api
    api -->|DB queries| postgres
```

This repository contains the code for the todo app.

## Backend

Backend is built with NestJS and uses MySQL as the database.

### Database

MySQL is used as the database.

## Frontend

Frontend is built with Vue.js

README.md in respective folders has details about the setup and deployment.
