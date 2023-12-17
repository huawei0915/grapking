# 打包
docker build -t grap-king .
# 定義tag
docker tag grap-king pksos30066/grap-king:least
# 登入
docker login -u pksos30066@gmail.com -p z0929295782z
# 上傳
docker push pksos30066/grap-king:least

