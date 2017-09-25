<img class="lozad" data-src="//ww1.sinaimg.cn/large/0060lm7Tly1fju1fz65uqj30qq0gmawt.jpg" width="962" height="598">

配置：超大HPTX板型、两个处理器插座、十二条内存插槽、七条PCI-E x16扩展插槽、SATA 6Gbps与USB 3.0接口等等。

<img class="lozad" data-src="//ww2.sinaimg.cn/large/0060lm7Tly1fju1vls6l5j30dm08jdix.jpg" width="490" height="307">

EVGA表示，该主板仅适合拥有九条或者更多扩展插槽位的大型ATX机箱，安装前可能需要一些改造，而如果要搭建四路SLI系统的话，机箱应该有十个插槽位。

这块主板的芯片组是原本面向服务器和工作站的Intel 5520，支持45nm Xeon 5500以及32nm Xeon 5600系列处理器，最多十二核心二十四线程，并且可以混合使用同系列的不同型号，或者六核心搭配四核心，而桌面版的Core i7-900系列因为只有一条QPI总线而不支持双路并联，无法使用。

供电设计为8+2相PWM，并且支持频率切换，最高1333KHz。内存插槽多达十二条，每路六条，支持双通道和三通道DDR3 ECC/non-ECC，频率1333+MHz，最大容量48GB。

<img class="lozad" data-src="//ww1.sinaimg.cn/large/0060lm7Tly1fju1wyvpwij30fa09fwkv.jpg" width="550" height="339">
<img class="lozad" data-src="//ww3.sinaimg.cn/large/0060lm7Tly1fju1xflceqj30fa09fmxt.jpg" width="550" height="339">
<img class="lozad" data-src="//ww4.sinaimg.cn/large/0060lm7Tly1fju1xudts1j30fa09fgm7.jpg" width="550" height="339">
<img class="lozad" data-src="//ww3.sinaimg.cn/large/0060lm7Tly1fju1yjbmf0j30fa09fzps.jpg" width="550" height="339">

扩展插槽是一字排开的七条红色PCI-E 2.0 x16，因为搭配了两颗NVIDIA NF200桥接芯片而拥有充足的带宽，可以使用第一、三、五、七条(从上往下)组成四路x16全速模式的SLI/CrossFireX系统，全部插满的话上边六条半速x8，边缘的第七条仍是全速x16。

<img class="lozad" data-src="//ww1.sinaimg.cn/large/0060lm7Tly1fju1ywrhjkj30fa09f454.jpg" width="550" height="339">

存储接口方面有：Marvell 9128控制器的两个SATA 6Gbps(红色)、ICH10R南桥的六个SATA 3Gbps(黑色)、JMicron JMB632控制器的两个eSATA 3Gbps(红色)、NEC D720200F1控制器的两个USB 3.0(蓝色)、ICH10R南桥的十个USB 2.0(背部六个黑色)。

<img class="lozad" data-src="//ww1.sinaimg.cn/large/0060lm7Tly1fju1zfmu60j30fa09fq74.jpg" width="550" height="339">
<img class="lozad" data-src="//ww3.sinaimg.cn/large/0060lm7Tly1fju1zorfmuj30fa09fgm1.jpg" width="550" height="339">

网络方面采用了两颗Marvell 88E8057千兆以太网控制器，音频方面则是Realtek ALC889八声道控制器，扩展附件提供了两个LGA1366处理器背板、六条SATA数据线、三条SATA电源线、双路/三路/四路SLI桥接器、四口USB扩展卡、背部I/O挡板等等。

超频技术上自然也是异常丰富，支持掉压控制、一键超频(Dummy OC)、EZ电压读取点、板载CMOS清空和开机重启按钮、PCI-E屏蔽跳线，可以使用E-LEET Tuning Ulitiy超频软件、ECP V3超频套装、EVBot超频控制器。

如此彪悍的配置自然也对供电提出了近乎苛刻的要求。EVGA此前曾经表示，在极端配置下整套系统的峰值功耗会逼近1400W，因此EVGA还会在近期提供一个专门搭配此主板的特制电源，额定功率1200W，峰值输出超过1500W，6+12V输出电路每路电流均可达38A，另外+12V电路和风扇转速均可调。在四路SLI系统中，建议使用此电源或者总功率1500W的多个电源组，并且要有四个八针和五个六针PCI-E辅助供电接头，以及两个八针CPU辅助供电接头。

#### 双至强X5675+4路GTX580sli测试
<img class="lozad" data-src="//ww3.sinaimg.cn/large/0060lm7Tly1fju1zzmrq6j30m80eywil.jpg" width="800" height="538">
<img class="lozad" data-src="//ww3.sinaimg.cn/large/0060lm7Tly1fju21xqk5vj30if0rg7br.jpg" width="663" height="988">
<img class="lozad" data-src="//ww2.sinaimg.cn/large/0060lm7Tly1fju22lp773j30xc0o6npd.jpg" width="1024" height="742">

四张GTX580分别为两块索泰GTX580和两块微星闪电版GTX580，内存方面由于资金不是很充足，只能用一套海盗船C9红梳，两条插在了CPU0也就是1号CPU的内存插槽，剩下一条则分给了CPU1也就是2号CPU的内存插槽（两个CPU都分别必须至少具备1条内存，这样才可以正常工作！）

CPU 散热器方面，本来雪狼的打算是用两个利民银剑，毕竟目前的风冷散热器之王还是银剑和D14这两个，但是由于SR-2主板CPU1位置的空间十分局促，如果要安装银剑，就必须拆掉海盗船内存的散热梳子，权衡再三，雪狼还是决定让CPU散热器妥协了，世界末日的散热性能虽然不及银剑，但是也可以算是目前单塔式散热器中数一数二的型号，使用单塔式散热器，就可以解决空间局促的问题了！

<img class="lozad" data-src="//ww1.sinaimg.cn/large/0060lm7Tly1fju232fhw7j30xc0mfe81.jpg" width="1024" height="689">
<img class="lozad" data-src="//ww3.sinaimg.cn/large/0060lm7Tly1fju23ms4qsj30xc0mfhdt.jpg" width="1024" height="689">

虽然都是高端风冷散热器，但是两个散热器放在一起，还是能看出明显对比，采融世界末日比利民银剑要小不少，甚至大概只相当于银剑的一个单塔大小，不过单塔式散热器和双塔式散热器的选择，还是要看散热性能、空间限制和价值取向多方面的综合考虑。

<img class="lozad" data-src="//ww3.sinaimg.cn/large/0060lm7Tly1fju241vs9kj30xc0mfb29.jpg" width="1024" height="689">

一个优秀的电源是高端PC平台的基础保证，正是这个安耐美1500W金牌电源保证了这台顶级平台的最终完成。这里要重点说一下，这款电源原本就为双CPU系统做了设计，在电源自带的模块线材中，可以找到两组CPU独有的8Pin供电接口。

在一块主板上同时安装两颗CPU，这里要注意的是，两颗CPU的体质不完全相同，将体质稍差的一颗安装在左边的CPU0号插座，因为这个插座可以使用散热性能更好的利民银剑散热器，体质较好的一颗安装在右边的CPU1号插座，这样可以争取在超到同样频率的情况下，两颗CPU尽量压制在同一温度，从而可以在冲击更高频率的时候，整套系统不会因为其中一颗CPU的温度过高而太早结束测试。

涂上硅脂，使用的是MX-4硅脂，这款硅脂具有比利民或者采融自带硅脂更佳的导热性能，9点式涂抹法。

<img class="lozad" data-src="//ww1.sinaimg.cn/large/0060lm7Tly1fju24i9l1jj30op0eeh8x.jpg" width="889" height="518">

安装内存，由于只有一套海盗船C9红梳，所以三条内存只能分开安装（两个CPU分别至少具有1条内存），在CPU0位置安装2条组建双通道（CPU0 为优先级，经过测试，系统可以识别CPU0位置的单、双或者三通道内存，而无法正确识别CPU1位置的），在CPU1位置安装了1条内存。

安装显卡，连接SLI桥接器，注意连接的顺序为1-2、3-4、2-4，为什么不使用那种很YY的4路SLI硬桥接器？通过下图大家应该看见了，微星闪电版GTX580的外壳、散热器支架、散热鳍片、最后一根热管顶端这4个部分都高出SLI金手指一段距离，安装硬桥是完全不可能的，除非把整个显卡散热器换掉。

<img class="lozad" data-src="//ww2.sinaimg.cn/large/0060lm7Tly1fju2508m9uj30xc0mfkjl.jpg" width="1024" height="689">
<img class="lozad" data-src="//ww2.sinaimg.cn/large/0060lm7Tly1fju25hwk4jj30xc0mf7wh.jpg" width="1024" height="689">
<img class="lozad" data-src="//ww1.sinaimg.cn/large/0060lm7Tly1fju263qzczj30xc0mfe81.jpg" width="1024" height="689">

连接电源、硬盘和必须外设，这里虽然没有机箱，但是仍然在理线方面下了不少功夫，如此之多的电源线、SATA线、各种转接头和风扇调速线等等一大堆线材，如果直接堆在桌子上，将会混乱无比，简直不堪入目，好好整理以后看上去还是比较整洁的。

通电！开机！风扇灯、显卡PCB指示灯、主板灯等等一起亮起来，整个一光污染典型。显卡上方雪狼还额外放置了一个安耐美阿波利斯扇，这个风扇肉眼看上去非常漂亮，红蓝两种颜色同时开起的模式非常华丽！但是即便是摄影老手的雪狼，都暂时没想出办法把这种肉眼看出的这种效果完美地拍摄出来，有点小遗憾。

<img class="lozad" data-src="//wx1.sinaimg.cn/large/006fVPCvly1fju2me2kz4j30xc0mfb29.jpg" width="1024" height="689">

#### 总结：
1、 4路SLI需要驱动和游戏本身的支持才能发挥力量，例如对SLI支持非常良好的孤岛危机2、战地3和地铁2033，他们的平均帧数几乎都超过了100帧，这样的“硬件杀手”在测试平台的火力下被完美秒杀，但是对于那些对SLI支持不理想的游戏而言，帧数和单卡、双卡时并没有太大改变，例如使命召唤8、黑手党2和街霸4；

2、双路CPU的24个线程同样需要测试软件的多线程支持才能发挥出威力，例如对多线程支持非常理想的CineBench和Speed，它们的测试成绩在24 线程的火力下得到了极大的飞跃！之后，3DMarkVantage的多线程支持也还不错，超频至4.3GHz以后，它的CPU子分直接冲破了10W分大关，不过，经过多次测试，雪狼觉得，3DMarkVantage的最高线程数量似乎也是16，因为，在关闭超线程技术条件下，12个物理核心的成绩比开启超线程技术的成绩要高不少，通过CPU测试场景2的“飞机钻圈圈”的圈圈数量也可以大致数出是16，但这里不好做定论；另外，ZOL超频大赛的基准测试软件——国际象棋测试由于被最高线程16数量的限制，无法发挥出24线程的巨大威力，经过第六届超频大赛的经验，雪狼发现国际象棋测试中，关闭超线程技术，使用完整的12个物理核心测试，成绩要比开启超线程技术情况下要高不少，推测为：开启超线程技术时，测试软件按照线程优先顺序安排下来，就是第一个CPU 的6个物理核心与6个虚拟线程优先安排完毕，再开始安排第二颗CPU，也就是说第二颗CPU的第一个线程从软件的第13个线程才开始，这样就导致了第二颗 CPU只有2个物理核心+2个虚拟线程参加了国际象棋的测试，剩下的4个核心和相应产生的虚拟线程就被完全浪费；

3、温度方面，CPU温度倒是问题不大，在两个高端风冷散热器的压制下，即便是超频至4.3GHz，满载CPU温度也没有超过75°；关键问题在于显卡温度，GTX580本来就是发热大户，加之4块显卡挤在一起，中间的两块显卡满载温度明显高于其它两块，其中，位于最外侧的一块微星闪电版580温度最为理想，由于闪电版580更加优秀的散热设计和这一块显卡在最外面的双重因素，它的满载最高温度都没有超过60°；

4、功耗……这是个大问题，双路X5675+4路GTX580的测试平台在默认频率下待机功耗就达到了恐怖的509W，使用FurMark烤机得到999W，而使用3DMarkVantage跑分时功耗更是达到了1075W；在将CPU超频至4.3GHz（显卡还同时超频至890MHz）时，功耗甚至夸张地冲到了1457W！！！这已经几乎达到了安耐美1500W电源的标称功率值，也已经光荣地超过了雪狼自己家里电磁炉、微波炉和电热水器的功率，成为雪狼家中第一耗电大户了。