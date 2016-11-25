// JavaScript Document


//通用全局方法
; (function ($) {
	$.extend({

		//确认提示框
		confirmInfo: function (options) {

			var opts = $.extend({
				title: '确认信息',
				text: '确认要删除吗？',
				sure: function () { },
				cancel: function () { }
			}, options);
			//alert('a');
			var str = '<div class="confirmpop" id="confirmPop"><div class="confirm_title clearfix"><h3>' + opts.title + '</h3><a id="confirmPopClose">×</a></div><div class="confirm_con"><p>' + opts.text + '</p><div class="confirmbtn_Wrap"><a id="confirmSureBtn">确认</a><a id="confirmCancelBtn">取消</a></div></div></div>';

			$(str).appendTo('body');
			var cp = $('#confirmPop'),
				cpc = $('#confirmPopClose'),
				cpsb = $('#confirmSureBtn'),
				spcb = $('#confirmCancelBtn');
			cpc.click(function () {
				confirmPopDel();
			});
			cpsb.click(function () {
				confirmPopDel();
				opts.sure();
			});
			spcb.click(function () {
				confirmPopDel();
				opts.cancel();
			});
			function confirmPopDel() {
				$.closePop('confirmPop');
				cp.remove();
			};

			$.popupEle('confirmPop');
			cp.show();
		},

		//弹出提示信息
		popupTips: function (words) {
			var tipsClass = $('div.popup_tips_div');
			if (tipsClass.length != 0) {
				tipsClass.remove();
			};
			$('<div class="popup_tips_div" id="popupTipsDiv">' + words + '</div>').appendTo('body');
			var tipsId = $('#popupTipsDiv');
			tipsId.css({
				padding: '20px 40px',
				//background : 'url(images/opacity-bg.png) repeat',
				borderRadius: '5px',
				color: '#FFF',
				display: 'none',
				font: '16px "微软雅黑"',
				lineHeight: '24px'
			});
			tipsHeight = parseInt(tipsId.height()) + 40;
			tipsWidth = parseInt(tipsId.width()) + 80;
			$.popui({
				popupEle: 'popupTipsDiv',
				popRoll: false,
				overlay: false,
				autoHide: true,
				timeout: 2000,
				popCss: {
					background: 'none',
					height: tipsHeight,
					width: tipsWidth
				}
			});
			var timer = setTimeout(function () {
				tipsId.remove();
			}, 2050);
		},


		//iframe弹出
		iframePop: function (url, iheight, iwidth) {
			var iframeStr = '<div class="iframe_wrap" id="iframeWrap"><a class="iframe_wrap_close" id="iframeWrapClose"></a><div class="iframe_wrap_con"><iframe src="' + url + '" id="iframeCon" frameborder="0" scrolling="auto"></iframe></div></div>'
			$(iframeStr).appendTo($('body'));
			$('#iframeWrap').css({
				height: iheight + 10,
				width: iwidth + 10
			});
			$('#iframeCon').attr({
				height: iheight,
				width: iwidth
			});
			$.popui({
				popupEle: 'iframeWrap',
				overlay: true,
				popRoll: false,
				overlayCss: {
					background: '#000',
					opacity: 0.6
				},
				popCss: {
					background: 'none'
				}
			});
			$('#iframeWrapClose').click(function () {
				$.closepop({ popupEle: 'iframeWrap' });
				$('#iframeWrap').remove();
			});
		},
		DialogPop: function (id, iheight, iwidth) {
			var iframeStr = '<div class="iframe_wrap" id="DialogWrap"><a class="iframe_wrap_close" id="DialogWrapClose"></a><div id="' + id + '" class="topoview Dialog_wrap_con"></div></div>';
			$(iframeStr).appendTo($('body'));
			$('#DialogWrap').css({
				height: iheight + 10,
				width: iwidth + 10
			});
			$('#' + id).css({
				height: iheight,
				width: iwidth
			}); 
			$.popui({
				popupEle: 'DialogWrap',
				overlay: true,
				popRoll: false,
				overlayCss: {
					background: '#000',
					opacity: 0.6
				},
				popCss: {
					background: 'none'
				}
			});
			$('#DialogWrapClose').click(function () {
				$.closepop({ popupEle: 'DialogWrap' });
				$('#DialogWrap').remove();
			});
		}
	});
})(jQuery);

//input输入inputval
//<div class="input_wrap">
//	<input type="text" />
//	<span>请输入</span> 
//</div>
//$('element').inputval({
//	height: 45,    
//	width: 599
//});
(function ($) {
	$.fn.inputval = function (options) {
		var opts = $.extend({}, $.fn.inputval.defaults, options);
		return this.each(function () {
			var $this = $(this),
				span = $this.children('span'),
				input = $this.children('input');

			$this.css({
				height: opts.height,
				width: opts.width
			});
			iscss(span);
			iscss(input);
			function iscss(ele) {
				ele.css({
					height: opts.height,
					width: opts.width - 10,
					lineHeight: opts.height + 'px'
				});
			}
			inputfunc(span, input);
		});
	};

	$.fn.inputval.defaults = {
		height: 24,
		width: 300
	};

})(jQuery);


//textarea_wrap输入框
//<div class="textarea_wrap">
//	<textarea></textarea>
//	<span>请输入</span>
//</div>
//$('element').textareaval({
//	height: 100,    
//	width: 400
//});
(function ($) {
	$.fn.textareaval = function (options) {
		var opts = $.extend({}, $.fn.textareaval.defaults, options);
		return this.each(function () {
			var $this = $(this),
				span = $this.children('span'),
				textarea = $this.children('textarea');

			$this.css({
				height: opts.height,
				width: opts.width
			});
			textarea.css({
				height: opts.height - 10,
				width: opts.width - 10,
				maxHeight: opts.height - 10,
				maxWidth: opts.width - 10
			});
			span.css({
				width: opts.width - 10
			});
			inputfunc(span, textarea);
		});
	};
	$.fn.textareaval.defaults = {
		height: 24,
		width: 300
	};
})(jQuery);


function inputfunc(span, ele) {
	var eleVal = ele.val();
	if (eleVal != '') {
		ele.show();
		span.hide();
	};
	ele.focus(function () {
		span.hide();
	});
	ele.blur(function () {
		var thisVal = $(this).val();
		if (thisVal == '') {
			span.show();
		} else {
			span.hide();
		}
	});
	span.click(function () {
		span.hide();
		ele.focus();
	});
}


//下拉选择dropdown
//<div class="dropdown">
//	<input readonly type="text" value="请选择" />
//	<div class="dropdowncon"></div>
//</div>
//$('element').pulldown({
//	height: 45,    
//	width: 288
//});
(function ($) {
	$.fn.pulldown = function (options) {
		var opts = $.extend({}, $.fn.pulldown.defaults, options);
		return this.each(function () {
			var $this = $(this),
				input = $this.children('input'),
				dropdowncon = $this.children('div.dropdowncon');

			$this.css({
				height: opts.height,
				width: opts.width
			});
			input.css({
				height: opts.height,
				width: opts.width - 25,
				lineHeight: opts.height + 'px'
			});
			dropdowncon.css({
				top: opts.height,
				width: opts.width - 10
			});
			pulldownfunc(input, dropdowncon);
		});
	};

	$.fn.pulldown.defaults = {
		height: 24,
		width: 300
	};


})(jQuery);

function pulldownfunc(input, dropdowncon) {
	input.focus(function () {
		$('div.dropdowncon').each(function (i) {
			var $this = $(this);
			if ($this.css('display') == 'block') {
				$this.slideUp(200);
			}
		});
		dropdowncon.slideDown(200);

	});
	input.click(function () {
		return false;
	});
	dropdowncon.click(function () {
		return false;
	});
}

//点击任何地方收起
$(function () {
	$('body').click(function () {
		$('div.dropdowncon').slideUp(200);
	});
});


/*
 * smartMenu.js 智能上下文菜单插件
 * http://www.zhangxinxu.com/
 *
 * Copyright 2011, zhangxinxu
 *
 * 2011-05-26 v1.0	编写
 * 2011-06-03 v1.1	修复func中this失准问题
 * 2011-10-10 v1.2  修复脚本放在<head>标签中层无法隐藏的问题
 * 2011-10-30 v1.3  修复IE6~7下二级菜单移到第二项隐藏的问题
 */
 
(function($) {
	var D = $(document).data("func", {});	
	$.smartMenu = $.noop;
	$.fn.smartMenu = function(data, options) {
		var B = $("body"), defaults = {
			name: "",
			offsetX: 2,
			offsetY: 2,
			textLimit: 6,
			beforeShow: $.noop,
			afterShow: $.noop
		};
		var params = $.extend(defaults, options || {});
		
		var htmlCreateMenu = function(datum) {
			var dataMenu = datum || data, nameMenu = datum? Math.random().toString(): params.name, htmlMenu = "", htmlCorner = "", clKey = "smart_menu_";
			if ($.isArray(dataMenu) && dataMenu.length) {
				htmlMenu = '<div id="smartMenu_'+ nameMenu +'" class="'+ clKey +'box">' +
								'<div class="'+ clKey +'body">' +
									'<ul class="'+ clKey +'ul">';
									
				$.each(dataMenu, function(i, arr) {
					if (i) {
						htmlMenu = htmlMenu + '<li class="'+ clKey +'li_separate">&nbsp;</li>';	
					}
					if ($.isArray(arr)) {
						$.each(arr, function(j, obj) {
							var text = obj.text, htmlMenuLi = "", strTitle = "", rand = Math.random().toString().replace(".", "");
							if (text) {
								if (text.length > params.textLimit) {
									text = text.slice(0, params.textLimit)	+ "…";
									strTitle = ' title="'+ obj.text +'"';
								}
								if ($.isArray(obj.data) && obj.data.length) {
									htmlMenuLi = '<li class="'+ clKey +'li" data-hover="true">' + htmlCreateMenu(obj.data) +
										'<a href="javascript:" class="'+ clKey +'a"'+ strTitle +' data-key="'+ rand +'"><i class="'+ clKey +'triangle"></i>'+ text +'</a>' + 
									'</li>';
								} else {
									htmlMenuLi = '<li class="'+ clKey +'li">' +
										'<a href="javascript:" class="'+ clKey +'a"'+ strTitle +' data-key="'+ rand +'">'+ text +'</a>' + 
									'</li>';
								}
								
								htmlMenu += htmlMenuLi;
								
								var objFunc = D.data("func");
								objFunc[rand] = obj.func;
								D.data("func", objFunc);
							}
						});	
					}
				});
				
				htmlMenu = htmlMenu + '</ul>' +
									'</div>' +
								'</div>';
			}
			return htmlMenu;
		}, funSmartMenu = function() {
			var idKey = "#smartMenu_", clKey = "smart_menu_", jqueryMenu = $(idKey + params.name);
			if (!jqueryMenu.size()) {
				$("body").append(htmlCreateMenu());
				
				//事件
				$(idKey + params.name +" a").bind("click", function() {
					var key = $(this).attr("data-key"),
						callback = D.data("func")[key];
					if ($.isFunction(callback)) {
						callback.call(D.data("trigger"),$(this));	
					}
					$.smartMenu.hide();
					return false;
				});
				$(idKey + params.name +" li").each(function() {
					var isHover = $(this).attr("data-hover"), clHover = clKey + "li_hover";
					
					$(this).hover(function() {
						var jqueryHover = $(this).siblings("." + clHover);
						jqueryHover.removeClass(clHover).children("."+ clKey +"box").hide();
						jqueryHover.children("."+ clKey +"a").removeClass(clKey +"a_hover");
						
						if (isHover) {					
							$(this).addClass(clHover).children("."+ clKey +"box").show();
							$(this).children("."+ clKey +"a").addClass(clKey +"a_hover");	
						}
						
					});
					
				});
				return $(idKey + params.name);
			} 
			return jqueryMenu;
		};
		
		$(this).each(function() {
			this.oncontextmenu = function(e) {
				//回调
				if ($.isFunction(params.beforeShow)) {
					params.beforeShow.call(this);	
				}
				e = e || window.event;
				//阻止冒泡
				e.cancelBubble = true;
				if (e.stopPropagation) {
					e.stopPropagation();
				}
				//隐藏当前上下文菜单，确保页面上一次只有一个上下文菜单
				$.smartMenu.hide();
				var st = D.scrollTop();
				var jqueryMenu = funSmartMenu();
				if (jqueryMenu) {
					jqueryMenu.css({
						display: "block",
						left: e.clientX + params.offsetX,
						top: e.clientY + st + params.offsetY
					});
					D.data("target", jqueryMenu);
					D.data("trigger", this);
					//回调
					if ($.isFunction(params.afterShow)) {
						params.afterShow.call(this);	
					}
					return false;
				}
			};
		});
		if (!B.data("bind")) {
			B.bind("click", $.smartMenu.hide).data("bind", true);
		}
	};
	$.extend($.smartMenu, {
		hide: function() {
			var target = D.data("target");
			if (target && target.css("display") === "block") {
				target.hide();
			}		
		},
		remove: function() {
			var target = D.data("target");
			if (target) {
				target.remove();
			}
		}
	});
})(jQuery);