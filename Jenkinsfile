pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        catchError() {
          dir('tests/E2E/cypress/') {
            nodejs('nodejs') {
              sh 'yarn install'
            }
          }
          nodejs('nodejs') {
            sh 'yarn run fixmodulenotdefined'
            sh 'yarn setup'
          }
        }
      }
    }

    stage('E2E Cypress') {
      when {
        expression {
          params.ENABLE_E2E_CYPRESS 
        }
      }
      steps {
        warnError(message: 'Oops, someone broke something') {
          nodejs('nodejs') {
            script {
              if ( params.UPDATE_SNAPSHOTS ) {
                sh "yarn run cy:ciupdate"
              } else {
                sh "yarn run cy:ci"
              }
            }
            
          }
        }

      }
      post {
        always {
          dir('tests/E2E/cypress/') {
            archiveArtifacts artifacts: 'cypress/snapshots/**/*.diff.png', fingerprint: true
            junit 'cypress/results/**/*.xml'
          }
        }
      }
    }

    stage('E2E Puppeteer') {
      when {
        expression {
          params.ENABLE_E2E_PUPPETEER
        }
      }
      steps {
        warnError(message: 'Oops, someone broke something') {
          nodejs('nodejs') {
            script {
                sh "yarn run pu:ci"
            }
          }
        }
      }
    }

    stage('Random Cypress') {
      when {
        expression {
          params.ENABLE_RANDOM_TESTING
        }
      }
      steps {
        warnError(message: 'Error running cypress random') {
          nodejs('nodejs') {
            sh 'yarn run cypress run -P ./tests/E2E/cypress/ ./tests/Random/Cypress/'
          }

        }

      }
    }

  }
  parameters {
    booleanParam(name: 'ENABLE_E2E_CYPRESS', defaultValue: true, description: 'Enable E2E testing with cypress')
    booleanParam(name: 'ENABLE_E2E_PUPPETEER', defaultValue: true, description: 'Enable E2E testing with puppeteer')
    booleanParam(name: 'ENABLE_RANDOM_TESTING', defaultValue: true, description: 'Enable random testing testing')
    booleanParam(name: 'ENABLE_VRT', defaultValue: true, description: 'Enable visual regression testing (VRT)')
    booleanParam(name: 'UPDATE_SNAPSHOTS', defaultValue: false, description: 'Should update VRT snapshots')
    booleanParam(name: 'HEADLESS', defaultValue: true, description: 'Enable headless testing')
  }
}