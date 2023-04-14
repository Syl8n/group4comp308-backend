pipeline {
  agent none
  environment {
    GIT_ID = '376d87d3-5d76-42bd-b654-4c094cb91809'
    REPO = 'https://github.com/group4comp308/group4comp308-backend.git'
    BRANCH = 'main'
    IMAGE = 'group4comp308-backend'
    CONTAINER = 'group4comp308-backend'
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
            error 'fail: check out'
          }
        }
      }
  // stage('build') {
  //   agent {
  //     dockerfile{
  //       additionalBuildArgs  '--build-arg version=1.0.2'
  //     }
  //   }
  //   steps {
  //     echo 'build stage'
  //   }
  //   post {
  //     success {
  //       echo 'success: build'
  //     }
  //     failure {
  //       error 'fail: build'
  //     }
  //   }
  // }
  }
}
