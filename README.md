# Gareth Dashboard

## Run the dashboard locally:

* Git clone,
* Open terminal and go to the cloned directory,
* Type *NPM install*
* Type *bower install*

After all is installed you can get the server up and running by typing *grunt serve*
The dashboard will be visible @ http://localhost:9000/

## Starting the Docker container

```
docker run -d -p 8765:8765 --env GARETH_BACKEND_URL=http://gareth.backend.com craftsmenlabs/gareth_dashboard
```

## Sample data
In the public/data/experimentruns are a couple of examples of runs which contain different statuses: error, finished, open, running and non_existent. You can play with those to see different outcomes in the dashboard.

## Testing

Running `grunt test` will run the unit tests with karma.

# Licences

```
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
```

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.
