pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        catchError() {
          nodejs('nodejs') {
            sh 'yarn setup'
            sh 'yarn add cypress --dev'
          }

        }

      }
    }

    stage('E2E Cypress') {
      steps {
        warnError(message: 'Oops, someone broke something') {
          nodejs('nodejs') {
            sh 'cypress run ./tests/E2E/cypress/'
          }

        }

      }
    }

    stage('Random Cypress') {
      steps {
        warnError(message: 'Error running cypress random') {
          nodejs('nodejs') {
            sh 'cypress run ./tests/Random/Cypress/'
          }

        }

      }
    }

  }
}