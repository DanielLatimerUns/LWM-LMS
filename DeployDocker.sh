echo "************** Pulling latest ***************"
git checkout master || exit
git pull || exit

echo "************** Starting Build ***************"
docker compose down || exit
docker compose build || exit

"************** Spinning up containers ***************"
docker compose up -d
