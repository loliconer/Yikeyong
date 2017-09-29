### Ubuntu下快速搭建前端开发环境

整个开发环境包括：Web服务器Nginx、Node.js、Git、IDE（VSCode）、代码仓库。

#### 安装Nginx
```sh
wget http://nginx.org/keys/nginx_signing.key
sudo apt-key add nginx_signing.key
sudo vi /etc/apt/sources.list
#deb http://nginx.org/packages/ubuntu/ zesty nginx
#deb-src http://nginx.org/packages/ubuntu/ zesty nginx
sudo apt update
sudo apt install nginx
```
修改nginx.conf配置，启动nginx：`sudo nginx`。
#### 安装Node.js
下载Node.js安装包
```sh
tar -xvf node.tar.gz
sudo mv node /usr/local
sudo vi /etc/environment
#:/usr/local/bin
reboot
```
#### 安装Git
```sh
sudo apt install git
```
#### 安装VSCode
下载安装包
```sh
sudo dpkg -i code.deb
```
#### 克隆GitHub仓库
```sh
git clone foo.git
cd foo
npm install
```