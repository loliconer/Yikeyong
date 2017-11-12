# Ubuntu安装Redis

## 安装
1. [官网](http://redis.io/download)下载tar.gz安装包安装
  ```bash
  tar -zxvf redis-4.0.2.tar.gz
  cd redis-4.0.2
  make
  sudo make install
  ```
2. 复制redis.conf到/etc/redis
  ```bash
  cd ~
  mkdir redis
  cp redis-4.0.2/redis.conf redis
  sudo mv redis /etc
  ```
3. 修改配置
4. 创建日志文件
  ```bash
  cd ~
  touch redis.log
  sudo mv redis.log /var/log
  ```
5. 启动
```bash
redis-server /etc/redis/redis.conf
```
6. 连接
```bash
redis-cli
```

## 配置
> //后台运行  
daemonize yes  
//日志  
logfile "/var/log/redis.log"

## 设置开机自动启动
```bash
chmod +x /etc/init.d/redis
vim /etc/init.d/redis
```
```bash
# chkconfig: 2345 10 90
# description: Start and Stop Redis

PATH=/usr/local/bin:/sbin:/usr/bin:/bin
REDISPORT=6379
EXEC=/usr/local/bin/redis-server
REDIS_CLI=/usr/local/bin/redis-cli
PIDFILE=/var/run/redis.pid
CONF="etc/redis/redis.conf"

case "$1" in
    start)
        if [ -f $PIDFILE ]
        then
            echo "$PIDFILE exists, process is already running or crashed."
        else
            echo "Starting Redis server..."
            $EXEC $CONF
        fi
        if [ "$?"="0" ]
        then
            echo "Redis is running..."
        fi
        ;;
    stop)
        if [ ! -f $PIDFILE ]
        then
            echo "$PIDFILE exists, process is not running."
        else
            PID=$(cat $PIDFILE)
            echo "Stopping..."
            $REDIS_CLI -p $REDISPORT SHUTDOWN
            while [ -x $PIDFILE ]
            do
                echo "Waiting for Redis to shutdown..."
                sleep 1
            done
            echo "Redis stopped"
        fi
        ;;
    restart|force-reload)
        ${0} stop
        ${0} start
        ;;
    *)
        echo "Usage: /etc/init.d/redis {start|stop|restart|force-reload}"
        exit 1
esac
```
```bash
update-rc.d redis-server defaults
```
