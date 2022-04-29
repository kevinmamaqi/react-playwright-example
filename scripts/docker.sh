#!/bin/bash
source utils.sh
ENV_FILE=$(git_root)/.env
loadEnv "$ENV_FILE"
APP_IMAGE=app-image-react-gql-api/v1
APP_CONTAINER=app-container-react-gql-api
TEST_IMAGE=test-image-react-gql-api/v1
TEST_CONTAINER=test-container-react-gql-api
NETWORK=react-query-graphql

buildImagesAndNetwork() {
    docker network inspect $NETWORK >/dev/null 2>&1 ||
        docker network create --driver bridge $NETWORK
    cd $(git_root)/app && docker build -t $APP_IMAGE .
    cd $(git_root)/e2e && docker build -t $TEST_IMAGE .
}

launchApp() {
    echo "Preparing App ..."
    docker run -it -d --rm \
        --name $APP_CONTAINER \
        --network $NETWORK \
        -p 7500:3000 \
        $APP_IMAGE
}

launchTest() {
    echo "Starting Test ..."
    buildImagesAndNetwork
    launchApp
    docker run -it -d --rm \
        --name $TEST_CONTAINER \
        --network $NETWORK \
        -v $(git_root)/e2e/tests:/e2e/tests \
        -v $(git_root)/e2e/package.json:/e2e/package.json \
        -v $(git_root)/e2e/package-lock.json:/e2e/package-lock.json \
        -v $(git_root)/.env:/e2e/.env \
        -e VITE_APP_URL=http://host.docker.internal:7500 \
        $TEST_IMAGE
}

stopApp() {
    docker stop $APP_CONTAINER -t 10
}

stopTest() {
    docker stop $TEST_CONTAINER -t 10
}

stopDocker() {
    stopApp
    stopTest
}
