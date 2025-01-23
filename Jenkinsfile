pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright:v1.49.1-noble' } }
   
   stages {
      stage('e2e-tests') {
         steps {
            git url: 'https://github.com/yblezcanos/playwright-01.git', branch: 'develop'
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