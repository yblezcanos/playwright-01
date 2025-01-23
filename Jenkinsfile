pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright:v1.49.1-noble' } }
   
   stages {
      stage('e2e-tests') {
         steps {
            git url: 'https://github.com/yblezcanos/playwright-01.git', branch: 'develop'
            withCredentials([string(credentialsId: 'BASE_URL', variable: 'BASE_URL')]) {
               // Instala dependencias
               sh 'npm ci'

               // Corre las pruebas usando la variable de entorno
               sh 'BASE_URL=$BASE_URL npx playwright test'
            }
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