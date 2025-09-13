echo "************** Pulling from master ***************"
cd ~/lwm/LWM-LMS || exit
git checkout master
git pull
echo "************** Starting Build ***************"
sudo docker compose down
sudo docker build
echo "************** Finished Build ***************"
sudo docker up
echo "************** Docker started ***************"