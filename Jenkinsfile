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
            container('base-container') {
                stage('Build Image') {
                    def github_secrets = [
                            [path: 'kv/github', engineVersion: 2, secretValues: [
                                [envVar: 'USERNAME', vaultKey: 'username'],
                                [envVar: 'PASSWORD', vaultKey: 'password']
                                ]
                            ]
                    ]
                    def github_configuration = [vaultUrl: 'http://35.238.167.126:8200',  vaultCredentialId: 'jenkins-role']

                    //withCredentials([usernamePassword(credentialsId: '2f844376-3e49-4546-a882-09396153d2ab', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    withVault([configuration: github_configuration, vaultSecrets: github_secrets]) {    
                        sh '''
                            git clone https://${PASSWORD}@github.com/${USERNAME}/sky-ojt-project-vue-app.git
                        '''
                    }
                }
                stage('Push Image to GCR'){    

                     def gcp_secrets = [
                            [path: 'kv/gcp', engineVersion: 2, secretValues: [
                                [envVar: 'KEY', vaultKey: 'key']
                                ]
                            ]
                    ]
                    def gcp_configuration = [vaultUrl: 'http://35.238.167.126:8200',  vaultCredentialId: 'jenkins-role']

                    //withCredentials([file(credentialsId: 'gke-auth', variable: 'FILE')]) {
                    withVault([configuration: gcp_configuration, vaultSecrets: gcp_secrets]) { 
                        //withEnv(["KEY=$KEY"]) {
                            writeFile file: "svc-acc-key.json", text: "$KEY"
                        //}
                    }
                        sh '''
                            gcloud auth activate-service-account admin-for-jenkins-job@gke-hello-world-350007.iam.gserviceaccount.com --key-file=svc-acc-key.json --project=gke-hello-world-350007
                            gcloud auth configure-docker
                            cd sky-ojt-project-vue-app
                            docker build -t gcr.io/gke-hello-world-350007/minhmd-vuejs-app-jenkins:v${BUILD_NUMBER} .
                            docker push gcr.io/gke-hello-world-350007/minhmd-vuejs-app-jenkins:v${BUILD_NUMBER}
                        '''    
                    
                }
                stage('Deploy Vue-App'){
                    sh '''
                        cd sky-ojt-project-vue-app
                        sed -i "s/minhmd-vuejs-app-jenkins:v35/minhmd-vuejs-app-jenkins:v$BUILD_NUMBER/g" vuejs-deployment.yaml
                        gcloud container clusters get-credentials cluster-1 --zone us-central1-c
                        kubectl apply -f vuejs-deployment.yaml -n ns-jenkins
                    '''
                }
            }
        }

    }
}
