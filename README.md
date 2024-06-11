## 初始化指令
``` 
npm install --force
``` 

## 本機啟動執行
```
npm run serve
```

## 專案打包
```
npm run build
```

## 專案打包成docker-compose
```
#!/bin/bash

# projectName: 專案名稱
projectName="grap-king"
# version: 版本
version="least"

serverUser="root"
serverIp=""
projectPath="/var/www/html"


# 打包
docker build -t $projectName:$version -f Dockerfile-cust .
# 定義tag
docker tag $projectName:$version $projectName:$version
# 儲存
docker save -o $projectName:$version.tar $projectName:$version

# 上傳檔案到遠端server 完成
scp ./$projectName:$version.tar $serverUser@$serverIp:$projectPath

# 遠端server解壓縮
ssh $serverUser@$serverIp "cd $projectPath && tar -xvf $projectName:$version.tar"

# 遠端server刪除tar檔
ssh $serverUser@$serverIp "cd $projectPath && rm -rf $projectName:$version.tar"

# 遠端server 執行 docker-compose
ssh $serverUser@$serverIp "cd $projectPath && docker-compose -f docker-compose.yml up -d"
```
