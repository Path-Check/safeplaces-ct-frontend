# Before building this image run prepare.sh

FROM alpine:3.7

# configure test environment
ARG home=/tests
RUN mkdir ${home}
ARG datadir=${home}/data
WORKDIR ${home}
ENV HOME_DIR=${home}
ENV TMP_DIR=/tmp
ENV DATA_DIR=$datadir
ENV BASE_URL=https://safeplaces.extremesolution.com/

# install python
RUN apk add python3 pytest py-pip
RUN pip3 install --upgrade pip
RUN pip3 install -U selenium

#install test code
ADD data ${datadir}
ADD ui_test.py ${home}/ui_test.py
ADD page_objects.py ${home}/page_objects.py
WORKDIR ${home}
CMD pytest
