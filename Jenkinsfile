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
            // git url: 'https://github.com/hashicorp/terraform.git', branch: 'main'
            container('base-container') {
                stage('Build Image') {
                    sh '''
                        gcloud iam service-accounts keys create svc-acc-keys --iam-account=400170333729-compute@developer.gserviceaccount.com
                        gcloud auth activate-service-account 400170333729-compute@developer.gserviceaccount.com --key-file=svc-acc-keys --project=gke-hello-world-350007
                        docker build -t gcr.io/gke-hello-world-350007/minhmd-vuejs-app-jenkins:v${BUILD_NUMBER}
                        docker push gcr.io/gke-hello-world-350007/minhmd-vuejs-app-jenkins:v${BUILD_NUMBER}
                    '''
                }
            }
        }

    }
}