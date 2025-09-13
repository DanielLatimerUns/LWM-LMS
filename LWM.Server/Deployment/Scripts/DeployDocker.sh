echo "************** Pulling from master ***************"
cd ~/lwm/LWM-LMS || exit
git checkout master
git pull
echo "************** Starting Build ***************"
docker compose down
docker build
"************** Finished Build ***************"
docker up
"************** Docker started ***************"