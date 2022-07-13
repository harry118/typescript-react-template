FROM nginx:latest 
LABEL maintainer="junxuan <issavior@163.com>"

ADD  ./dist/ /usr/share/nginx/html
ADD nginx.conf /etc/nginx/
EXPOSE 80