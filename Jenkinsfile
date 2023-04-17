pipeline {
  agent none
  environment {
    GIT_ID = 'github'
    REPO = 'https://github.com/group4comp308/group4comp308-backend.git'
    BRANCH = 'main'
    PROJECT_NAME = 'group4comp308-backend'
    VERSION_ID = '0'
    DOCKERHUB_ID = credentials('dockerhub-id')
    IMAGE_NAME = "${DOCKERHUB_ID}/${PROJECT_NAME}"
    IMAGE_TAG = "${VERSION_ID}.${BUILD_NUMBER}"
    SERVER_HOST = credentials('server-host')
  }
  stages {
      stage('check out') {
        agent any
        steps {
          echo 'checking out...'
          git url: "$REPO",
              branch: "$BRANCH",
              credentialsId: "$GIT_ID"
          sh 'ls -al'
        }
        post {
          success {
            echo 'success: check out'
          }
          failure {
            error 'failure: check out'
          }
        }
      }
    stage('build') {
      agent any
      steps {
        echo 'building image...'
        sh 'docker build . -t $IMAGE_NAME:$IMAGE_TAG'
      }
      post {
        success {
          echo 'success: build'
        }
        failure {
          error 'failure: build'
        }
      }
    }
    stage('push') {
      agent any
      steps {
        echo 'pushing image...'
        withCredentials([string(credentialsId: 'dockerhub', variable: 'dockerhubPwd')]) {
          sh 'echo $dockerhubPwd | docker login -u $DOCKERHUB_ID --password-stdin'
        }
        sh 'docker push $IMAGE_NAME:$IMAGE_TAG'
      }
      post {
        success {
          sh 'docker rmi $IMAGE_NAME:$IMAGE_TAG'
          echo 'success: push'
        }
        failure {
          error 'failure: push'
        }
      }
    }
    stage('pull') {
      agent any
      steps {
        echo 'pulling image...'
        sshagent(['server']) {
            sh 'ssh -o StrictHostKeyChecking=no $SERVER_HOST mkdir -p $PROJECT_NAME'
            sh 'ssh -o StrictHostKeyChecking=no $SERVER_HOST docker pull $IMAGE_NAME:$IMAGE_TAG'
        }
      }
      post {
        success {
          echo 'success: pull'
        }
        failure {
          error 'failure: pull'
        }
      }
    }
    stage('clean') {
      agent any
      steps {
        echo 'cleaning container...'
        sshagent(['server']) {
            sh 'ssh -o StrictHostKeyChecking=no $SERVER_HOST "docker rm -f ${PROJECT_NAME} || true"'
        }
      }
      post {
        success {
          echo 'success: clean'
        }
        failure {
          error 'failure: clean'
        }
      }
    }
    stage('deploy') {
      agent any
      steps {
        echo 'running container...'
        sshagent(['server']) {
            echo '$IMAGE'
            sh 'ssh -o StrictHostKeyChecking=no $SERVER_HOST docker run -d --name $PROJECT_NAME --env-file $PROJECT_NAME/env.list -p 4000:4000 $IMAGE_NAME:$IMAGE_TAG'
        }
      }
      post {
        success {
          echo 'success: deploy'
        }
        failure {
          error 'failure: deploy'
        }
      }
    }
  }
}