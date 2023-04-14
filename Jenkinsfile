pipeline {
  agent none
  environment {
    GIT_ID = 'github'
    REPO = 'https://github.com/group4comp308/group4comp308-backend.git'
    BRANCH = 'main'
    IMAGE = 'group4comp308-backend'
    VERSION_ID = '0'
    DOCKERHUB_ID = 'yaaloo'
  }
  stages {
      stage('init') {
        agent any
        steps {
          echo "Build id: $BUILD_ID"
          echo "Build number: $BUILD_NUMBER"
        }
      }
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
      // dockerfile {
      //   additionalBuildArgs '--build-arg version=' + VERSION_ID + '.' + BUILD_NUMBER
      // }
      steps {
        echo 'build stage'
        docker.build "${DOCKERHUB_ID}/${IMAGE}:${VERSION_ID}.${BUILD_NUMBER}"
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
        withCredentials([string(credentialsId: 'dockerhub', variable: 'dockerhubPwd')]) {
          sh "docker login -u ${DOCKERHUB_ID} -p ${dockerhubPwd}"
        }
        sh 'docker push $DOCKERHUB_ID/$IMAGE:$VERSION_ID.$BUILD_NUMBER'
      }
      post {
        success {
          echo 'success: push'
        }
        failure {
          error 'failure: push'
        }
      }
    }
  }
}

