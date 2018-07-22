import Viewer from './widgets/viewer.vue'

function layout(imgs) {
  function _update(wrap, width, height) {
    wrap.style.width = width / height * 200 + 'px'
    wrap.style.flexGrow = width / height
    setTimeout(() => {
      wrap.style.height = wrap.offsetWidth * height / width + 'px'
    }, 100)
  }

  imgs.forEach(img => {
    if (img.complete) {
      _update(img.parentNode, img.naturalWidth, img.naturalHeight)
    } else {
      img.onload = ev => {
        const elem = ev.target
        _update(elem.parentNode, elem.naturalWidth, elem.naturalHeight)
      }
    }
  })
}

new Vue({
  el: '#app',
  data: {
    type: null,
    imgs: [
      ['beauty/可爱/Lovelydoll/Lovelydoll_车模0001.jpg', 'lovelydoll'],
      ['beauty/可爱/kawaii0001.jpg', 'kawaii'],
      ['beauty/校园女生/nvsheng0001.jpg', 'nvsheng'],
      ['beauty/真女神/nvshen0001.jpg', 'nvshen'],
      ['sexy/ChinaJoy/2009CJ0001.jpg', '2009cj1'],
      ['sexy/ChinaJoy/2009崔志云0001.jpg', '2009cj2'],
      ['beauty/知名美女/warmmemory0001.jpg', ''],
      ['beauty/网络红人/SNH48鞠婧祎0001.jpg', ''],
      ['beauty/自拍/zipai0001.jpg', ''],
      ['beauty/街拍/jiepai0001.jpg', ''],
      ['favorite/favorite0001.jpg', ''],
      ['cos/cosplay0401.jpg', ''],
      ['cos/miyuko/coser0001.jpg', ''],
      ['cos/下限少女/xiaxiangirl0001.jpg', ''],
      ['cos/仙剑五/唐雨柔0001.jpg', ''],
      ['cos/初音家族/初音未来超美COS0001.jpg', ''],
      ['cos/古剑奇谭/gjqt0001.jpg', ''],
      ['cos/女仆/maid0001.jpg', ''],
      ['cos/女校生/nvxiaosheng0001.jpg', ''],
      ['cos/女狐忍者与女机械人/HotaruTrixie0001.jpg', ''],
      ['cos/寒月/魔兽世界暗夜精灵0001.jpg', ''],
      ['cos/小乔cosplay/xiaoqiao0001.jpg', ''],
      ['cos/柳侑绮/eva0001.jpg', ''],
      ['cos/猫子_猫梓/猫子_猫梓001.jpg', ''],
      ['cos/穿越火线/crossfire0001.jpg', ''],
      ['cos/绝对领域/absolutearea0001.jpg', ''],
      ['cos/美萌浅浅/美萌浅浅0001.jpg', '']
    ]
  },
  components: { Viewer },
  methods: {
    view(type) {
      if (type === '') return
      this.$refs.viewer.show(type)
    }
  },
  mounted() {
    layout(this.$el.querySelectorAll('.px-500 img'))
  }
})
