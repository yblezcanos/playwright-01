## CI/CD with Jenkins and Playwright using Docker

In this section, we will set up a CI/CD pipeline using Jenkins and Playwright with Docker. We will create a Jenkins container that can run Docker commands and use it to run Playwright tests in another container.

### Setting Up Jenkins with Docker

First, let's create a Dockerfile to set up Jenkins with Docker installed:

```Dockerfile
# Dockerfile
FROM jenkins/jenkins:lts-jdk17

USER root
RUN curl -fsSL https://get.docker.com/ | sh
USER jenkins
```
Abro un cmd dentro de la carpeta donde está el archivo Dockerfile

Build the Docker image with the following command:

```sh
docker build --tag docker-in-docker-jenkins .
```

Run the Jenkins container with Docker support:

```sh
docker run --rm --group-add 0 -v /var/run/docker.sock:/var/run/docker.sock -p 8080:8080 -v jenkins_home:/var/jenkins_home --name jenkins docker-in-docker-jenkins
```
1. docker run
Este comando ejecuta un contenedor basado en una imagen de Docker.

2. --rm
Indica que el contenedor se eliminará automáticamente cuando se detenga. Esto es útil para evitar que contenedores huérfanos queden en tu sistema después de que terminen de ejecutarse.

3. --group-add 0
Añade el grupo con ID 0 (que suele ser el grupo root) al contenedor. Esto puede otorgar permisos adicionales al proceso que se ejecuta dentro del contenedor, en este caso, Jenkins. Es especialmente útil si el contenedor necesita interactuar con Docker o realizar tareas que requieren permisos elevados.

4. -v /var/run/docker.sock:/var/run/docker.sock
Esto monta el socket de Docker desde el host dentro del contenedor.
En el host: /var/run/docker.sock es un archivo especial que permite comunicarse con el daemon de Docker.
En el contenedor: Montarlo en la misma ruta permite que Jenkins, desde dentro del contenedor, controle y ejecute comandos Docker en el host.
Esto es necesario si estás usando Jenkins para ejecutar jobs que interactúan con Docker, como construir imágenes o administrar contenedores.

5. -p 8080:8080
Esto expone el puerto 8080 del contenedor al puerto 8080 del host.

Host: Puedes acceder a Jenkins en http://localhost:8080.
Contenedor: Jenkins escucha en el puerto 8080 internamente.

6. -v jenkins_home:/var/jenkins_home
Esto monta un volumen llamado jenkins_home en el directorio /var/jenkins_home dentro del contenedor.
Por qué es importante: Jenkins guarda toda su configuración, jobs y datos en /var/jenkins_home. Al usar un volumen, esos datos persisten incluso si el contenedor se elimina, permitiendo que los datos de Jenkins no se pierdan.

7. --name jenkins
Asigna el nombre jenkins al contenedor, facilitando su identificación. En lugar de usar el ID del contenedor, puedes referirte a él como jenkins en comandos como docker stop jenkins.

8. docker-in-docker-jenkins
Este es el nombre de la imagen Docker que estás usando para crear el contenedor.
Imagen personalizada: Parece ser una imagen que combina Jenkins con la funcionalidad de Docker-in-Docker (DinD). Esto significa que Jenkins puede ejecutar contenedores Docker directamente desde dentro del contenedor.

### Configuring Jenkins

1. Access Jenkins by navigating to `http://localhost:8080` in your web browser.
2. Follow the setup instructions to unlock Jenkins, install suggested plugins, and create an admin user.
3. Install the "Docker plugin", "Pipeline" and "HTML Publisher" plugin plugins from the Jenkins plugin manager.

### Creating a Jenkins Pipeline

Now that Jenkins is set up, let's create a Jenkins pipeline to run Playwright tests using Docker.

1. Create a `Jenkinsfile` in the root of your project with the following content:

    ```groovy
    pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright:v1.49.1-noble' } }
   
   stages {
      stage('e2e-tests') {
         steps {
            git url: 'https://github.com/yblezcanos/playwright-01.git', branch: 'develop'
            //importando variables de entorno
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
 ```

2. In Jenkins, create a new pipeline job:
    - Go to Jenkins dashboard and click on "New Item".
    - Enter a name for your pipeline and select "Pipeline", then click "OK".
    - In the pipeline configuration, under "Pipeline", select "Pipeline script from SCM".
    - Set "SCM" to "Git" and provide the repository URL: `https://github.com/yblezcanos/playwright-01.git`.
    - Set the branch to `develop`.
    - Click "Save".

3. Run the pipeline by clicking "Build Now" in the pipeline job.

### Managing Environment Variables in Jenkins

In this section, we will explain how to handle environment variables in Jenkins. For this example, we will create environment variables in Jenkins and use them in the `Jenkinsfile` with the `withCredentials` step.

#### Creating Environment Variables in Jenkins

1. Go to Jenkins dashboard and click on "Manage Jenkins".
2. Click on "Manage Credentials".
3. Select the appropriate domain (e.g., "Global credentials").
4. Click on "Add Credentials" on the left menu.
5. Choose "Secret text" from the "Kind" dropdown.
6. Enter the environment variable value in the "Secret" field.
7. Provide an ID for the credential (e.g., `BASE_URL`).
8. Click "OK" to save the credential.

#### Using Environment Variables in Jenkinsfile

In your `Jenkinsfile`, you can use the `withCredentials` step to access the environment variables. Here is an example:

```groovy
pipeline {
    agent { docker { image 'mcr.microsoft.com/playwright:v1.49.1-noble' } }
    
    stages {
        stage('e2e-tests') {
            steps {
                git url: 'https://github.com/yblezcanos/playwright-01.git', branch: 'develop'
                // Importing environment variables
                withCredentials([string(credentialsId: 'BASE_URL', variable: 'BASE_URL')]) {
                    // Install dependencies
                    sh 'npm ci'

                    // Run tests using the environment variable
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
```

In this example, the `withCredentials` step is used to inject the `BASE_URL` environment variable into the shell commands. This allows you to securely manage and use environment variables in your Jenkins pipeline.