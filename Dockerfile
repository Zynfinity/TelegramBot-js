FROM nikolaik/python-nodejs:latest

RUN apt update -y
RUN apt upgrade -y
RUN apt-get install -y --no-install-recommends \
  ffmpeg \
  sudo \
  imagemagick
RUN pip install pillow
RUN npm install -g npm@latest
WORKDIR /home/frmdev/frmdev
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "index.js"]
