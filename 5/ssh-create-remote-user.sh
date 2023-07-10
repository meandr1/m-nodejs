#!/bin/bash
ROOT=$1
HOST=$2
USER=$3
KEY=$4
ssh -t -i /users/andrei/am_key $ROOT@$HOST "echo 12345 | sudo -S adduser $USER &&
sudo usermod -aG sudo $USER &&
sudo passwd -d $USER &&
sudo mkdir -p /home/$USER/.ssh &&
sudo touch /home/$USER/.ssh/authorized_keys &&
sudo chmod 775 /home/$USER/.ssh/authorized_keys &&
sudo chown -R $USER:$USER /home/${USER}/.ssh &&
su -c 'echo $KEY | cat >> ~/.ssh/authorized_keys' - $USER &&
sudo chmod 644 /home/$USER/.ssh/authorized_keys"