# Follow these simple steps to create a demo local server:


- install nodeJS and remember to install npm during node install process https://nodejs.org/

- download this repository by clicking on "Code" > "Download Zip".

- Extract the files into a folder.

- Open a terminal inside the main repository folder (Where is located the package.json file) and run the command "npm install" to install all dependencies.

- run the "npx tsc" command on terminal to build the server files.

- start the server with the command `npm run V1` for example, or `npm run V<number of the lts version>` to select the desired version.

- Find your pc IPV4 wifi address. On windows just run the command `ipconfig` and get the ipv4 from Wifi adapter.

- Inside the EarthLog app create a new credential, and add the url `http://<Your_IPV4_address>:6969`. You don't need to set name and password in this test since you running locally.

- Done! you have your own server ready to upload/download/sync projects and pictures.

OBS:
  - This repository was tested using nodeJS v18.18.0, but there is no reason to not work on most recent releases.
