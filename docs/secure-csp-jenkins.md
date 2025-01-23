### Configuring Content Security Policy (CSP) in Jenkins

To allow Jenkins to display the Playwright test report correctly, you may need to adjust the Content Security Policy (CSP) settings. This can be done by setting a system property in the Jenkins console script.

1. Open Jenkins and navigate to `Manage Jenkins` > `Script Console`.
2. Enter the following script and run it:

    ```groovy
    System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "")
    ```

### Reason for Using the Script

The reason for using this script is to disable the default Content Security Policy (CSP) in Jenkins. By default, Jenkins applies a strict CSP that can prevent certain resources, such as inline scripts and styles, from being loaded in the HTML reports. Disabling the CSP allows the Playwright test report to be displayed correctly without any restrictions.

Note: Disabling CSP can have security implications. Ensure that your Jenkins instance is secured and accessible only to trusted users.

This setup will run your Playwright tests inside a Docker container, publish the test report, and archive the test results.
## Securely Configuring Content Security Policy (CSP) in Jenkins

Instead of completely disabling the Content Security Policy (CSP) in Jenkins, you can modify it to allow the necessary resources for displaying the Playwright test report while maintaining a level of security. Here's how you can do it:

### Adjusting CSP Settings

1. Open Jenkins and navigate to `Manage Jenkins` > `Script Console`.
2. Enter the following script to modify the CSP settings and run it:

    ```groovy
    System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';")
    ```

### Explanation

- `default-src 'self';`: Allows resources to be loaded only from the same origin.
- `img-src 'self' data:;`: Allows images to be loaded from the same origin and data URIs.
- `style-src 'self' 'unsafe-inline';`: Allows styles to be loaded from the same origin and inline styles.
- `script-src 'self' 'unsafe-inline';`: Allows scripts to be loaded from the same origin and inline scripts.

This configuration allows the necessary resources for the Playwright test report to be displayed correctly while maintaining a reasonable level of security.

### Applying the CSP Settings Permanently

To ensure the CSP settings are applied every time Jenkins starts, you can add the system property to the Jenkins startup options:

1. Open the Jenkins configuration file (e.g., `/etc/default/jenkins` or `/etc/sysconfig/jenkins`).
2. Add the following line to set the CSP system property:

    ```sh
    JAVA_ARGS="-Dhudson.model.DirectoryBrowserSupport.CSP=\"default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';\""
    ```

3. Save the file and restart Jenkins.

By following these steps, you can securely configure the CSP settings in Jenkins to allow the Playwright test report to be displayed correctly without completely disabling CSP.