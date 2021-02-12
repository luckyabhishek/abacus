pipeline {
  agent any
  stages {
    stage('Pre-Production BG Deploy') {
      steps {
        echo 'CheckStyling Done'
      }
    }

    stage('Smoke Test') {
      steps {
        echo 'Unit Test Done'
      }
    }

    stage('Pre-Production (Confirm BG)') {
      steps {
        echo 'Verified Central Build'
      }
    }

    stage('Production (BG Deploy)') {
      steps {
        echo 'APIs Tested'
      }
    }

  }
}