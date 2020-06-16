---
title: Ubuntu 18.04下的CatServer极限优化
comment: true
date: 2020-06-16 15:47:53
tags:
categories:
thumbnail:
---
我的服务器是1C2G的配置，使用CatServer安装了Pixelmon模组和大量插件。   
在优化前，服务器经常因为内存问题崩溃，优化后仍然存在崩溃情况，但已经稳定许多。
<!-- more --> 
最主要的优化方向当然就是内存。

**此文章默认读者拥有linux基础知识。**
## **使用openj9-jre**
根据我目前的测试结果，以下三个jre的内存占用情况是:   
`openjdk > zulu > openj9`
在使用openj9时,我的服务器占用内存比使用openjdk减少了大约10%。
### 在ubuntu下安装openj9
1. 无论通过什么方式(wget或其它)，下载[最新版openj9](https://adoptopenjdk.net/releases.html?variant=openjdk8&jvmVariant=openj9) ，建议只下载jre即可。
2. 通过`tar zxvf`指令解压程序包
3. 将解压出来的文件夹移动到合适的位置，如`/usr/lib/openj9-jre`，当然，不这么做也可以，反正届时需要通过`/path/to/openj9-jre/bin/java`来使用openj9。
4. 通过`/path/to/openj9-jre/bin/java`启动程序，此处不赘述。
[此段参考](https://www.mcbbs.net/forum.php?mod=viewthread&tid=847020)

## **参数设置**
对于我的1C2G服务器，我使用`-Xms256M -Xmx1024M`作为启动参数，再高会导致内存交换服务器卡死。

## **安装Aegis Clear插件**
该插件可以降低5%-15%的内存占用。
此处不赘述，请参考[Aegis Clear-MCBBS](https://www.mcbbs.net/forum.php?mod=viewthread&tid=918981)。

## **降低其他应用内存占用**
[优化MySql](/post/dockermysql_opt_mem)