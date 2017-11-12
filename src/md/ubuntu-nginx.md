# Ubuntu安装Nginx

## 官方包安装
添加Nginx签名
> wget <a href="http://nginx.org/keys/nginx_signing.key">http://nginx.org/keys/nginx_signing.key</a>  
apt-key add nginx_signing.key

添加Nginx repository
> vim /etc/apt/sources.list

添加下面两行：codename为Ubuntu系统名称，见下方表格
> deb <a href="http://nginx.org/packages/ubuntu/">http://nginx.org/packages/ubuntu/</a> codename nginx  
deb-src <a href="http://nginx.org/packages/ubuntu/">http://nginx.org/packages/ubuntu/</a> codename nginx

更新源，安装
> apt update  
apt install nginx

[官方文档](http://nginx.org/en/docs)

安装后的目录：
> /etc/logrotate.d/nginx  
/etc/nginx  
/etc/default/nginx  
/etc/init.d/nginx

修改配置：
> vim /etc/nginx/nginx.conf  
vim /etc/nginx/conf.d/default.conf

管理命令
> nginx -s signal

- stop //快速退出
- quit //正常退出
- reload //重新加载配置文件
- reopen //重新打开日志文件

| Version | Codename |
| --- | --- |
| 12.04 | precise |
| 14.04 | trusty |
| 16.04 | xenial |
| 17.04 | zesty |
