#!/bin/bash

export
# any future command that fails will exit the script.
set -e

# Delete the old repo
rm -rf /home/ubuntu/blog/

# clone the repo again
# git clone https://"$GIT_USERNAME":"$GIT_PASSWORD"@gitlab.com/emmsdan/blog.git

$Gitclone


#source the nvm file. In an non
#If you are not using nvm, add the actual path like
PATH=/home/ubuntu/node/bin:$PATH
# source /home/ubuntu/.nvm/nvm.sh

# stop the previous pm2
npm remove pm2 -g

#pm2 needs to be installed globally as we would be deleting the repo folder.
# this needs to be done only once as a setup script.
npm install pm2 -g
# starting pm2 daemon
pm2 status

cd /home/ubuntu/blog

#install npm packages
echo "Running npm install"
npm install

#Restart the node server
echo "Running npm start"
npm start
