/*

配置文件
*/

require.config({
	baseUrl:'js',
	paths:{
		"jquery":"lib/jquery",
		"template":"lib/template",
		"swiper":"lib/swiper",
		"layer":"plug/layer/layer",
		"iscroll":"lib/iscroll",
		"fastclick":"lib/fastclick"
	},
	shim:{
		"template":["jquery"],
		"swiper":["jquery"]
	}
});