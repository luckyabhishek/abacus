pipeline {
  agent any
  stages {
    stage('Central Build') {
      steps {
        echo 'CheckStyling Done'
      }
    }

    stage('Unit Tests') {
      steps {
        echo 'Unit Test Done'
      }
    }

    stage('Integration (BG Deploy)') {
      steps {
        echo 'Verified Central Build'
      }
    }

    stage('API Tests') {
      steps {
        echo 'APIs Tested'
      }
    }

    stage('Security/Code Quality') {
      parallel {
        stage('CheckMarx') {
          steps {
            echo 'Fortified'
          }
        }

        stage('Fortify') {
          steps {
            echo 'IP Scan Done'
          }
        }

        stage('Open Source Vulnerability') {
          steps {
            echo 'Vulas Done'
          }
        }

        stage('PPMS') {
          steps {
            echo 'Sonar Done'
          }
        }

        stage('Whitesource') {
          steps {
            echo 'Fossed'
          }
        }

      }
    }

    stage('Integration (Confirm BG)') {
      steps {
        echo 'Confirmed BG'
      }
    }

    stage('Acceptance (BG Deploy)') {
      parallel {
        stage('Acceptance (BG Deploy)') {
          steps {
            echo 'Deployed to Acceptance'
          }
        }

        stage('Performance (BG Deploy)') {
          steps {
            echo 'Deployed to Performance'
          }
        }

      }
    }

    stage('Tests') {
      parallel {
        stage('E2E Tests') {
          steps {
            echo 'E2E Tests'
          }
        }

        stage('API Performance Tests') {
          steps {
            echo 'Performance Tested APIs'
          }
        }

        stage('Contract Tests') {
          steps {
            echo 'Contracts Tested'
          }
        }

      }
    }

    stage('Acceptance(Confirm BG)') {
      parallel {
        stage('Acceptance(Confirm BG)') {
          steps {
            echo 'Promoted'
          }
        }

        stage('Performance (Confirm BG)') {
          steps {
            echo 'fdfd'
          }
        }

      }
    }

    stage('Promote') {
      steps {
        echo 'Released'
      }
    }

    stage('Release') {
      steps {
        echo 'fsd'
      }
    }

  }
}