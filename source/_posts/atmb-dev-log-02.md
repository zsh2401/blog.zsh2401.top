---
title: 【秋之盒开发日志02】 Leafx工具集
date: 2020-04-18 22:42:13
tags: [基础技术,C#,WPF,Windows,Win32,ADB,秋之盒,AutumnBox]
categories: [AutumnBox] 
thumbnail: https://s1.ax1x.com/2020/04/18/JnyVUK.md.jpg
---
在秋之盒开发过程中，代码的耦合度愈发变高。为了降低耦合度，提高开发便捷度，我决定开始开发一个程序集用于实现依赖注入（控制反转IoC）
<!-- more -->
# 什么是依赖注入?
>控制反转（Inversion of Control，缩写为IoC），是面向对象编程中的一种设计原则，可以用来减低计算机代码之间的耦合度。其中最常见的方式叫做依赖注入（Dependency Injection，简称DI），还有一种方式叫“依赖查找”（Dependency Lookup）。通过控制反转，对象在被创建的时候，由一个调控系统内所有对象的外界实体将其所依赖的对象的引用传递给它。也可以说，依赖被注入到对象中。

# 秋之盒使用依赖注入的意义?
在`AutumnBox.GUI`以及`AutumnBox.OpenFramework`两个主要程序集中有大量接口以及实现，在以往的开发中，常常需要显式地构建或引用某个对象的实例，这导致了大量对象间存在强耦合关系，死板而不灵活。

# LeafExtension实现的IoC
曾经，我在Java技术栈的学习，使我进一步认识到了IoC的重要性，并在后来的秋之盒SDK中加入了新的LeafExtensionBase类，这个类将会在拓展创建时注入需要的对象，实现最基础的IoC。
```C#
[ExtName("Example Extension")]
public class EExample{
    [LMain]
    public void EntryPoint(IDevice device){
        //device对象将会被设定为模块的目标作用设备
    }
}
```
# 将IoC推广到整个秋之盒
后来的日子里，各组件的代码变得越来越多，模块间依赖严重，于是我决定将LeafExtension的那一套思想推广开来。
最初，我只是在AutumNBox.OpenFramework.Leafx下编写代码，编写完成初期版本后，我又决定将其推广到整个解决方案中。
`AutumnBox.Leafx`程序集被创建了。
# AutumnBox.Leafx
## AutumnBox.Leafx.Container
在一段时间的编写后,Leafx的IoC部分基本完成。
### ILake接口
这是Leafx提供的依赖注入的核心概念，其应当被理解为一个容器，用于维护所有组件并负责向提供组件。
```C#
    //AutumnBox.Leafx/Container/ILake.cs
    public interface ILake
    {
        int Count { get; }

        object? GetComponent(string id);
    }
```
`Count`用于获取已注册组件的数量，而`GetComponent(string)`方法显然是用于获取组件的。
如你所见，该接口其仅支持通过一个字符串唯一标识来获取组件，但我们可以通过`LakeExtension.Getter.cs`中的大量拓展方法实现更灵活的组件获取，如根据类型获取。
### IRegiserableLake接口
这个接
### SunsetLake
### 容器拓展方法
#### 注册
#### 获取
#### 容器集

## AutumnBox.Leafx.ObjectManagement
### ObjectBuilder
### DependenciesInjector
#### AutoInjectAttribute
### MethodProxy

# 展望
在将来的版本中，Leafx将有机会实现AOP等技术，并带来更多先进的开发工具以提高整个秋之盒代码的便捷度，健壮性，安全性等。
可以说Leafx将会是整个秋之盒代码的坚实地基。





