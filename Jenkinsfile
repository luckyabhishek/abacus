pipeline {
  agent any
  stages {
    stage('Sanity Checks') {
      parallel {
        stage('CheckStyle') {
          steps {
            echo 'CheckStyling Done'
          }
        }

        stage('Local Build') {
          steps {
            echo 'Built Locally'
          }
        }

        stage('Sonar Scan (Code Quality)') {
          steps {
            echo 'Done Sonar Scan'
          }
        }

      }
    }

    stage('Sanity Tests') {
      parallel {
        stage('Unit Tests') {
          steps {
            echo 'Unit Test Done'
          }
        }

        stage('Integration Tests ') {
          steps {
            echo 'Optional If we have dependencies'
          }
        }

      }
    }

    stage('PR Voting') {
      steps {
        echo 'Verified Central Build'
      }
    }

  }
}