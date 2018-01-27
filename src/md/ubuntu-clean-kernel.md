# Ubuntu清除无用的内核文件

Ubuntu在更新系统的时候，有时会由于/boot分区空间不足导致更新失败，此时需要将过期无用的内核文件清除。

## 1、查看当前内核版本

> uname -a

得到类似如下的信息，记下版本号，比如4.4.0-36。

> Linux scott-HaSee 4.4.0-36-generic #55-Ubuntu SMP Thu Aug 11 18:01:55 UTC 2016 x86_64 x86_64 x86_64 GNU/Linux

## 2、列出已存在的内核

> dpkg –get-selections | grep linux

该命令列出系统中存在的所有版本的内核文件，其中版本号小于上一步查到的版本号的文件就是我们要删除的。

## 3、删除内核文件

> apt-get purge linux-image-4.4.0-21-generic
> apt-get purge linux-headers-4.4.0-21-generic

依次方法删除其他过期的内核文件

## 4、更新GRUB启动菜单配置文件

> update-grub

### 附录：

> uname [option]

作用：获取电脑和操作系统的相关信息

*   **-a, - -all**：输出详细信息，格式：内核名称，主机名，内核版本号，内核版本，内核编译时间，处理器类型，硬件平台类型，操作系统名称
    eg: Linux scott-HaSee 4.4.0-36-generic #55-Ubuntu SMP Thu Aug 11 18:01:55 UTC 2016 x86_64 x86_64 x86_64 GNU/Linux
*   **-m, - -machine**：硬件平台类型
    eg: x86_64
*   **-r, - -release**：内核版本号
    eg: 4.4.0-36-generic
*   **-s, - -sysname**：内核名称
    eg: Linux
*   **-v, - -version**：内核是第几个版本以及编译时间
    eg: #55-Ubuntu SMP Thu Aug 11 18:01:55 UTC 2016
*   **-p**：处理器类型
    eg: x86_64
*   **-o**：操作系统名称
    eg: GNU/Linux
