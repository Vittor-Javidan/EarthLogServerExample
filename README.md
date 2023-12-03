# Follow these simple steps to start the example server:

- install nodeJS and remember to install npm during node install process https://nodejs.org/

- Open a terminal inside the repo folder and run the command "npm install" to install all dependencies.

- run the "npx tsc" command to build the server files.

- to define the desired lts server version, just change the lts version number on "start" script inside package.json file.

  Examples:

```
  "scripts": {
    "start": "node dist/LTS_VERSION_1/index.js",
    ...
  }
  
  or

  "scripts": {
    "start": "node dist/LTS_VERSION_2/index.js",
    ...
  }

```

  etc..

- start the server: "npx start"

- Find your pc ipv4 address. On windows just run the command "ipconfig" and get the ipv4 from Wifi adapter.

- Inside the EarthLog app create a new credential, and add the url "http://<Your_IPV4_address>:6969". You don't need to set name and password in this test.

- Done! you have your own server ready to upload/download/sync projects and pictures.

OBS: This repository was tested using nodeJS v18.18.0, but there is no reason to not work on most recent releases.