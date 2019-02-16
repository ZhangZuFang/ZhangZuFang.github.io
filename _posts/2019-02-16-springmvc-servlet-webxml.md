---
layout: post
title:  "servlet框架和web容器!"
date:   2019-02-16 
categories: SpringMVC
---

web应用的web.xml：初始化配置信息，在没有配置信息的时候，web.xml就不是必须的
 
这里谈论的配置信息是servlet , 因为是基于spring框架的应用，所以具体来说是spring mvc的 dispatcherServlet

spring mvc（servlet） 框架简化了servlet开发（模板代码），让开发者更加专注于业务逻辑的编写
（1）第一步省去了servlet的开发
（2）第二步解耦了controller，继承controller接口 or 使用@Controller定义"controller"

又因为是spring项目，那么必然要初始化spring容器，在这里<init-param>一般指定spring配置文件的位置

(其实提供了参数给servlet,可以在java or jsp中通过

String value = getServletConfig().getInitParameter("parameterName");获取
See advantages of specifying parameter values in web.xml for reasons you would want to use this method

)


所以可见，dispatcherServlet不仅仅是简化servlet开发，提供"request/response",至少还有初始化spring应用配置的功能


