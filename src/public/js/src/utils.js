import "whatwg-fetch";

export default {
    SITE: "http://www.yikeyong.com",
    getData ( api, options, callback ) {
        $.ajax( {
            type: "get",
            url: "/data/" + api,
            dataType: "json",
            data: options,
            success: function ( data ) {
                callback( data );
            },
            error: function ( xhr, status, error ) {
                console.log( status, error );
            }
        } );
    },
    getJSONKeyByValue ( obj, value ) {
        for ( var key in obj ) {
            if ( obj.hasOwnProperty( key ) && obj[ key ] === value ) {
                return key;
            }
        }
    },
    getAverageRGB ( imgEl ) {
        var blockSize = 5, // only visit every 5 pixels
            defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
            canvas = document.createElement( 'canvas' ),
            context = canvas.getContext && canvas.getContext( '2d' ),
            data, width, height,
            i = -4,
            length,
            rgb = { r: 0, g: 0, b: 0 },
            count = 0;
        if ( !context ) {
            return defaultRGB;
        }
        height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
        width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
        context.drawImage( imgEl, 0, 0 );
        try {
            data = context.getImageData( 0, 0, width, height );
        } catch ( e ) {
            return defaultRGB;
        }
        length = data.data.length;
        while ( (i += blockSize * 4) < length ) {
            ++count;
            rgb.r += data.data[ i ];
            rgb.g += data.data[ i + 1 ];
            rgb.b += data.data[ i + 2 ];
            // rgb.a += data.data[i+3];
        }
        // ~~ used to floor values
        rgb.r = ~~(rgb.r / count);
        rgb.g = ~~(rgb.g / count);
        rgb.b = ~~(rgb.b / count);
        // rgb.a = ~~(rgb.a/count);
        return rgb;
    },
    isWeixin () {
        var userAgent = navigator.userAgent.toLowerCase();
        return userAgent.match( /micromessenger/ );
    },
    isWeixinInIphone () {
        var userAgent = navigator.userAgent.toLowerCase();
        return userAgent.match( /iphone os/ ) && userAgent.match( /micromessenger/ );
    },
    isMobile () {
        return /Mobi/i.test( navigator.userAgent );
    },
    isMobile2 () {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test( navigator.userAgent );
    },
    isMobile3 () {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent );
    },
    isVisible ( elem ) {
        var bottom, top, viewBottom, viewTop;
        viewTop = window.pageYOffset;
        viewBottom = viewTop + Math.min( elem.clientHeight, window.innerHeight );
        top = this.offsetTop( elem );
        bottom = top + elem.clientHeight;
        return top <= viewBottom && bottom >= viewTop;
    },
    adjustImgShape ( container, ratio ) {
        var imgs = document.querySelectorAll( container + ' .img-wrap img' );
        [].forEach.call( imgs, function ( img ) {
            img.onload = function () {
                img.parentNode.classList.add( img.naturalWidth / img.naturalHeight >= ratio ? 'img-w' : 'img-h' );
            };
        } );
    },
    getScrollTop () {
        if ( document.documentElement.scrollTop ) {
            return document.documentElement.scrollTop;
        } else {
            return document.body.scrollTop;
        }
    },
    goToTop () {
        if ( document.documentElement.scrollTop ) {
            document.documentElement.scrollTop = 0;
        } else {
            document.body.scrollTop = 0;
        }
    },
    getTimeDiff ( time ) {
        var d = new Date();
        var diff = Math.floor( d.getTime() / 1000 ) - time;

        var thisDate = new Date( time * 1000 ),
            thisYear = thisDate.getFullYear(),
            thisMonth = thisDate.getMonth() + 1,
            thisDay = thisDate.getDate(),
            thisHour = thisDate.getHours(),
            thisMinute = thisDate.getMinutes();

        thisHour = thisHour === 0 ? "00" : thisHour;
        thisMinute = thisMinute === 0 ? "00" : thisMinute;

        if ( diff < 60 ) {
            return ( diff < 1 ? 1 : diff ) + "秒前";
        } else if ( diff >= 60 && diff < 60 * 60 ) {
            return Math.floor( diff / 60 ) + "分钟前";
        } else if ( thisDate.toDateString() === d.toDateString() ) {
            return "今天 " + thisHour + ":" + thisMinute;
        } else if ( thisYear === d.getFullYear() ) {
            return thisMonth + "月" + thisDay + "日 " + thisHour + ":" + thisMinute;
        } else {
            return thisYear + "-" + thisMonth + "-" + thisDay + " " + thisHour + ":" + thisMinute;
        }
    },
    fetchNormal ( url, option, callback, handler ) {
        fetch( url, {
            method: "post",
            body: JSON.stringify( option ),
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json"
            }
        } ).then( function ( res ) {
            if ( res.status === 200 ) {
                return res.json();
            } else {
                var error = new Error();
                error.response = res;
                throw error;
            }
        } ).then( function ( body ) {
            callback( body );
        } ).catch( function ( err ) {
            console.log( err );
            if ( handler ) {
                handler( err );
            }
        } );
    },
    fetchGet ( url, callback, handler ) {
        fetch( url ).then( function ( res ) {
            if ( res.status === 200 ) {
                return res.json();
            } else {
                var error = new Error();
                error.response = res;
                throw error;
            }
        } ).then( function ( body ) {
            callback( body );
        } ).catch( function ( err ) {
            console.log( err );
            if ( handler ) {
                handler( err );
            }
        } );
    },
    fetchForm ( url, submit, callback, handler ) {
        fetch( url, {
            method: "post",
            body: submit,
            credentials: "same-origin"
        } ).then( function ( res ) {
            if ( res.status === 200 ) {
                return res.json();
            } else {
                var error = new Error();
                error.response = res;
                throw error;
            }
        } ).then( function ( body ) {
            callback( body );
        } ).catch( function ( err ) {
            console.log( err );
            if ( handler ) {
                handler( err );
            }
        } );
    },
    reload () {
        if ( this.isWeixin() ) {
            location.href = location.href + "?v=" + 10000 * Math.random();
        } else {
            location.reload();
        }
    }
};