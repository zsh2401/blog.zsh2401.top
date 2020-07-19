---
title: Matebook13与ArchLinux
date: 2020-07-19 16:56:52
tags: [文章收集，目录，ArchLinux,Linux]
categories: Linux
thumbnail: 
---
在本人的华为Matebook 13设备上折腾了3天的`ArchLinux`，其中阅读了不少有意义的文档，在此保存作为书签，并供其他机友参考。
**持续更新中**

后期**可能**会出完整的Matebook13安装ArchLinux的全套教程和注意事项。
<!-- more -->
{%asset_img my_arch.png%}
*先上一张自己目前的ArchLinux桌面*
## 最初的安装
* [以官方Wiki的方式安装ArchLinux](https://www.viseator.com/2017/05/17/arch_install/)
* [ArchLinux安装后的必须配置与图形界面安装教程](https://www.viseator.com/2017/05/19/arch_setup/)
* [ArchLinux你可能需要知道的操作与软件包推荐「持续更新」](https://www.viseator.com/2017/07/02/arch_more/)

* [Installation guide (简体中文)](https://wiki.archlinux.org/index.php/Installation_guide_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))

## MX150也需要折腾
* [archlinux 笔记本安装nvidia显卡驱动与intel显卡驱动](http://ezlost.com/archlinux-%E7%AC%94%E8%AE%B0%E6%9C%AC%E5%AE%89%E8%A3%85nvidia%E6%98%BE%E5%8D%A1%E9%A9%B1%E5%8A%A8%E4%B8%8Eintel%E6%98%BE%E5%8D%A1%E9%A9%B1%E5%8A%A8/)
* [NVIDIA (简体中文)](https://wiki.archlinux.org/index.php/NVIDIA_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
* [HiDPI (简体中文)](https://wiki.archlinux.org/index.php/HiDPI_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))

## 一些可能问题的可能解决方案
### Failed to start SDDM
进入命令行模式`ctrl+alt+F2`，删除`/etc/X11/`下的所有文件。
```
rm /etc/X11/*
#then
reboot
```
### 通过KDE内置软件装的美化资源无法使用
自动安装程序可能的BUG导致。手动安装即可解决：
前往[KDE-LOOK](kde-look.org)手动下载资源并放置到相应文件夹。如
```
#图标包，主题等的位置
~/.local/share/plasma/look-and-feel
```
### 网易云音乐
卸载`xf86-video-intel`驱动
### JetBrains全家桶缩放出现问题
编辑`/usr/share/sddm/scripts/Xsetup`，加入下面的内容
```
xrander --dpi 144
```
### OBS无法使用NVENC编码
暂未解决，在此求高人指点。

**欢迎在评论区讨论**