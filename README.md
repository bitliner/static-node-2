# static-node-2
Docker image of nodejs app to host static sites

## Usage with docker-compose

1. Create a fig.yml or docker-compose.yml (install docker-compose if you did not do it yet)
2. Set ports parameter specifying the port to bind to port 80 of the container
3. specify volumens, specifically folder for logs and folder containing static file 


```
frontend:
  image: bitliner/static-node-2
  mem_limit: 512m
  ports:
    - 9001:80
  volumes:
    - ./public:/usr/src/app/dist
    - ./logs:/usr/src/app/logs

```


