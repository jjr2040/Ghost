pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        catchError() {
          nodejs('nodejs') {
            sh 'yarn setup'
          }

        }

      }
    }

    stage('Unit tests') {
      steps {
        warnError(message: 'Oops, someone broke something') {
          nodejs('nodejs') {
            sh 'grunt test-unit'
          }

        }

      }
    }

  }
}