This repository contains the code for the todo app.

### Backend
Backend is built with NestJS and uses MySQL as the database.

### Frontend
Frontend is built with Vue.js.

Instruction for building and running can be found in README file in respective folders.

# Deployment
Deploy this application in a single EC2 machine, using `docker-compose`
* Backend is to be run as node process in a docker
* MySQL database required for backend is to be run under separate docker
* Frontend is to be first "built" for production and then to be served as static files through nginx in seperate docker
* DB configuration is to be provided to backend server through env variable

Here is the indicative deployment architecture diagram:

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
#### Optional Tasks
* Access Logs from Nginx, Error logs of MySQL and console log of backend to be streamed to CloudWatch
