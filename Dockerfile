FROM node:6.9.1

RUN         apt-get update && apt-get install -y build-essential python libstdc++6

# Create app directory
RUN         mkdir -p /usr/src/app
WORKDIR     /usr/src/app

# Install app dependencies
ADD         package.json                /usr/src/app/
RUN         npm install
ENV         PORT                        8080

# Bundle app source
ADD         .                           /usr/src/app
EXPOSE      8080
CMD         [ "npm", "start"]
