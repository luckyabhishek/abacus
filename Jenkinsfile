pipeline {
  agent any
  stages {
    stage('Production Deployments') {
      parallel {
        stage('EU10') {
          steps {
            echo 'deploying'
          }
        }

        stage('US10') {
          steps {
            echo 'deployed'
          }
        }

        stage('EU20') {
          steps {
            echo 'deployed'
          }
        }

      }
    }

  }
}