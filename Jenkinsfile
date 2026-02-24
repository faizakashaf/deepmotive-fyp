// Jenkinsfile (in your repo root)
pipeline {
    agent any
    
    environment {
        // AWS Configuration
        AWS_ACCOUNT_ID = '864624564756'   
        AWS_REGION = 'eu-central-1'              
        ECR_BACKEND = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/habit-backend"
        ECR_FRONTEND = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/habit-frontend"
        
        // Build Info
        BUILD_TAG = "build-${BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                echo '📦 Checking out code...'
                checkout scm 
            }
        }
        
        stage('Login to ECR') {
            steps {
                script {
                    echo '🔑 Logging to Amazon ECR...'
                    sh '''
                        aws ecr get-login-password --region ${AWS_REGION} | \
                        docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                    '''
                }
            }
        }
        
        stage('Build Backend Image') {
            steps {
                script {
                    echo '📦 Building Backend Docker Image...'
                    dir('deepmotive-backend') {
                        docker.build("habit-backend:${BUILD_TAG}")
                    }
                }
            }
        }
        
        stage('Build Frontend Image') {
            steps {
                script {
                    echo '📦 Building Frontend Docker Image...'
                    dir('deepmotive-frontend') {
                        docker.build("habit-frontend:${BUILD_TAG}")
                    }
                }
            }
        }
        
        stage('Tag Images for ECR') {
            steps {
                script {
                    echo '🏷️ Tagging images for ECR...'
                    sh """
                        docker tag habit-backend:${BUILD_TAG} ${ECR_BACKEND}:${BUILD_TAG}
                        docker tag habit-backend:${BUILD_TAG} ${ECR_BACKEND}:latest
                        docker tag habit-frontend:${BUILD_TAG} ${ECR_FRONTEND}:${BUILD_TAG}
                        docker tag habit-frontend:${BUILD_TAG} ${ECR_FRONTEND}:latest
                    """
                }
            }
        }
        
        stage('Push to ECR') {
            steps {
                script {
                    echo '☁️ Pushing images to Amazon ECR...'
                    sh """
                        docker push ${ECR_BACKEND}:${BUILD_TAG}
                        docker push ${ECR_BACKEND}:latest
                        docker push ${ECR_FRONTEND}:${BUILD_TAG}
                        docker push ${ECR_FRONTEND}:latest
                    """
                }
            }
        }
        
        stage('Deploy to ECS') {
            steps {
                script {
                    echo '🚀 Deploying to ECS Fargate...'
                    sh """
                        # Force new deployment for backend
                        aws ecs update-service \
                            --cluster habit-cluster \
                            --service backend-service \
                            --force-new-deployment \
                            --region ${AWS_REGION}
                        
                        # Force new deployment for frontend
                        aws ecs update-service \
                            --cluster habit-cluster \
                            --service frontend-service \
                            --force-new-deployment \
                            --region ${AWS_REGION}
                    """
                }
            }
        }
        
    //     stage('Verify Deployment') {
    //         steps {
    //             script {
    //                 echo '✅ Verifying deployment status...'
    //                 sh """
    //                     sleep 30
    //                     aws ecs describe-services \
    //                         --cluster habit-cluster \
    //                         --services backend-service frontend-service \
    //                         --region ${AWS_REGION} \
    //                         --query 'services[].{service:serviceName,status:status,runningCount:runningCount}'
    //                 """
    //             }
    //         }
    //     }
    // }
    
    // post {
    //     success {
    //         echo '🎉 Deployment successful!'
    //         // Optional: Send email/Slack notification
    //     }
    //     failure {
    //         echo '❌ Deployment failed! Check logs.'
    //         // Optional: Send alert
    //     }
    }
}