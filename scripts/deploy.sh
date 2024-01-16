docker build -t hsh .
docker run -p 8005:3000 --restart=unless-stopped --name index -d hsh
