FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app
ENV NODE_OPTIONS=--max-old-space-size=8192
COPY . .

# Install project dependencies
RUN yarn install --frozen-lockfile

RUN yarn prisma:user:generate
RUN yarn build


# Expose the port your Nest.js application is listening on
EXPOSE 3000

# Command to start your Nest.js application
CMD [ "npm", "run", "start:prod" ]
