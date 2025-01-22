pipeline {
    agent any
    tools {
        nodejs 'NodeJS-Project-Version'
    }
    environment {
        PLAYWRIGHT_BROWSERS_PATH = '/var/jenkins_home/playwright-browsers'
    }
    stages {
        stage('Clone repository') {
            steps {
                checkout scm
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Install browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }
        stage('Run Playwright tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
}
