pipeline {
  agent any
  stages {
    stage('PR Voting') {
      parallel {
        stage('Checkmarx') {
          steps {
            echo 'CheckStyling Done'
          }
        }

        stage('Local Build (With Tests/Checkstyle)') {
          steps {
            echo 'Built Locally'
          }
        }

        stage('Fortify') {
          steps {
            echo 'fdsd'
          }
        }

        stage('Open Source Vulnerabity(FOSS)') {
          steps {
            echo 'fdefew'
          }
        }

        stage('PPMS') {
          steps {
            echo 'frewferw'
          }
        }

        stage('whitesource') {
          steps {
            echo 'ferwfre'
            echo 'ferfwr'
          }
        }

      }
    }

  }
}