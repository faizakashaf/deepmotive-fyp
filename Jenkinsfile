// Jenkinsfile (in your repo root)
pipeline {
    agent any
    
    environment {
        // AWS Configuration
        AWS_ACCOUNT_ID = '864624564756'   
        AWS_REGION = 'eu-central-1'              
        ECR_BACKEND = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/habit-backend"
        
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
        
        stage('Tag Images for ECR') {
            steps {
                script {
                    echo '🏷️ Tagging images for ECR...'
                    sh """
                        docker tag habit-backend:${BUILD_TAG} ${ECR_BACKEND}:${BUILD_TAG}
                        docker tag habit-backend:${BUILD_TAG} ${ECR_BACKEND}:latest
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
                            --service habit-backend-task-service-izt4r1tl \
                            --force-new-deployment \
                            --region ${AWS_REGION}
                    """
                }
            }
        }
    }  
    
    post {
        success {
            echo '🎉 Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed! Check logs.'
        }
    }
}  