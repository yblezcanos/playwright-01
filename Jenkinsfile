pipeline {
    agent any
    tools {
        nodejs 'NodeJS-Project-Version' // Asegúrate de configurar Node.js en Jenkins
    }
    environment {
        PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = '1' // Si ya tienes Playwright instalado
    }
    stages {
        stage('Clone repository') {
            steps {
                checkout scm // Clona el repositorio desde el SCM configurado
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'npm install' // Instala dependencias, incluyendo Playwright
            }
        }
        stage('Run Playwright tests') {
            steps {
                sh 'npx playwright test' // Ejecuta las pruebas
            }
        }
    }
}
