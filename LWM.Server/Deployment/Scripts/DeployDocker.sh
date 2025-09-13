echo "************** Pulling from master ***************"
#cd ~/lwm/LWM-LMS || exit
git checkout master || exit
git pull || exit
echo "************** Starting Build ***************"
docker compose down || exit
docker compose build || exit
"************** Finished Build ***************"
docker compose up
"************** Docker started ***************"