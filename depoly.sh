# projectName: 專案名稱
projectName="grap-king"
# version: 版本
version="0.0.6"
# dockerHub: dockerHub帳號
dockerHub="pksos30066"
# user: dockerHub帳號
user="pksos30066@gmail.com"
# pwd: dockerHub密碼
pwd="z0929295782z"

# 打包
docker build -t $projectName:$version -f Dockerfile .
# 定義tag
docker tag $projectName:$version $dockerHub/$projectName:$version
# 登入
docker login -u $user -p $pwd
# 上傳
docker push $dockerHub/$projectName:$version



# # 打包
# docker build -t grap-king:least .
# # 定義tag
# docker tag grap-king:least $dockerHub/grap-king:least
# # 登入
# docker login -u $user -p $pwd
# # 上傳
# docker push $dockerHub/grap-king:least

