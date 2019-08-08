;(function (win, $, udf) {
	"use strict";
	$(function () {
        /* 通用下拉 */
        function qzSelectList(obj,fuc) {
            if (window.jQuery && typeof obj === 'object') {
                var time = obj.time || 200;
                var $oWp = $(obj.sObj);
                var $oDt = $oWp.find('dt').eq(0);
                var $oList = $oWp.find('dd').eq(0);
                var $aOptions = $oList.find('ul li');
                var bOffsele = false;
                var str = typeof obj.str === 'string' ? obj.str : false  || $aOptions.eq(0).text();
                function listMove() {
                    if(!bOffsele) {
                        $oList.stop(true,true).slideDown(time);
                    }else{
                        $oList.stop(true,true).slideUp(time);
                    }
                    bOffsele = !bOffsele;
                }
                $oDt.find('.val').html(str);
                $oDt.on('click', listMove);
                $aOptions.each(function(index, el) {
                    $(this).click(function(event) {
                        $oDt.find('.val').text($(this).text());
                        if(typeof fuc === 'function') fuc();
                    });
                    $(this).on('click', listMove);
                });
                $oWp.hover(function() {
                    $('.selec-wp').css({
                        "z-index": "1"
                    });
                    $(this).css({
                        "z-index": "4"
                    });
                    $oList.css({
                        "z-index": "3"
                    });
                }, function() {
                    $oList.css({
                        "z-index": "2"
                    });
                    if(bOffsele)listMove();
                });
            }
        }
        /* 通用弹出框 */
        function dialogShow(obj) {
            var window_w = $(window).width();
            var window_h = $(window).height();
            var dialog_w = obj.data.obj.outerWidth(true);
            var dialog_h = obj.data.obj.outerHeight(true);
            var scroll_t = document.documentElement.scrollTop || document.body.scrollTop;
            var scroll_l = document.documentElement.scrollLeft || document.body.scrollLeft;

            obj.data.obj.show().css({
                "top": (scroll_t+(window_h/2)),
                "left": (scroll_l+(window_w/2)),
                "margin-left": -(dialog_w/2),
                "margin-top": -(dialog_h/2),
                "z-index": 99
            });
        }
        function dialogHide(obj) {
            $('.com-dialog').hide().css({
                "top": 0,
                "left": 0,
                "margin-left": 0,
                "margin-top": 0,
                "z-index": 0
            });
            try{
                obj.data.obj.hide().css({
                    "top": 0,
                    "left": 0,
                    "margin-left": 0,
                    "margin-top": 0,
                    "z-index": 0
                });
            }catch(e){}
        }
        /* ================================================ */
        //tab
        $('.tab-wrap .tab-wp .h-item').each(function(index, el) {
            $(this).hover(function() {
                $(this).addClass('active').siblings('.h-item').removeClass('active');
                $('.tab-wrap .tab-ct-wp .c-item').eq(index).addClass('show').siblings('.c-item').removeClass('show');
                //关闭基本信息显示得所有弹窗
                dialogHide();
            }, function() {});
        });
        //所在镇(区)下拉
        qzSelectList({
            "sObj": '.szzq-slc',
            "str": '<span style="color:#b9bbbe;">莞城</span>'
        });
        //楼盘所在镇(区)下拉
        qzSelectList({
            "sObj": '.lpszzq-slc',
            "str": '<span style="color:#b9bbbe;">莞城</span>'
        });
        //申请主体信息 历史楼盘选择
        function inputSwitch() {

        }
        //申请主体信息 楼盘名称
        function btnSwitch() {
            if($('.lpmc-slc1 dt .val').text().replace(/\ +/g, "").replace(/[\r\n]/g, "") === '新建楼盘') {
                $('.form-sec .row-wrap .main-in .in5').show();
                $('.lpmc-slc2').show();
                $('.lpmc-slc4').hide();
                if($('.lpmc-slc2 dt .val').text().replace(/\ +/g, "").replace(/[\r\n]/g, "") === '共同开发' && $('.lpmc-slc2').css('display') !== 'none') {
                    $('.lpmc-btn').text('选择开发商').show();
                }else if($('.lpmc-slc2 dt .val').text().replace(/\ +/g, "").replace(/[\r\n]/g, "") === '单独开发' && $('.lpmc-slc2').css('display') !== 'none') {
                    $('.lpmc-btn').hide();
                }
            }else if($('.lpmc-slc1 dt .val').text().replace(/\ +/g, "").replace(/[\r\n]/g, "") === '历史楼盘') {
                $('.form-sec .row-wrap .main-in .in5').hide();
                $('.lpmc-slc2').hide();
                $('.lpmc-slc4').show();
                $('.lpmc-btn').text('修改共有开发商').show();
            }
        }
        //楼盘名称下拉
        qzSelectList({
            "sObj": '.lpmc-slc1',
            "str": '<span style="color:#b9bbbe;">新建楼盘</span>'
        }, btnSwitch);
        qzSelectList({
            "sObj": '.lpmc-slc2',
            "str": '<span style="color:#b9bbbe;">共同开发</span>'
        }, btnSwitch);
        btnSwitch();
        qzSelectList({
            "sObj": '.lpmc-slc4',
            "str": '<span style="color:#b9bbbe;">恒大江畔花园2期</span>'
        });
        //开发商列表弹窗
        $('.lpmc-btn').on('click',{"obj":$('.kfslb-dialog')},dialogShow);
        $('.kfslb-dialog .d-foot .save').on('click',{"obj":$('.kfslb-dialog')},dialogHide);
        $('.kfslb-dialog .d-foot .cancel').on('click',{"obj":$('.kfslb-dialog')},dialogHide);
        $('.kfslb-dialog .d-head .h-wp .creat').on('click',{"obj":$('.kfslb-dialog')},dialogHide);
        //新建开发商弹窗
        $('.kfslb-dialog .d-head .h-wp .creat').on('click',{"obj":$('.xjkfs-dialog')},dialogShow);
        $('.xjkfs-dialog .d-foot .save').on('click',{"obj":$('.xjkfs-dialog')},dialogHide);
        $('.xjkfs-dialog .d-foot .cancel').on('click',{"obj":$('.xjkfs-dialog')},dialogHide);
        //基本信息表格宽度
        var sJbzzTableWidth = 0;
        $('.sbcl-table .table-head .table-item').each(function(){
            sJbzzTableWidth += $(this).outerWidth();
        });
        $('.sbcl-table .table-head').width(sJbzzTableWidth);
        $('.sbcl-table .table-body .table-row').width(sJbzzTableWidth);
        //开发商列表表格宽度
        var sKfslbTableWidth = 0;
        $('.d-table .table-head .cell').each(function(){
            sKfslbTableWidth += $(this).outerWidth();
        });
        $('.d-table .table-head').width(sKfslbTableWidth);
        $('.d-table .row').width(sKfslbTableWidth);
        //备案内容表格宽度
        var sBeianTableWidth = 0;
        $('.beian-table .table-head .table-item').each(function(){
            sBeianTableWidth += $(this).outerWidth();
        });
        $('.beian-table').width(sBeianTableWidth);
        //备案内容下拉
        qzSelectList({
            "sObj": '.banr-slc',
            "str": '<span style="color:#b9bbbe;">请选择备案类型</span>'
        });
        //备案内容 销售状态
        $('.com-table2 .table-body .table-row .c15').each(function(index){
            var $this = $(this);
            $this.hover(function(){
                $this.find('dt').click(function(){
                    $('.com-table2 .table-body .table-row .c15').find('dd').hide();
                    $this.find('dd').show();
                    $this.find('dd .item').click(function(e){
                        $this.find('dt .txt').html(e.target.innerHTML);
                        $this.find('dd').hide();
                    });
                });
            },function(){
                $this.find('dd').hide();
            });
        });
		//end
	});
})(window, jQuery, undefined);