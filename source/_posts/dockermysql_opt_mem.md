---
title: Docker Mysql5.6内存优化
date: 2020-06-16 15:21:37
tags: [Docker,Mysql]
categories: 运维
thumbnail:
---
最近在自己小水管服务器上部署了[DNMP](https://github.com/yeszao/dnmp)，然后又直接在宿主机上加装了一个[CatServer](https://github.com/Luohuayu/CatServer) Minecraft游戏服务器。   
可我的小水管机器毕竟只有2GB运行内存，没过多久linux系统就开始疯狂与硬盘进行交换(kswapd0占用100%CPU)，然后整个系统卡死，游戏服务端程序崩溃。    
使用`docker stats`查看容器资源使用情况后，我找到了内存占用大户`mysqld`，其居然占用了10%也就是200MB运行内存！
<!-- more -->
我这里使用的是DNMP中的mysql5.6。
```sh
#进入容器
docker exec -it mysql5 /bin/bash
#安装vim
apt update && apt install vim
```
使用vim打开`/etc/mysql/mysql.conf.d/mysqld.cnf`
在`mysqld`下添加以下配置:
```sh
performance_schema_max_table_instances=400
table_definition_cache=400
table_open_cache=256
performance_schema=off
skip-host-cache
skip-name-resolve
```

在我这里，修改完后配置文件是这样的，贴出供参考：
{%asset_img edited.png%}

最后，重启你的mysql容器。我这里是回到DNMP目录，执行`docker-compose restart`。

现在再使用`docker stats`查看资源占用，已经减少到`3%`了。
{%asset_img astats.png%}