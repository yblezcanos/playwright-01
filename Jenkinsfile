pipeline {
    agent { 
        docker { 
            image 'mcr.microsoft.com/playwright:v1.49.1-noble' 
        } 
    }
    environment {
        // Carga las variables desde el archivo .env al entorno
        DOTENV_PATH = ".env" // Cambia el path según la ubicación de tu archivo .env
    }
    stages {
        stage('Load Environment Variables') {
            steps {
                script {
                    // Verifica si el archivo .env existe
                    if (fileExists(env.DOTENV_PATH)) {
                        def dotenvContent = readFile(env.DOTENV_PATH)
                        dotenvContent.split('\n').each { line ->
                            if (line.trim() && !line.startsWith('#')) {
                                def (key, value) = line.split('=', 2)
                                key = key.trim()
                                value = value?.trim()
                                env[key] = value // Exporta las variables al entorno
                            }
                        }
                        echo "Variables de entorno cargadas desde ${env.DOTENV_PATH}"
                    } else {
                        error "Archivo .env no encontrado en ${env.DOTENV_PATH}"
                    }
                }
            }
        }
        stage('e2e-tests') {
            steps {
                git url: 'https://github.com/yblezcanos/playwright-01.git', branch: 'main'
                sh 'npm ci'
                sh 'npx playwright test'
            }
        }
    }
    post {
        always {
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
