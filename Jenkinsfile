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

    stage('E2E Cypress (VRT)') {
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

    stage('BDT') {
      when {
        expression {
          params.ENABLE_BDT
        }
      }
      steps {
        warnError(message: 'Oops, someone broke something'){
          nodejs('nodejs') {
            script {
              sh "yarn run bdt:ci"
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

    stage('Mutating testing') {
      when {
        expression {
          params.ENABLE_MUTATION
        }
      }
      steps {
        warnError(message: 'Error running mutating testing') {
          nodejs('nodejs') {
            sh 'npx stryker run'
          }
          publishHTML([allowMissing: false, 
            alwaysLinkToLastBuild: true, 
            keepAll: true, 
            reportDir: 'reports/mutation/html/', 
            reportFiles: 'index.html', 
            reportName: 'Stryker mutation report', 
            reportTitles: ''])
        }

      }
      
    }

    stage('Browser Matrix') {
      matrix {
        agent any
        when { 
          anyOf {
            expression { params.BROWSER_FILTER == 'all' }
            expression { params.BROWSER_FILTER == env.BROWSER }
          } 
        }
        axes {
          axis {
            name 'BROWSER'
            values 'firefox', 'chrome'
          }
        }
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
          stage('Test') {
            steps {
              warnError(message: 'Oops, someone broke something') {
                nodejs('nodejs') {
                  script {
                    // sh "yarn run cypress run --project ./tests/E2E/cypress --spec ./tests/E2E/cypress/cypress/integration/spec.js --env failOnSnapshotDiff=false --browser ${BROWSER}"
                    // if ( params.UPDATE_SNAPSHOTS ) {
                    //   sh "yarn run cy:ciupdate"
                    // } else {
                    //   sh "yarn run cy:ci"
                    // }
                    sh "yarn run cy:ci${BROWSER}"
                  }
                  
                }
              }
            }
          }
        }
      }
    }

  }
  parameters {
    booleanParam(name: 'ENABLE_E2E_CYPRESS', defaultValue: true, description: 'Enable E2E testing with cypress')
    booleanParam(name: 'ENABLE_E2E_PUPPETEER', defaultValue: true, description: 'Enable E2E testing with puppeteer')
    booleanParam(name: 'ENABLE_BDT', defaultValue: false, description: 'Enable BDT testing with Cucumber y Gherkin')
    booleanParam(name: 'ENABLE_RANDOM_TESTING', defaultValue: true, description: 'Enable random testing testing')
    booleanParam(name: 'ENABLE_VRT', defaultValue: true, description: 'Enable visual regression testing (VRT)')
    booleanParam(name: 'ENABLE_MUTATION', defaultValue: true, description: 'Enable mutating testing (VRT)')
    booleanParam(name: 'UPDATE_SNAPSHOTS', defaultValue: false, description: 'Should update VRT snapshots')
    booleanParam(name: 'HEADLESS', defaultValue: true, description: 'Enable headless testing')
    choice(name: 'BROWSER_FILTER', choices: ['all', 'firefox', 'chrome'], description: 'Run on specific browser')
  }
}