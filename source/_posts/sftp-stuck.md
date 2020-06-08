---
title: Linux SFTP上传卡住的解决方案
date: 2020-06-09 02:47:58
tags: [linux,网络,运维]
categories: IT小技巧
thumbnail: /post/sftp-stuck/cover.jpg
---
本人在使用SFTP包装工具向自己的服务器传输文件时总是卡住，在网上进行了资料搜寻，找到了解决方案。
<!-- more -->
修改MTU值即可。
```shell
#命令格式
ifconfig ${Interface} mtu ${SIZE} up

#示例
ifconfig eth0 mtu 9000 up
```

参考文章:
* [客户端linux使用 sftp上传文件时，卡住不动，文件上传失败](https://www.jianshu.com/p/3aa5ddf6d567)
* [什么是MTU？为什么MTU值普遍都是1500](https://blog.csdn.net/passionkk/article/details/100538418)
* [linux下修改mtu值](https://blog.csdn.net/weicao1990/article/details/52227896)