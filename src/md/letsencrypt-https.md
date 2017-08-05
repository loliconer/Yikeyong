### Let's encrypt 实现全站https访问

#### 1、安装并配置Let's Encrypt

```bash
apt-get install letsencrypt
letsencrypt certonly - -webroot -w /home/www -d yikeyong.com -d www.yikeyong.com
letsencrypt renew --dry-run --agree-tos
```

添加自动刷新授权定时任务

> crontab -e  
//每周一2:30分执行命令  
30 2 * * 1 letsencrypt renew

#### 2、修改nginx.conf

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
    server_name localhost;
    return 301 https://$host$request_uri;
}
```

#### 3、重启Nginx
