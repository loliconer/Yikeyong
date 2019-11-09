!function () {
  var whichBrowser = function(ua) {
    var vendor, version, browser
    var maps = {
      Edge: 'edge',
      Firefox: 'firefox',
      CriOS: 'chrome',
      Version: 'safari',
      Chrome: 'chrome'
    }
    var orders = ['Edge', 'Firefox', 'CriOS', 'Version', 'Chrome']

    for (var i = 0; i < orders.length; i++) {
      var regexp = new RegExp(`(${orders[i]})/(\\d+).`, 'i')
      browser = ua.match(regexp)
      if (browser) {
        if (orders[i] === 'Version' && /Android/i.test(ua)) continue

        vendor = maps[orders[i]]
        version = +browser[2]

        return {
          vendor: vendor,
          version: version
        }
      }
    }

    if (/Trident/i.test(ua)) {
      vendor = 'ie'

      if (ua.includes('rv:11')) {
        version = 11
      } else {
        browser = ua.match(/MSIE\s(\d+)\./i)
        if (browser) {
          version = +browser[1]
        } else {
          version = 6
        }
      }

      return {
        vendor: vendor,
        version: version
      }
    }
  }

  function browserSupported(browser) {
    if (browser.vendor === 'ie' || browser.vendor === 'edge') return false

    if (browser.vendor === 'firefox') return browser.version >= 65
    if (browser.vendor === 'safari') return browser.version >= 11
    if (browser.vendor === 'chrome') return browser.version >= 70
  }

  function hideApp() {
    var style = document.createElement('style')
    style.innerHTML = '#app, app { display: none; } body { background: none; }'
    document.head.appendChild(style)
  }

  var browser = whichBrowser(navigator.userAgent)
  var elem = document.createElement('div')
  elem.style.textAlign = 'center'
  elem.style.padding = '0 10px'
  elem.style.marginTop = '400px'

  if (!browserSupported(browser)) {
    elem.innerHTML = `<h3 style="font-size: 18px;">您的浏览器版本：${browser.vendor} ${browser.version}。</h3>\n<h3 style="font-size: 18px;">本站点支持浏览器：Firefox 65+, Safari 11+, Chrome 70+</h3>`
    document.body.appendChild(elem)
    hideApp()
  }
}()

