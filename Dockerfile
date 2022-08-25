FROM node:14-alpine
WORKDIR /app
# COPY package.json ./
# COPY package-lock.json ./

# copy everything to the container
COPY ./ ./ 
# ARG REACT_APP_ENCRYPTION_KEY
# ARG REACT_APP_BASE_URL
# ARG REACT_APP_API_BASE
# ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL
# ENV REACT_APP_API_BASE=$REACT_APP_API_BASE
RUN npm i
RUN npm run build
# Default command to run when starting the container
CMD ["npm", "run", "start"]