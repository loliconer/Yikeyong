/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

var Detector = {

	canvas: !! window.CanvasRenderingContext2D,
	webgl: ( function () { try { var canvas = document.createElement( 'canvas' ); return !! window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ); } catch( e ) { return false; } } )(),
	workers: !! window.Worker,
	fileapi: window.File && window.FileReader && window.FileList && window.Blob,

	addWebGLMessage: function ( elem ) {
		if( localStorage.language == "zh" ){
			elem.innerHTML = window.WebGLRenderingContext ? [
				'您的显卡不支持<a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a>，<br />',
				'请参考<a href="http://www.meng-me.com/helpWebGL.html">这里</a>查看解决方法。'
			].join( '\n' ) : [
				'您的浏览器不支持<a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a>，<br/>',
				'请升级（IE11及以上或火狐、谷歌、苹果、最新版的QQ、百度、360极速浏览器均可），或者参考<a href="http://get.webgl.org/">这里</a>。'
			].join( '\n' );
		} else {
			elem.innerHTML = "Your browser does not seem to support WebGL, please get a modern browser.<br>IE11+, Firefox, Chrome, Safari, Opera support WebGL well.";
		}

	}

};

// browserify support
if ( typeof module === 'object' ) {

	module.exports = Detector;

}

