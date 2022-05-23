podTemplate(yaml: '''
    apiVersion: v1
    kind: Pod
    spec:
      containers:
      - name: base-container
        image: gcr.io/gke-hello-world-350007/base-image:v2
        securityContext:
          privileged: true
''') {
    node(POD_LABEL) {
        stage('Deploy VueJs App') {
            //git url: 'https://github.com/MinhMac3011/sky-ojt-project-vue-app.git', branch: 'main'
            checkout scm
            container('base-container') {
                stage('Build Image') {
                    withCredentials([usernamePassword(credentialsId: '2f844376-3e49-4546-a882-09396153d2ab', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh '''
                            cd /home/jenkins/agent/workspace/jenkins-vuejs-app
                            git clone https://$PASSWORD@github.com/$USERNAME/sky-ojt-project-vue-app.git
                        '''
                    }
                }
                stage('Push Image to GCR'){    
                    withCredentials([file(credentialsId: 'gke-auth', variable: 'FILE')]) {
                        sh '''
                            gcloud auth activate-service-account admin-for-jenkins-job@gke-hello-world-350007.iam.gserviceaccount.com --key-file=$FILE --project=gke-hello-world-350007
                            gcloud auth configure-docker
                            cd sky-ojt-project-vue-app
                            docker build -t gcr.io/gke-hello-world-350007/minhmd-vuejs-app-jenkins:v${BUILD_NUMBER} .
                            docker push gcr.io/gke-hello-world-350007/minhmd-vuejs-app-jenkins:v${BUILD_NUMBER}
                        '''    
                    }
                }
                stage('Deploy Vue-App'){
                    sh '''
                        cd sky-ojt-project-vue-app
                        ls -a
                        sed -i "s/minhmd-vuejs-app-jenkins:v35/minhmd-vuejs-app-jenkins:v$BUILD_NUMBER/g" vuejs-deployment.yaml
                        gcloud container clusters get-credentials cluster-1 --zone us-central1-c
                        kubectl apply -f vuejs-deployment.yaml
                    '''
                }
            }
        }

    }
}
