podTemplate(containers: [
    containerTemplate(
        name: 'base-container', 
        image: 'gcr.io/gke-hello-world-350007/base-image:v1',
        command: 'sleep', 
         args: '30d'
        )
  ]) {

    node(POD_LABEL) {
        stage('Deploy VueJs App') {
            git url: 'https://github.com/MinhMac3011/sky-ojt-project-vue-app.git', branch: 'main'
            container('base-container') {
                stage('Build Image') {
                    
                        withCredentials([file(credentialsId: 'svc-acc-keys-file', variable: 'FILE')]) {
                            sh '''
                                gcloud auth activate-service-account 400170333729-compute@developer.gserviceaccount.com --key-file=$FILE --project=gke-hello-world-350007
                            '''    
                        }
                    sh '''
                        docker build -t gcr.io/gke-hello-world-350007/minhmd-vuejs-app-jenkins:v${BUILD_NUMBER} .
                        docker push gcr.io/gke-hello-world-350007/minhmd-vuejs-app-jenkins:v${BUILD_NUMBER}
                    '''
                }
            }
        }

    }
}
