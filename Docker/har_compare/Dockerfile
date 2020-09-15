FROM node:12


RUN git clone https://github.com/sitespeedio/compare.git

WORKDIR /compare

RUN  npm install gulp-sass
RUN  npm install
RUN  npm run build

RUN  npm install -g http-server

WORKDIR build

EXPOSE 8000

CMD ["http-server", "-p", "8000"]

