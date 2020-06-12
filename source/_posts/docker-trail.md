---
title: Docker初次尝试
comment: true
date: 2020-06-11 23:34:09
tags: [Linux,服务器,运维]
categories: IT
thumbnail: /post/docker-trail/cover.png
---
随着自己的小水管服务器部署的应用越来越多，整个系统变得愈发混乱，到处充斥着各种应用所需的依赖与配置文件。    
如果再不做出改变，以后对服务器数据的备份维护将变得非常困难。   
久仰docker技术的大名，试试吧！
<!-- more -->
# 安装
## docker-ce
根据[官网给出的文档](https://docs.docker.com/engine/install/ubuntu/)，只需要无脑键入以下命令即可。
安装docker官方GPG key
```sh
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

检查指纹
```sh
sudo apt-key fingerprint 0EBFCD88
```

添加docker稳定版仓库
```sh
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) \
  stable"
 
```

更新索引并安装
```sh
apt update
apt install docker-ce docker-ce-cli containerd.io
```

docker提供了通过以下指令进行安装完整性测试的方法。

```sh
#如果正常，能够看到自动安装了hello-world镜像并运行
docker run hello-world

```

## docker-compose
通常情况下，我们获取的docker镜像都需要通过docker-compose进行配置。   
这里使用[DaoCould](http://get.daocloud.io/)国内源安装docker-compose

```sh
#下载
curl -L https://get.daocloud.io/docker/compose/releases/download/1.26.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
#给予执行权限
chmod +x /usr/local/bin/docker-compose
```

```sh
docker-compose
# 如果安装正确，此处应为docker-compose帮助内容
```

# 测试:部署LNMP应用
在GitHub上找到一个由国人开发的LNMP镜像[duiying/Docker-LNMP](https://github.com/duiying/Docker-LNMP)，听说广受好评，这里进行一下尝试
## 安装
```sh
# 克隆项目
git clone https://github.com/duiying/Docker-LNMP.git
# 进入目录
cd Docker-LNMP
# 容器编排
docker-compose up -d
```