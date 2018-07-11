---
title: Let's encrypt 实现全站https访问
date: 2016/10/17
intro: Ubuntu 16.04下使用 Let's encrypt 实现全站https访问。
---

# Let's encrypt 实现全站https访问

## 1、使用Certbot客户端安装并配置Let's Encrypt

```bash
sudo add-apt-repository ppa:certbot/certbot
sudo apt update
sudo apt install python-certbot-nginx
sudo certbot --nginx
```

添加自动刷新授权定时任务

> crontab -e  
//每周一2:30分执行命令  
30 2 * * 1 letsencrypt renew  
systemctl restart cron

## 2、修改nginx.conf

```nginx
server {
    listen 443;
    server_name  localhost;

    ssl on;
    ssl_certificate /etc/letsencrypt/live/yikeyong.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yikeyong.com/privkey.pem;

    index index.html index.php;
    root /home/www;
}
server {
    listen 80;
    rewrite (.*)  https://$hsot$uri;
}
```

## 3、重启Nginx
