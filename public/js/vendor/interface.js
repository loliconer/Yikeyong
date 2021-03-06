/*
 * Interface elements for jQuery - http://interface.eyecon.ro
 *
 * Copyright (c) 2006 Stefan Petre
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
jQuery.iUtil = {
    getPosition: function(e) {
        var x = 0;
        var y = 0;
        var restoreStyle = false;
        var es = e.style;
        if (jQuery(e).css('display') == 'none') {
            oldVisibility = es.visibility;
            oldPosition = es.position;
            es.visibility = 'hidden';
            es.display = 'block';
            es.position = 'absolute';
            restoreStyle = true
        }
        var el = e;
        while (el) {
            x += el.offsetLeft + (el.currentStyle ? parseInt(el.currentStyle.borderLeftWidth) || 0 : 0);
            y += el.offsetTop + (el.currentStyle ? parseInt(el.currentStyle.borderTopWidth) || 0 : 0);
            el = el.offsetParent
        }
        el = e;
        while (el && el.tagName && el.tagName.toLowerCase() != 'body') {
            x -= el.scrollLeft || 0;
            y -= el.scrollTop || 0;
            el = el.parentNode
        }
        if (restoreStyle) {
            es.display = 'none';
            es.position = oldPosition;
            es.visibility = oldVisibility
        }
        return {
            x: x,
            y: y
        }
    },
    getSize: function(e) {
        var w = jQuery.css(e, 'width');
        var h = jQuery.css(e, 'height');
        var wb = 0;
        var hb = 0;
        var es = e.style;
        if (jQuery(e).css('display') != 'none') {
            wb = e.offsetWidth;
            hb = e.offsetHeight
        } else {
            oldVisibility = es.visibility;
            oldPosition = es.position;
            es.visibility = 'hidden';
            es.display = 'block';
            es.position = 'absolute';
            wb = e.offsetWidth;
            hb = e.offsetHeight;
            es.display = 'none';
            es.position = oldPosition;
            es.visibility = oldVisibility
        }
        return {
            w: w,
            h: h,
            wb: wb,
            hb: hb
        }
    },
    getPointer: function(event) {
        var x = event.pageX || (event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)) || 0;
        var y = event.pageY || (event.clientY + (document.documentElement.scrollTop || document.body.scrollTop)) || 0;
        return {
            x: x,
            y: y
        }
    }
};

jQuery.iFisheye = {
    build: function(options) {
        return this.each(function() {
            var el = this;
            el.fisheyeCfg = {
                items: jQuery(options.items, this),
                container: jQuery(options.container, this),
                pos: jQuery.iUtil.getPosition(this),
                itemWidth: options.itemWidth,
                itemsText: options.itemsText,
                proximity: options.proximity,
                valign: options.valign,
                halign: options.halign,
                maxWidth: options.maxWidth
            };
            jQuery.iFisheye.positionContainer(el, 0);
            jQuery(window).bind('resize', function() {
                el.fisheyeCfg.pos = jQuery.iUtil.getPosition(el);
                jQuery.iFisheye.positionContainer(el, 0);
                jQuery.iFisheye.positionItems(el)
            });
            jQuery.iFisheye.positionItems(el);
            el.fisheyeCfg.items.bind('mouseover', function() {
                jQuery(el.fisheyeCfg.itemsText, this).get(0).style.display = 'block'
            }).bind('mouseout', function() {
                jQuery(el.fisheyeCfg.itemsText, this).get(0).style.display = 'none'
            });
            jQuery(document).bind('mousemove', function(e) {
                var pointer = jQuery.iUtil.getPointer(e);
                var toAdd = 0;
                if (el.fisheyeCfg.halign && el.fisheyeCfg.halign == 'center') var posx = pointer.x - el.fisheyeCfg.pos.x - (el.offsetWidth - el.fisheyeCfg.itemWidth * el.fisheyeCfg.items.size()) / 2 - el.fisheyeCfg.itemWidth / 2;
                else if (el.fisheyeCfg.halign && el.fisheyeCfg.halign == 'right') var posx = pointer.x - el.fisheyeCfg.pos.x - el.offsetWidth + el.fisheyeCfg.itemWidth * el.fisheyeCfg.items.size();
                else var posx = pointer.x - el.fisheyeCfg.pos.x;
                var posy = Math.pow(pointer.y - el.fisheyeCfg.pos.y - el.offsetHeight / 2, 2);
                el.fisheyeCfg.items.each(function(nr) {
                    distance = Math.sqrt(Math.pow(posx - nr * el.fisheyeCfg.itemWidth, 2) + posy);
                    distance -= el.fisheyeCfg.itemWidth / 2;
                    distance = distance < 0 ? 0 : distance;
                    distance = distance > el.fisheyeCfg.proximity ? el.fisheyeCfg.proximity : distance;
                    distance = el.fisheyeCfg.proximity - distance;
                    extraWidth = el.fisheyeCfg.maxWidth * distance / el.fisheyeCfg.proximity;
                    this.style.width = el.fisheyeCfg.itemWidth + extraWidth + 'px';
                    this.style.left = el.fisheyeCfg.itemWidth * nr + toAdd + 'px';
                    toAdd += extraWidth
                });
                jQuery.iFisheye.positionContainer(el, toAdd)
            })
        })
    },
    positionContainer: function(el, toAdd) {
        if (el.fisheyeCfg.halign)
            if (el.fisheyeCfg.halign == 'center') el.fisheyeCfg.container.get(0).style.left = (el.offsetWidth - el.fisheyeCfg.itemWidth * el.fisheyeCfg.items.size()) / 2 - toAdd / 2 + 'px';
            else if (el.fisheyeCfg.halign == 'left') el.fisheyeCfg.container.get(0).style.left = -toAdd / el.fisheyeCfg.items.size() + 'px';
            else if (el.fisheyeCfg.halign == 'right') el.fisheyeCfg.container.get(0).style.left = (el.offsetWidth - el.fisheyeCfg.itemWidth * el.fisheyeCfg.items.size()) - toAdd / 2 + 'px';
        el.fisheyeCfg.container.get(0).style.width = el.fisheyeCfg.itemWidth * el.fisheyeCfg.items.size() + toAdd + 'px'
    },
    positionItems: function(el) {
        el.fisheyeCfg.items.each(function(nr) {
            this.style.width = el.fisheyeCfg.itemWidth + 'px';
            this.style.left = el.fisheyeCfg.itemWidth * nr + 'px'
        })
    }
};
jQuery.fn.Fisheye = jQuery.iFisheye.build;