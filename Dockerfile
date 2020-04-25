FROM node:13.12.0-alpine As builder
LABEL proejct="Safe-Paths React"
LABEL maintainer="sherif@extremesolution.com"
# setting working dir
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install app dependencies
ADD . $WORKDIR
RUN yarn install
RUN yarn run build

FROM node:13.12.0-alpine
# setting working dir
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
COPY --from=builder /app .
RUN touch .env
CMD ["yarn", "start"]
