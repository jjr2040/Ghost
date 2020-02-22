pipeline {
  agent any

  tools {nodejs "node"}

  environment { 
    ROOT_DIR = "${WORKSPACE}/Ghost"
    BRANCH = 'master'
    REPO_URL = 'https://github.com/jjr2040/Ghost.git'
  }

  stages {

    stage('Checkout and build') {
      steps {
        checkoutAndBuild()
      }
    }

    stage('Test') {
      steps {
        runUnitTests()
      }
    }

  }
}

// Steps

def checkoutAndBuild() {

  sh """ 
  if [ -d '${ROOT_DIR}' ]; then 
    cd ${ROOT_DIR} && git pull origin ${BRANCH}
  else 
    git clone --recurse-submodules ${REPO_URL} 
  fi
  """

  sh 'cd ${ROOT_DIR} && yarn setup'
}

def runUnitTests() {
  dir(ROOT_DIR) {
    sh 'grunt test-unit'
  }
}