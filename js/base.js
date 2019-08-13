var qzUtil = {
	"checkObjById": function (sObj) {
		return (typeof sObj === 'string' && document.getElementById(sObj)) ? true : false;
	},
	"myAddEvent": function (obj, sEvent, sfn) {
		if(obj.attachEvent){
			obj.attachEvent('on' + sEvent, sfn);
		}else{
			obj.addEventListener(sEvent, sfn, false);
		}
	},
	"myRelieve": function (obj, sEvent, sfn) {
		if(obj.detachEvent){
			obj.detachEvent('on' + sEvent, sfn);
		}else{
			obj.removeEventListener(sEvent, sfn, false);
		}
	},
    "getStyle": function (oEle, sAttrNmane) {
        return window.getComputedStyle? window.getComputedStyle(oEle, null)[sAttrNmane] : oEle.currentStyle[sAttrNmane];
    },
    "getKeyCode": function () {
        document.onkeydown = function(ev) {
            var oEvent = ev || event;
            return oEvent.keyCode;
        };
    },
    "getAllChildNodes": function (obj) {
        try {
            var aEle = [];
            var aChild = typeof obj === 'object'? obj.children : [];
            var _this = this;

            for (var i = 0,l = aChild.length; i < l; i++) {
                aEle.push(aChild[i]);
                var aTemp = _this.getAllChildNodes(aChild[i]);
                aEle = aEle.concat(aTemp);//concat() 方法用于连接两个或多个数组。该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。所以这里需要覆盖
            }

            return aEle;
        } catch(e) {
            console.log(e + 'get all child nodes erro');
        }
    },
    "maxValue": function (obj, maxNum) {
        obj.value.length > maxNum ? (obj.value = obj.value.substring(0,maxNum)) : true;
    },
    "bPath": function (sPath) {
        var oWinloc = window.location;
        var sHostPath = oWinloc.pathname;

        if(sHostPath === '/' && sPath === 'index.shtml') {
            return true;
        }else {
            return  ((sHostPath.indexOf(sPath) !== -1) ? true : false);
        }

        return  ((sHostPath.indexOf(sPath) !== -1) ? true : false);
    },
    "currNav": function (aA, sClassName, iNum) {
        var _this = this;

        aA.removeClass(sClassName);
        aA.each(function(index, el) {
            if (_this.bPath($(this).attr('href').toString().split('/')[iNum])) {
                $(this).addClass(sClassName);
            }
        });
    },
    "setFontSize": function (oParent, iNum) {
        try {
            var _this = this;
            var arr = _this.getAllChildNodes(oParent);
            for (var i = arr.length - 1; i >= 0; i--) {
                arr[i].style.fontSize = iNum + 'px';
                arr[i].style.lineHeight = iNum + 16 + 'px';
            }
        } catch(e) {
            console.log(e + '==>set fontsize erro');
        }
    },
    "setImgHeight": function (oParent, oImg, sValue) {
        try {
            var _this = this;
            var oP = typeof oParent === 'object'? oParent : false;
            var oI = null;
            var sV = sValue || 'auto';
            if (oImg) {
                oI = oImg.tagName === 'IMG'? oImg : false;
            }
            if(oP){
                var arr = _this.getAllChildNodes(oP);
                for (var i = arr.length - 1; i >= 0; i--) {
                    if (arr[i].tagName === 'IMG') {
                        arr[i].style.height = sV;
                    }
                }
            }else {
                if(oI) {
                    oI.style.height = sV;
                }
            }
        } catch(e) {
            console.log(e + '==>set img height erro');
        }
    },
    "scroTop": function () {
        var myScroTopObj = {
            "top": document.body.scrollTop || document.documentElement.scrollTop
        };
        var scrollToptimer = setInterval(function () {
            myScroTopObj.top = document.body.scrollTop || document.documentElement.scrollTop;
            var speed = myScroTopObj.top / 6;
            if (document.body.scrollTop!=0) {
                document.body.scrollTop -= speed;
            }else {
                document.documentElement.scrollTop -= speed;
            }
            if (myScroTopObj.top === 0) {
                clearInterval(scrollToptimer);
            }
        }, 30);
        return false;
    },
    "myPrint": function () {
        $('body').jqprint({
            debug: false,
            importCSS: true,
            printContainer: true,
            operaSupport: true
        });
    },
    "closePage": function () {
        var userAgent = navigator.userAgent;
        if(userAgent.indexOf('Firefox') != -1 || userAgent.indexOf('Chrome') !=-1) {
            window.location.href='about:blank';
        }else if(userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1){
            window.opener=null;window.open('about:blank','_self','').close();
        }else {
            window.opener = null;
            window.open('about:blank', '_self');
            window.close();
        }
    },
    "currentTime": function (b1,b2,b3,b4,b5) {
      var now = new Date();
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss = now.getSeconds();			//秒
        var sss = now.getMilliseconds();	//毫秒
        var week = now.getDay();			//星期X(0-6,0代表星期天)
        var clock = year + "-";
        if(month < 10)clock += "0";
        clock += month + "-";
        if(day < 10)clock += "0";
        clock += day + " ";
        if (b1) {
        	if(hh < 10)clock += "0";
        	(b2||b3||b4)?(clock += hh + ":"):(clock += hh);
        }
        if (b2) {
        	if (mm < 10) clock += "0";
        	(b3||b4)?(clock += mm + ":"):(clock += mm);
        }
        if (b3) {
        	if (ss < 10) clock += "0";
        	b4?(clock += ss + ":"):(clock += ss);
        }
        if (b4) {
        	if (sss < 10) clock += "00";
        	if (sss > 10 && sss < 100) clock += "0";
        	clock += sss;
        }
        if (b5) {
        	switch (week) {
        		case 0:
        		clock += " " + "星期日";
        		break;
        		case 1:
        		clock += " " + "星期一";
        		break;
        		case 2:
        		clock += " " + "星期二";
        		break;
        		case 3:
        		clock += " " + "星期三";
        		break;
        		case 4:
        		clock += " " + "星期四";
        		break;
        		case 5:
        		clock += " " + "星期五";
        		break;
        		case 6:
        		clock += " " + "星期六";
        		break;
        		default:
        		break;
        	}
        }
        return clock;
    },
    "getNowTime": function (obj,b1,b2,b3,b4,b5) {
    	var _this = this;
    	var time = null;
    	if (obj) {
    		var timer = setInterval(function () {
    			time = _this.currentTime(b1,b2,b3,b4,b5);
    			obj.innerHTML = time;
    		},20);
    	}
    },
    "doubleSlc": function (obj,sClassName) {
        if (obj) {
            for (var i = (obj.children.length - 1)/2; i >= 0; i--) {
                obj.children[2*i].className = sClassName;
            }
        }
    }
};