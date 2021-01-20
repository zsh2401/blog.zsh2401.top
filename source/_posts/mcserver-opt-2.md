---
title: 关于2核4GB Minecraft模组服务器优化的忠告
date: 2020-06-29 07:47:27
tags: [minecraft,我的世界,华为,云耀服务器,华为云]
categories: [计算机运维技术]
thumbnail: /post/mcserver-opt-2/cover.jpg
cover: /post/mcserver-opt-2/cover.jpg
---
在过去半个月中，我运营着一个最高在线为8的小型服务器,并在尝试了大量优化方法后,做出了一些简单的总结。   
注意，此篇文章的适用性不广泛，仅供新手，以及小型服务器腐竹参考。   
**文中任何讨论仅限于小型服务器**
<!-- more -->
首先，亮出服务器环境：
{%asset_img server_info.png%}
可以看出，这是一个2核4GB的CentOS 7.6服务器。   
然后是服务端程序信息:
服务端主程序: [CatServer-20.06.23](https://github.com/Luohuayu/CatServer/releases/tag/20.06.23)
以及模组/插件列表:
{%asset_img mods.png%}
{%asset_img plugins.png%}

那么废话不多说，开始正文。
## 关于JVM
### Xms和Xmx的设置
在4GB运存的服务器中，**不要将Xms和Xmx设置到2GB以上**！   
什么？那岂不是浪费了内存？   
并没有！   
这样的参数不意味着整个服务端程序只会占用这么点儿内存，其依然可以在合理的范围内使用服务器的资源。   
并且这两个参数设置得太高，只会导致你的系统在服务端运行一段时间后因为内存不足启动`kswapd`，使用极慢的虚拟内存，这将导致了整个服务器CPU爆满，任何操作都极为缓慢。   
而在目前的`CentOS 7.6`中，甚至连ssh都无法再连接。
在`kswpad`运行的过程中，玩家是无法进行游戏的，在不久的时间后，Minecraft服务端将崩溃并提示JVM堆栈错误，未保存的存档也注定会丢失。
### 是否应当使用特殊JVM实现?
我曾尝试过`zulu`,`openj9`等非官方实现。在后来才意识到这样的方案不过是用CPU换内存罢了。**对于小型服务器来说，TPS更多与CPU挂钩**。
最后我还是回归了`openjdk`。
### 我的参数？
经过实测，以下几篇帖子的启动参数并没有为我的服务端带来显著的性能提升。
* [OpenJ9 JVM参数(服务器启动参数)调优](https://www.mcbbs.net/forum.php?mod=viewthread&tid=899289)
* [Aikar: 调整JVM —— 非常有效的服务器启动参数](https://www.mcbbs.net/forum.php?mod=viewthread&tid=867786)
* [冥想了一夜的服务器启动参数](https://www.mcbbs.net/forum.php?mod=viewthread&tid=839828)

后来，在大量的测试，以及参考了[Minecraft服务器优化教程 —— 让多带50%的玩家不再是梦](https://www.mcbbs.net/forum.php?mod=viewthread&tid=478126)后，使用了最简单的参数：
```sh
#-server参数提供更好的稳定性
# Xms与Xmx相同
java -server -Xms2G -Xmx2G -jar CatServer-5ef3d0c-universal.jar
```
* [【Java】-Xms -Xmx参数 相等？](https://blog.csdn.net/u010900754/article/details/86629240)
* [Is there any advantage in setting Xms and Xmx to the same value?](https://stackoverflow.com/questions/43651167/is-there-any-advantage-in-setting-xms-and-xmx-to-the-same-value)

总而言之，不要在你不了解JVM时乱使用参数。毕竟，Java的高级工程师们往往想得比你多。

## 合理利用优化插件
如`LaggRemoverPlus`、`LaggRemover`、`SuperOptimization`等插件在2核4GB服务器下的作用并不够明显。事实上，这些插件也只不过是用CPU换内存而已，再说一遍：**对于小型服务器来说，TPS更多与CPU挂钩**   
BTW，`LaggRemoverPlus`在我的服务端中会疯狂卸载`Multiverse-Core`加载的世界，并导致世界混乱。或许这只是因为我配置不当导致的个例问题，但各位腐竹仍应敲响警钟。

## 不要在Docker中运行服务端程序!
通过`Docker`可以实现服务端崩溃自启，以及隔离应用环境，但在其性能损失面前，这真的值得吗？   
我明白主流观点是Docker在大部分情况下对性能的损耗并不高，但这对Java Minecraft服务端并**不适用**。

最初，我使用`docker-compose`编排了一个基于`openjdk:8-jre`的容器，其容器中的操作系统为Ubuntu:
```yml
services:
  mcs:
    container_name: mcs
    image: "openjdk:8-jre" #Though openjdk takes more memory,it's cpu performance is better than openj9.
    #image: "adoptopenjdk:8u252-b09-jre-openj9-0.20.0-bionic"  #openj9 use less memory,but it's cpu performance is actually not good.
    user: "root"
    working_dir: /root/data
    volumes:
      - ./:/root/data
    expose:
      - "8123"
      - "25565"
    stdin_open: true
    tty: true
    command: "./start.sh"    
    ports:
      - "25565:25565"
    restart: always
    environment:
      - TZ="Asia/Shanghai"
```
彼时，由于不当的JVM参数，我的服务端程序经常崩溃，而`Docker`总是我自动重启了应用，这非常棒。   
可在后来，内存问题解决了，TPS却怎么也上不去(就算服务器没人，也在18徘徊)，并且出现了一些奇怪的问题：
* 容器内操作系统时区为协调世界时，与北京时间相差8个小时（可以正常解决）
* 服务端启动极为缓慢
* Residence插件启动超时    

突发奇想不再使用Docker运行应用，以上这些玄学问题迎刃而解的同时，TPS也始终维持在19.9以上，即便游戏人数达到上限的70%。