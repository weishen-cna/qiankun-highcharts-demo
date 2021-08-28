# qiankun-highcharts-demo

#### 问题描述：
> 子应用引入 highcharts 并绘制 **圆堆积图（packedbubble）**，
> 单独访问子应用时，页面正常，
> 当**作为微应用**在主应用中正常访问时，圆堆积图初始化会**轻微卡顿**，
> 如果**打开控制台**后访问，则会严重卡顿

#### 期望
> 希望无论控制台打开与否，都可以和有和原生访问类似的体验
> 希望可以尽快告知原因及解决办法

#### 缺陷复现代码 
https://github.com/yushungong/qiankun-highcharts-demo
> **qiankun-main-html** 主应用
> 主应用访问地址 http://localhost:3333/Report/MarketPlaceDashboard
> **sub-project** 子应用
> 子应用访问地址 http://localhost:10200/MarketPlaceDashboard

. qiankun 版本：2.4.4
. 浏览器版本： 92.0.4515.159（正式版本） （64 位）
. 操作系统：windows10