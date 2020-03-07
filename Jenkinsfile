pipeline {
  agent any
  stages {
    stage('Build and run') {
      steps {
        catchError() {
          nodejs('nodejs') {
            sh 'yarn setup'
            sh 'yarn add cypress --dev'
            sh 'grunt dev & wait-on http://localhost:4200'
          }

        }

      }
    }

    stage('E2E Cypress') {
      steps {
        warnError(message: 'Oops, someone broke something') {
          nodejs('nodejs') {
            sh 'yarn run cypress run -P ./tests/E2E/cypress/ ./tests/E2E/cypress/'
          }

        }

      }
    }

    stage('Random Cypress') {
      steps {
        warnError(message: 'Error running cypress random') {
          nodejs('nodejs') {
            sh 'yarn run cypress run -P ./tests/E2E/cypress/ ./tests/Random/Cypress/'
          }

        }

      }
    }

  }
}