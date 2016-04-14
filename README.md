# gareth-dashboard

## Run the dashboard locally:

* Git clone,
* Open terminal and go to the cloned directory,
* Type *NPM install*

After all is installed you can get the server up and running by typing *node server.js*
The dashboard will be visible @ http://localhost:8765/

## Starting the Docker container

```
docker run -d -p 8765:8765 --env GARETH_BACKEND_URL=http://gareth.backend.com craftsmenlabs/gareth_dashboard
```

## Sample data
In the public/data/experimentruns are a couple of examples of runs which contain different statuses: error, finished, open, running and non_existent. You can play with those to see different outcomes in the dashboard.
