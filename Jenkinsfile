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
        catchError() {
          nodejs('nodejs') {
            sh 'grunt test-unit'
          }

        }

      }
    }

  }
}