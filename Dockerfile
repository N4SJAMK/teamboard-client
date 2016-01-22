FROM ubuntu

MAINTAINER n4sjamk

############################################
# Can't combine two base images so have to
# combine them manually
############################################
# Taken from dockerfile/nginx

# Install Python.
RUN \
  apt-get update && \
  apt-get install -y python python-dev python-pip python-virtualenv software-properties-common wget npm && \
  rm -rf /var/lib/apt/lists/*
  
# Define working directory.
WORKDIR /data

# Define default command.
CMD ["bash"]

# Install Nginx.
RUN \
  add-apt-repository -y ppa:nginx/stable && \
  apt-get update && \
  apt-get install -y nginx && \
  rm -rf /var/lib/apt/lists/* && \
  echo "\ndaemon off;" >> /etc/nginx/nginx.conf && \
  chown -R www-data:www-data /var/lib/nginx

# Define mountable directories.
VOLUME ["/etc/nginx/sites-enabled", "/etc/nginx/certs", "/etc/nginx/conf.d", "/var/log/nginx"]

# Define working directory.
WORKDIR /etc/nginx

# Expose ports.
EXPOSE 80
EXPOSE 443

#############################################
# Taken from dockerfile/nodejs

RUN \
  cd /tmp && \
  wget http://nodejs.org/dist/node-latest.tar.gz && \
  tar xvzf node-latest.tar.gz && \
  rm -f node-latest.tar.gz && \
  cd node-v* && \
  ./configure && \
  CXX="g++ -Wno-unused-local-typedefs" make && \
  CXX="g++ -Wno-unused-local-typedefs" make install && \
  cd /tmp && \
  rm -rf /tmp/node-v* && \
  echo '\n# Node.js\nexport PATH="node_modules/.bin:$PATH"' >> /root/.bashrc

# Define working directory.
WORKDIR /data

##############################################
# Install teamboard-client

RUN ["useradd", "-m", "teamboard"]

ADD . /home/teamboard/teamboard-client
RUN ["chown", "-R", "teamboard:teamboard", "/home/teamboard/teamboard-client"]

RUN apt-get update && \
	apt-get install -y ruby && \
	gem install sass

RUN echo "\
server {\n\
        listen 80 default_server;\n\
\n\
        root /home/teamboard/teamboard-client/dist;\n\
        index index.html;\n\
\n\
        server_name localhost;\n\
\n\
        location / {\n\
                try_files \$uri /index.html;\n\
        }\n\
}" > /etc/nginx/sites-enabled/default

RUN npm install -g bower

USER teamboard
WORKDIR /home/teamboard/teamboard-client
ENV HOME /home/teamboard/

RUN npm install
RUN bower install

USER root
CMD cd /home/teamboard/teamboard-client && \
	sudo -u teamboard -E ./node_modules/.bin/gulp build && \
	nginx
