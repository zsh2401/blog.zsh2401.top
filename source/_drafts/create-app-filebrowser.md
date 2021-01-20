---
title: 搭建FileBrowser-
date: 2020-01-03 13:37:42
tags: [基础技术,just4fun,前端,后端,Application]
categories: 计算机技术
hidden: true
thumbnail: /post/create-app-filebrowser/thumbnail.jpg
---
由于Coding Pages 128MB的空间限制，本博客不得不删除了一些文件以求继续更新。但这只是治标不治本，随着内容的更新，文件体积必然会持续增长，每次都删除文件显然不可行。通过Space Sniffer对站点文件的分析报告，可以看出是图片和音乐等资源文件占用了太多空间，既然如此，我们可以想办法将部分资源文件转移到别的地方。
<!-- more -->
{%asset_img space-analysation.png%}
▲站点文件空间分析，主要是图片和音乐等文件占用较多   

### 使用File Browser
经过简单的搜寻,决定使用[filebrowser](https://github.com/filebrowser/filebrowser)

### 安装
#### 获取脚本
获取sh安装脚本并执行: `curl -fsSL https://filebrowser.xyz/get.sh | bash`   
注意:如果无法使用curl指令,可以使用自己的浏览器访问[该网址](https://filebrowser.xyz/get.sh)，将内容复制到自行创建的脚本中。
{%asset_img wait4install.png%}
#### 配置
通过以下指令进行进一步的配置
修改端口: `filebrowser config p 27700`

### 开启反向代理

### 从外网登入

### ALL DONE!