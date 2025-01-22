pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright:v1.49.1-noble' } }
   environment {
            BASE_URL = credentials('BASE_URL')
            USERNAME = credentials('USERNAME')
            PASSWORD = credentials('PASSWORD')
        }
   stages {
      stage('e2e-tests') {
         steps {
            git url: 'https://github.com/yblezcanos/playwright-01.git', branch: 'main'
            sh 'npm ci'
            sh 'npx playwright test'
         }
      }
   }
   post {
       always{
            publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright Test Report'
                    ])
       }
   }
}
