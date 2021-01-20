---
title: 安装与配置Icarus主题
date: 2020-01-03 13:49:27
tags: [Just4Fun,伊卡洛斯,Icarus,主题,hexo,hexo主题]
categories: 计算机技术
thumbnail: /post/configure-theme-icarus/thumbnail.jpg
cover: /post/configure-theme-icarus/thumbnail.jpg
---
[theme-next/hexo-theme-next](https://github.com/theme-next/hexo-theme-next)已经烂大街了，经常看到别人的博客使用，喜欢标新立异的我自然不能接受这种事儿，便在GitHub上找了"新宠": [ppoffice/hexo-theme-icarus](https://github.com/ppoffice/hexo-theme-icarus)
<!-- more -->
{%asset_img demo.png%}
▲预览图片
就像安装所有hexo主题一样，先下载主题zip包并解压到`/themes`文件夹中，然后在hexo博客根目录`_config.yml`中将其启用。`icarus-2.6.0`主题第一次启动时会生成主题`_config.yml`文件，然后我们就可以开始配置了。

### 启用Valine
根据[文档](https://blog.zhangruipeng.me/hexo-theme-icarus/categories/Plugins/Comment/)，使用valine评论插件，并配置APPKEY等信息
```yml
comment:
    type: valine
    app_id: <APPID>        # (required) LeanCloud application id
    app_key: <APPKEY>       # (required) LeanCloud application key
    notify: true           # (optional) receive email notification
    verify: false           # (optional) show verification code
    placeholder: 请遵守中华人民共和国法律法规。填写邮箱信息以接收回复。  
```

### 配置NAVBAR
注意: icon为font-awesome提供，需要填写对应的font-awesome类名。
```yml
navbar:
    # Navigation bar menu links
    menu:
        主页: /
        归档: /archives
        分类: /categories
        标签: /tags
        关于: /about
        留言板: /messageboard
    # Navigation bar links to be shown on the right
    links:
        Apps:
            icon: fas fa-ghost
            url: '/2020/01/01/projects/'
```
### 配置FOOTER

{%asset_img sfooter.png%}
▲原版底栏

在主题`_config.yml`中提供的footer配置太少，只能简单地添加一些图标:
```yml
footer:
    # Links to be shown on the right of the footer section
    links:
        AutumnBox:
            icon: fab fa-envira
            url: 'https://www.atmb.top/'
        Lee Yin's Cat Paw:
            icon: fas fa-heart
            url: 'https://cp.zsh2401.top/'
```
想要加入更多的东西?只能去修改主题的代码文件了。
#### 自定义底部
经过简单的搜寻，发现footer相关代码在`themes/icarus-2.6.0/common/footer.ejs`中，这样一来就简单了。
找到footer文件相关代码，并直接添加上备案链接，并将版权信息有©2020改为©2016-2020
```html
<p class="is-size-7">
<a target="_blank" href="http://www.beian.miit.gov.cn/">滇ICP备19011321号</a><br/>
&copy; 2016 - <%= date(new Date(), 'YYYY') %> <%= author || title %>&nbsp;
Powered by <a href="https://hexo.io/" target="_blank" rel="noopener">Hexo</a> & <a
href="https://github.com/ppoffice/hexo-theme-icarus" target="_blank" rel="noopener">Icarus</a>
<% if (busuanzi) { %>
<br>
<span id="busuanzi_container_site_uv">
<%- _p('plugin.visitor', '<span id="busuanzi_value_site_uv">0</span>') %>
</span>
<% } %>
```
#### 站长统计
直接将CNZZ站长统计代码也一股脑加到FOOTER代码里
```html
<script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? "https://" : "http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1272907019'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s19.cnzz.com/z_stat.php%3Fid%3D1272907019%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));</script>
```
大功告成!
{%asset_img footer.png%}

### 关闭"跳转到更多"
从文章列表页点击到某篇文章后，由于锚点URL，会自动跳转到more之下的部分。要关闭此特性，可直接修改`themes/icarus-2.6.0/common/article.ejs`。   
在80行左右将URL锚点`#more`删除
原代码段↓
```html
<a class="button is-size-7 is-light" href="<%- url_for(post.path) %>#more"><%= __('article.more') %></a>
```
更改为↓
```html
<a class="button is-size-7 is-light" href="<%- url_for(post.path) %>"><%= __('article.more') %></a>
```

### 加入文章版权信息
在`themes/icarus-2.6.0/common/article.ejs`找到如下代码段:
```html
<div class="content">
    <%- index && post.excerpt ? post.excerpt : post.content %>
</div>
```
并在其之后添加版权内容
```html
<% if (!(index && post.excerpt)) { %>
    <div class="post-copyright">
        <p><strong>作者: </strong> zsh2401 <br/>
        <strong>版权声明:</strong> 本博客所有文章除特别声明外，均采用 BY-NC-SA 许可协议。转载请注明出处！
        </p>
    </div>
        
    <style>
        .post-copyright{
            margin: 2em 0 0;
            padding: 0.5em 1em;
            border-left: 3px solid #ff1700;
            background-color: #f9f9f9;
            list-style: none;
            }    
    </style>
<% } %>
```
{%asset_img license.png%}
▲get!

### 结束
其它的小配置就不做赘述了，相信大家的英语阅读水平读懂[Icarus-Documentation](https://blog.zhangruipeng.me/hexo-theme-icarus/categories/)是没啥问题的。另外，这个伊卡洛斯主题真的好好看==，不知道能香多久，先用着吧。    

！！欢迎各位在评论区交流！！

~~哦，对了，不要用蜡糊翅膀，也不要过于高估自己的能力，知己知彼，百战不殆哦！~~