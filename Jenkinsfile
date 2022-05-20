podTemplate(yaml: '''
    apiVersion: v1
    kind: Pod
    metadata:
      labels: 
        some-label: some-label-value
    spec:
      containers:
      - name: docker
        image: gcr.io/gke-hello-world-350007/base-image:v2
        securityContext:
          privileged: true
''') {

    node(POD_LABEL) {
        stage('Deploy VueJs App') {
            //git url: 'https://github.com/MinhMac3011/sky-ojt-project-vue-app.git', branch: 'main'
            container('base-container') {
                stage('Build Image') {
                    withCredentials([usernamePassword(credentialsId: '2f844376-3e49-4546-a882-09396153d2ab', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh '''
                            cd /home/jenkins/agent/workspace/jenkins-vuejs-app
                            git clone https://$PASSWORD@github.com/$USERNAME/sky-ojt-project-vue-app.git
                            ls -l
                            pwd
                            cd sky-ojt-project-vue-app
                        '''
                    }
                    withCredentials([file(credentialsId: 'svc-acc-keys-file', variable: 'FILE')]) {
                        sh '''
                            gcloud auth activate-service-account 400170333729-compute@developer.gserviceaccount.com --key-file=$FILE --project=gke-hello-world-350007
                        '''    
                    }
                    sh '''
                        cd sky-ojt-project-vue-app
                        service docker start
                        docker build -t gcr.io/gke-hello-world-350007/minhmd-vuejs-app-jenkins:v${BUILD_NUMBER} .
                        docker push gcr.io/gke-hello-world-350007/minhmd-vuejs-app-jenkins:v${BUILD_NUMBER}
                    '''
                }
            }
        }

    }
}
