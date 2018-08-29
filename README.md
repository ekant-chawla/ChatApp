# ChatApp
ChatApplication with Mongo Express Node Angular  

Note : If you change any of the defaults, update the corresponding config files.

# node_module
Before running the app run "npm install" in both the frontend and backend folder to install necessary npm modules.

# Front-end
To initiate angular app you need to use proxy config. The proxy-config.json is already provided in the frontend app with port 3000.Change it to what ever is your server's port address.
The command to be used is 

ng serve --proxy-config proxy-config.json

# Back-end
To initiate backend simply run the app.js

Note: TO SEND EMAIL YOU MAY NEED TO DISABLE YOUR ANTIVIRUS AS MAILS ARE SENT THOUGH A GMAIL ACCOUNT.

node app.js

# Mongodb Server
Run a mongodb server by running the following command. The default port for the db server is 27017.


# API and Event documentations
The api and socket-io event docs are in respective doc folders. 
