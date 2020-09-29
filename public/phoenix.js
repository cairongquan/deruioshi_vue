const phoenix = {};

phoenix.dateFormater = function (e, a) {
    var t = a ? a : new Date;
    t = t.toString();
    var n = a ? new Date(t.replace(/-/g, "/")) : new Date
        , i = n.getFullYear() + ""
        , l = n.getMonth() + 1
        , r = n.getDate()
        , o = n.getHours()
        , c = n.getMinutes()
        , d = n.getSeconds();
    return e.replace(/YYYY|yyyy/g, i).replace(/YY|yy/g, i.substr(2, 2)).replace(/MM/g, (10 > l ? "0" : "") + l).replace(/DD/g, (10 > r ? "0" : "") + r).replace(/HH|hh/g, (10 > o ? "0" : "") + o).replace(/mm/g, (10 > c ? "0" : "") + c).replace(/ss/g, (10 > d ? "0" : "") + d)
}

    ,
    phoenix.timeAgo = function (e) {
        var t = e ? e : new Date;
        e = t.toString();
        var a = new Date
            , n = a - new Date(e.replace(/-/g, "/"))
            , i = ""
            , l = n / 31104000000
            , r = n / 2592000000
            , s = n / 604800000
            , o = n / 86400000
            , c = n / 3600000
            , d = n / 60000;
        return i = 1 <= l ? parseInt(l) + "\u5E74\u524D" : 1 <= r ? parseInt(r) + "\u4E2A\u6708\u524D" : 1 <= s ? parseInt(s) + "\u5468\u524D" : 1 <= o ? parseInt(o) + "\u5929\u524D" : 1 <= c ? parseInt(c) + "\u4E2A\u5C0F\u65F6\u524D" : 1 <= d ? parseInt(d) + "\u5206\u949F\u524D" : "\u521A\u521A",
            i
    }
    ,
    phoenix.formCheck = function (inputs, success, error) {
        if (!inputs || 0 === inputs.length)
            return void ("function" == typeof error && error("\u8F93\u5165\u5185\u5BB9\u4E0D\u89C4\u8303\uFF01"));
        for (var f = !0, values = [], i = 0; i < inputs.length; i++) {
            values.push(inputs[i].value);
            var v = inputs[i].value
                , n = inputs[i].getAttribute("data-name")
                , r = inputs[i].getAttribute("data-required")
                , p = inputs[i].getAttribute("data-pattern")
                , u = inputs[i].getAttribute("data-rule");
            if ("1" === r && !v) {
                "function" == typeof error && error(n + "\u4E0D\u80FD\u4E3A\u7A7A\uFF01"),
                    f = !1;
                break
            }
            if (p) {
                var filter = eval("/" + p + "/");
                if (!filter.test(v)) {
                    "function" == typeof error && error(u ? n + "\u683C\u5F0F\u5E94\u4E3A\uFF1A" + u : n + "\u8F93\u5165\u683C\u5F0F\u4E0D\u6B63\u786E!"),
                        f = !1;
                    break
                }
            }
        }
        "function" == typeof success && f && success(values)
    }
    ,
    phoenix.loading = function () {
        document.querySelector("#pluginWrap").innerHTML = "<div class=\"loading_wrap\"><div class=\"loading\"><div class=\"loading_img\"></div></div></div>"
    }
    ,
    phoenix.pluginRemove = function () {
        document.querySelector("#pluginWrap").innerHTML = ""
    }
    ,
    phoenix.removeMapLogo = function (e) {
        e.querySelector(".amap-logo") && e.querySelector(".amap-logo").parentNode.removeChild(e.querySelector(".amap-logo"));
        e.querySelector(".amap-copyright") && e.querySelector(".amap-copyright").parentNode.removeChild(e.querySelector(".amap-copyright"))
    }
    ,
    phoenix.geoDistance = function (e, t) {
        var a = Math.cos
            , n = Math.pow
            , i = Math.sin
            , l = Math.PI
            , r = e[1] * l / 180
            , o = t[1] * l / 180
            , c = e[0] * l / 180 - t[0] * l / 180
            , d = 2 * Math.asin(Math.sqrt(n(i((r - o) / 2), 2) + a(r) * a(o) * n(i(c / 2), 2)));
        return d *= 6378.137,
            d = Math.round(1e4 * d) / 1e4,
            d
    }
    ,
    phoenix.setBlank = function (e, t) {
        if (e) {
            e.querySelector(".null") && e.removeChild(e.querySelector(".null")),
                t || (t = "\u6682\u65E0\u4FE1\u606F");
            var a = document.createElement("div");
            return a.classList.add("null"),
                a.innerHTML = "<img src=\"" + phoenix.config.nullImg + "\"><span>" + t + "</span>",
                e.insertBefore(a, e.firstChild),
                a
        }
    }
    ,
    phoenix.imgOSS = function (e, t, a) {
        if (!e || 1 > e.length)
            return phoenix.config.noImg;
        var n = e.substring(e.lastIndexOf(".") + 1, e.length);
        if (n = n.toLowerCase(),
            -1 === "jpgjpegpngbmpgifwebptiff".indexOf(n))
            return phoenix.config.blankImg;
        return e + "?x-oss-process=image/resize,m_fill,w_" + (t || 100) + ",h_" + (a || 100)
    }
    ,
    phoenix.removeHtmlStyle = function (e) {
        var t = "";
        return e && (t = e.replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/g, ""),
            t = t.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (e, t) {
                return "<img src=\"" + t + "?x-oss-process=image/resize,w_800\">"
            })),
            t
    }
    ,
    phoenix.getUrlArgObject = function () {
        for (var e, t = {}, a = location.search.substring(1), n = a.split(","), l = 0; l < n.length; l++)
            if (e = n[l].indexOf("="),
                -1 != e) {
                var r = n[l].substring(0, e)
                    , s = n[l].substring(e + 1);
                t[r] = unescape(s)
            }
        return t
    }
    ,
    phoenix.bytesSize = function (e) {
        var t = "";
        if ("number" != typeof e)
            return "\u672A\u77E5\u5927\u5C0F";
        t = e < .1 * 1024 ? e.toFixed(2) + "B" : e < 1024 * (.1 * 1024) ? (e / 1024).toFixed(2) + "KB" : e < 1024 * (1024 * (.1 * 1024)) ? (e / 1048576).toFixed(2) + "MB" : (e / 1073741824).toFixed(2) + "GB";
        var a = t + ""
            , n = a.indexOf(".")
            , i = a.substr(n + 1, 2);
        if ("00" == i)
            return a.substring(0, n) + a.substr(n + 3, 2);
        return t
    }
    ,
    phoenix.ajax = function (options) {
        function empty() { }
        function obj2Url(e) {
            if (e && e instanceof Object) {
                var t = [];
                for (var a in e)
                    e.hasOwnProperty(a) && ("function" == typeof e[a] && (e[a] = e[a]()),
                        null == e[a] && (e[a] = ""),
                        t.push(a + "=" + e[a]));
                return t.join("&").replace(/%20/g, "+")
            }
            return e
        }
        var opt = {
            url: "",
            async: !0,
            contentType: "application/x-www-form-urlencoded",
            processData: !0,
            type: "GET",
            data: null,
            timeout: phoenix.ajaxConfig.timeout || 5e3,
            dataType: "json",
            before: empty,
            success: empty,
            failed: "none",
            error: empty,
            complete: empty
        };
        for (var i in options)
            options.hasOwnProperty(i) && (opt[i] = options[i]);
        var accepts = {
            script: "text/javascript, application/javascript, application/x-javascript",
            json: "application/json",
            xml: "application/xml, text/xml",
            html: "text/html",
            text: "text/plain"
        }
            , abortTimeout = null
            , xhr = new XMLHttpRequest;
        opt.before(xhr),
            xhr.onreadystatechange = function () {
                if (4 == xhr.readyState) {
                    xhr.onreadystatechange = empty,
                        clearTimeout(abortTimeout);
                    var result, dataType, error = !1;
                    if (200 <= xhr.status && 300 > xhr.status || 304 == xhr.status) {
                        if ("arraybuffer" == xhr.responseType || "blob" == xhr.responseType)
                            result = xhr.response;
                        else {
                            for (var i in result = xhr.responseText,
                                dataType = opt.dataType ? opt.dataType : xhr.getResponseHeader("content-type").split(";", 1)[0],
                                accepts)
                                accepts.hasOwnProperty(i) && -1 < accepts[i].indexOf(dataType) && (dataType = i);
                            try {
                                "script" == dataType ? eval(result) : "xml" == dataType ? result = xhr.responseXML : "json" == dataType && (result = "" == result.trim() ? null : JSON.parse(result))
                            } catch (t) {
                                opt.error(t, xhr),
                                    xhr.abort()
                            }
                        }
                        var verify = phoenix.ajaxConfig.verifyResult(result);
                        "failed" === verify ? "none" === opt.failed ? new phoenix.dialog({
                            title: result.msg
                        }) : opt.failed(result.msg, result) : "success" === verify && opt.success(result, xhr)
                    } else
                        phoenix.ajaxConfig.error(xhr.status),
                            opt.error(xhr.statusText, xhr);
                    opt.complete(result)
                }
            }
            ;
        "GET" == opt.type && (opt.url = null === opt.data ? opt.url : opt.url + "?" + obj2Url(opt.data),
            opt.data = null);
        xhr.open(opt.type, opt.url, opt.async),
            "POST" == opt.type && !1 !== opt.contentType && xhr.setRequestHeader("Content-type", opt.contentType);
        0 < opt.timeout && (abortTimeout = setTimeout(function () {
            xhr.onreadystatechange = empty,
                xhr.abort(),
                opt.error("timeout", xhr)
        }, opt.timeout));
        xhr.setRequestHeader("Authorization", localStorage.getItem("currentUser_token")),
            xhr.send(opt.processData ? obj2Url(opt.data) : opt.data)
    }
    ,
    phoenix.randomString = function (e) {
        for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", a = t.length, n = "", l = 0; l < (e || 32); l++)
            n += t.charAt(Math.floor(Math.random() * a));
        return n
    }
    ,
    phoenix.getFileType = function (e) {
        var t = e.lastIndexOf(".");
        return -1 == t ? "" : e.substring(t + 1, e.length).toLowerCase()
    }
    ,
    phoenix.version = "0.2",
    phoenix.copyright = "\u91D1\u6613\u4E91\uFF1Awww.jinyiyun.com.cn",
    phoenix.ossConfig = {
        accessid: null,
        host: null,
        policy: null,
        signature: null,
        expire: null,
        key: null,
        oss_url: null,
        getConfig: function () {
            var e = this
                , t = Date.parse(new Date) / 1e3;
            (!e.expire || e.expire < t + 3) && phoenix.ajax({
                url: phoenix.config.apiUrl + "alioss_policy",
                type: "get",
                dataType: "json",
                async: !1,
                success: function (t) {
                    e.accessid = t.accessid,
                        e.host = t.host,
                        e.policy = t.policy,
                        e.signature = t.signature,
                        e.expire = parseInt(t.expire),
                        e.key = t.dir,
                        e.oss_url = t.oss_url
                }
            })
        }
    },
    phoenix.addStyleLink = function (e) {
        var t = document.createElement("link");
        t.rel = "stylesheet",
            t.type = "text/css",
            t.href = e;
        var a = document.getElementsByTagName("head")[0];
        a.appendChild(t)
    }
    ,
    phoenix.base64ToFile = function (e, t) {
        for (var a = e.split(","), i = a[0].match(/:(.*?);/)[1], l = atob(a[1]), r = l.length, s = new Uint8Array(r); r--;)
            s[r] = l.charCodeAt(r);
        var o = new Blob([s], {
            type: i
        });
        return o.lastModifiedDate = new Date,
            o.name = t,
            o
    }
    ,
    phoenix.isElement = function (e) {
        return !!(e && (1 == e.nodeType || 9 == e.nodeType))
    }
    ,
    phoenix.createDom = function (e = "DIV", t, a) {
        let n = document.createElement(e);
        return t && (n.className = t),
            a && (n.innerHTML = a),
            n
    }
    ;
//手势
(function (e) {
    function t(e) {
        return Math.sqrt(e.x * e.x + e.y * e.y)
    }
    function a(e, t) {
        return e.x * t.x + e.y * t.y
    }
    function n(e, n) {
        var i = t(e) * t(n);
        if (0 == i)
            return 0;
        var l = a(e, n) / i;
        return 1 < l && (l = 1),
            Math.acos(l)
    }
    function i(e, t) {
        return e.x * t.y - t.x * e.y
    }
    function l(e, t) {
        var a = n(e, t);
        return 0 < i(e, t) && (a *= -1),
            180 * a / Math.PI
    }
    function r(e, t) {
        var a = new o(e);
        return a.add(t),
            a
    }
    var s = Math.abs
        , o = function (e) {
            this.handlers = [],
                this.el = e
        };
    o.prototype.add = function (e) {
        this.handlers.push(e)
    }
        ,
        o.prototype.del = function (e) {
            e || (this.handlers = []);
            for (var t = this.handlers.length; 0 <= t; t--)
                this.handlers[t] === e && this.handlers.splice(t, 1)
        }
        ,
        o.prototype.dispatch = function () {
            for (var e, t = 0, a = this.handlers.length; t < a; t++)
                e = this.handlers[t],
                    "function" == typeof e && e.apply(this.el, arguments)
        }
        ;
    var c = function (e, t) {
        this.element = "string" == typeof e ? document.querySelector(e) : e,
            this.start = this.start.bind(this),
            this.move = this.move.bind(this),
            this.end = this.end.bind(this),
            this.cancel = this.cancel.bind(this),
            this.element.addEventListener("touchstart", this.start, !1),
            this.element.addEventListener("touchmove", this.move, !1),
            this.element.addEventListener("touchend", this.end, !1),
            this.element.addEventListener("touchcancel", this.cancel, !1),
            this.preV = {
                x: null,
                y: null
            },
            this.pinchStartLen = null,
            this.zoom = 1,
            this.isDoubleTap = !1;
        var a = function () { };
        this.rotate = r(this.element, t.rotate || a),
            this.touchStart = r(this.element, t.touchStart || a),
            this.multipointStart = r(this.element, t.multipointStart || a),
            this.multipointEnd = r(this.element, t.multipointEnd || a),
            this.pinch = r(this.element, t.pinch || a),
            this.swipe = r(this.element, t.swipe || a),
            this.tap = r(this.element, t.tap || a),
            this.doubleTap = r(this.element, t.doubleTap || a),
            this.longTap = r(this.element, t.longTap || a),
            this.singleTap = r(this.element, t.singleTap || a),
            this.pressMove = r(this.element, t.pressMove || a),
            this.twoFingerPressMove = r(this.element, t.twoFingerPressMove || a),
            this.touchMove = r(this.element, t.touchMove || a),
            this.touchEnd = r(this.element, t.touchEnd || a),
            this.touchCancel = r(this.element, t.touchCancel || a),
            this._cancelAllHandler = this.cancelAll.bind(this),
            window.addEventListener("scroll", this._cancelAllHandler),
            this.delta = null,
            this.last = null,
            this.now = null,
            this.tapTimeout = null,
            this.singleTapTimeout = null,
            this.longTapTimeout = null,
            this.swipeTimeout = null,
            this.x1 = this.x2 = this.y1 = this.y2 = null,
            this.preTapPosition = {
                x: null,
                y: null
            }
    };
    c.prototype = {
        start: function (a) {
            if (a.touches) {
                "function" == typeof e.tap.start && e.tap.start(a),
                    this.now = Date.now(),
                    this.x1 = a.touches[0].pageX,
                    this.y1 = a.touches[0].pageY,
                    this.delta = this.now - (this.last || this.now),
                    this.touchStart.dispatch(a, this.element),
                    null !== this.preTapPosition.x && (this.isDoubleTap = 0 < this.delta && 250 >= this.delta && 30 > s(this.preTapPosition.x - this.x1) && 30 > s(this.preTapPosition.y - this.y1),
                        this.isDoubleTap && clearTimeout(this.singleTapTimeout)),
                    this.preTapPosition.x = this.x1,
                    this.preTapPosition.y = this.y1,
                    this.last = this.now;
                var n = this.preV
                    , i = a.touches.length;
                if (1 < i) {
                    this._cancelLongTap(),
                        this._cancelSingleTap();
                    var l = {
                        x: a.touches[1].pageX - this.x1,
                        y: a.touches[1].pageY - this.y1
                    };
                    n.x = l.x,
                        n.y = l.y,
                        this.pinchStartLen = t(n),
                        this.multipointStart.dispatch(a, this.element)
                }
                this._preventTap = !1,
                    this.longTapTimeout = setTimeout(function () {
                        this.longTap.dispatch(a, this.element),
                            this._preventTap = !0
                    }
                        .bind(this), 750)
            }
        },
        move: function (e) {
            if (e.touches) {
                var a = this.preV
                    , n = e.touches.length
                    , i = e.touches[0].pageX
                    , r = e.touches[0].pageY;
                if (this.isDoubleTap = !1,
                    1 < n) {
                    var o = e.touches[1].pageX
                        , c = e.touches[1].pageY
                        , d = {
                            x: e.touches[1].pageX - i,
                            y: e.touches[1].pageY - r
                        };
                    null !== a.x && (0 < this.pinchStartLen && (e.zoom = t(d) / this.pinchStartLen,
                        this.pinch.dispatch(e, this.element)),
                        e.angle = l(d, a),
                        this.rotate.dispatch(e, this.element)),
                        a.x = d.x,
                        a.y = d.y,
                        null !== this.x2 && null !== this.sx2 ? (e.deltaX = (i - this.x2 + o - this.sx2) / 2,
                            e.deltaY = (r - this.y2 + c - this.sy2) / 2) : (e.deltaX = 0,
                                e.deltaY = 0),
                        this.twoFingerPressMove.dispatch(e, this.element),
                        this.sx2 = o,
                        this.sy2 = c
                } else {
                    if (null !== this.x2) {
                        e.deltaX = i - this.x2,
                            e.deltaY = r - this.y2;
                        var p = s(this.x1 - this.x2)
                            , u = s(this.y1 - this.y2);
                        (10 < p || 10 < u) && (this._preventTap = !0)
                    } else
                        e.deltaX = 0,
                            e.deltaY = 0;
                    this.pressMove.dispatch(e, this.element)
                }
                this.touchMove.dispatch(e, this.element),
                    this._cancelLongTap(),
                    this.x2 = i,
                    this.y2 = r,
                    1 < n && e.preventDefault()
            }
        },
        end: function (t) {
            if (t.changedTouches) {
                "function" == typeof e.tap.end && e.tap.end(t),
                    this._cancelLongTap();
                var a = this;
                2 > t.touches.length && (this.multipointEnd.dispatch(t, this.element),
                    this.sx2 = this.sy2 = null),
                    this.x2 && 30 < s(this.x1 - this.x2) || this.y2 && 30 < s(this.y1 - this.y2) ? (t.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2),
                        this.swipeTimeout = setTimeout(function () {
                            a.swipe.dispatch(t, a.element)
                        }, 0)) : (this.tapTimeout = setTimeout(function () {
                            a._preventTap || a.tap.dispatch(t, a.element),
                                a.isDoubleTap && (a.doubleTap.dispatch(t, a.element),
                                    a.isDoubleTap = !1)
                        }, 0),
                            !a.isDoubleTap && (a.singleTapTimeout = setTimeout(function () {
                                a.singleTap.dispatch(t, a.element)
                            }, 250))),
                    this.touchEnd.dispatch(t, this.element),
                    this.preV.x = 0,
                    this.preV.y = 0,
                    this.zoom = 1,
                    this.pinchStartLen = null,
                    this.x1 = this.x2 = this.y1 = this.y2 = null
            }
        },
        cancelAll: function () {
            this._preventTap = !0,
                clearTimeout(this.singleTapTimeout),
                clearTimeout(this.tapTimeout),
                clearTimeout(this.longTapTimeout),
                clearTimeout(this.swipeTimeout)
        },
        cancel: function (e) {
            this.cancelAll(),
                this.touchCancel.dispatch(e, this.element)
        },
        _cancelLongTap: function () {
            clearTimeout(this.longTapTimeout)
        },
        _cancelSingleTap: function () {
            clearTimeout(this.singleTapTimeout)
        },
        _swipeDirection: function (e, t, a, n) {
            return s(e - t) >= s(a - n) ? 0 < e - t ? "Left" : "Right" : 0 < a - n ? "Up" : "Down"
        },
        on: function (e, t) {
            this[e] && this[e].add(t)
        },
        off: function (e, t) {
            this[e] && this[e].del(t)
        },
        destroy: function () {
            return this.singleTapTimeout && clearTimeout(this.singleTapTimeout),
                this.tapTimeout && clearTimeout(this.tapTimeout),
                this.longTapTimeout && clearTimeout(this.longTapTimeout),
                this.swipeTimeout && clearTimeout(this.swipeTimeout),
                this.element.removeEventListener("touchstart", this.start),
                this.element.removeEventListener("touchmove", this.move),
                this.element.removeEventListener("touchend", this.end),
                this.element.removeEventListener("touchcancel", this.cancel),
                this.rotate.del(),
                this.touchStart.del(),
                this.multipointStart.del(),
                this.multipointEnd.del(),
                this.pinch.del(),
                this.swipe.del(),
                this.tap.del(),
                this.doubleTap.del(),
                this.longTap.del(),
                this.singleTap.del(),
                this.pressMove.del(),
                this.twoFingerPressMove.del(),
                this.touchMove.del(),
                this.touchEnd.del(),
                this.touchCancel.del(),
                this.preV = this.pinchStartLen = this.zoom = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = this.twoFingerPressMove = null,
                window.removeEventListener("scroll", this._cancelAllHandler),
                null
        }
    },
        "undefined" != typeof module && "object" == typeof exports ? module.exports = c : e.finger = c
}
)(phoenix);
(function (e) {
    function t(e, t, n) {
        for (var l, r = 0, s = t.length; r < s; r++)
            l = t[r],
                a(e, l, n)
    }
    function a(e, t, a) {
        Object.defineProperty(e, t, {
            get: function () {
                return this["_" + t]
            },
            set: function (e) {
                this["_" + t] = e,
                    a()
            }
        })
    }
    function n(e) {
        return "object" == typeof HTMLElement ? e instanceof HTMLElement : e && "object" == typeof e && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName
    }
    function i(e, a) {
        if (!e.___mixCSS3Transform) {
            var i = ["translateX", "translateY", "translateZ", "scaleX", "scaleY", "scaleZ", "rotateX", "rotateY", "rotateZ", "skewX", "skewY", "originX", "originY", "originZ"]
                , l = n(e);
            a || i.push("perspective"),
                e.___mixCSS3Transform = !0,
                t(e, i, function () {
                    var t = e.matrix3d.identity().appendTransform(e.translateX, e.translateY, e.translateZ, e.scaleX, e.scaleY, e.scaleZ, e.rotateX, e.rotateY, e.rotateZ, e.skewX, e.skewY, e.originX, e.originY, e.originZ)
                        , n = (a ? "" : "perspective(" + e.perspective + "px) ") + "matrix3d(" + Array.prototype.slice.call(t.elements).join(",") + ")";
                    l ? e.style.transform = e.style.msTransform = e.style.OTransform = e.style.MozTransform = e.style.webkitTransform = n : e.transform = n
                }),
                e.matrix3d = new r,
                a || (e.perspective = 500),
                e.scaleX = e.scaleY = e.scaleZ = 1,
                e.translateX = e.translateY = e.translateZ = e.rotateX = e.rotateY = e.rotateZ = e.skewX = e.skewY = e.originX = e.originY = e.originZ = 0
        }
    }
    var l = Math.cos
        , s = Math.sin
        , o = .017453292519943295
        , r = function (e, t, a, n, i, l, r, s, o, c, d, p, u, m, g, h) {
            this.elements = window.Float32Array ? new Float32Array(16) : [];
            var f = this.elements;
            f[0] = void 0 === e ? 1 : e,
                f[4] = t || 0,
                f[8] = a || 0,
                f[12] = n || 0,
                f[1] = i || 0,
                f[5] = void 0 === l ? 1 : l,
                f[9] = r || 0,
                f[13] = s || 0,
                f[2] = o || 0,
                f[6] = c || 0,
                f[10] = void 0 === d ? 1 : d,
                f[14] = p || 0,
                f[3] = u || 0,
                f[7] = m || 0,
                f[11] = g || 0,
                f[15] = void 0 === h ? 1 : h
        };
    r.prototype = {
        set: function (e, t, a, n, i, l, r, s, o, c, d, p, u, m, g, h) {
            var f = this.elements;
            return f[0] = e,
                f[4] = t,
                f[8] = a,
                f[12] = n,
                f[1] = i,
                f[5] = l,
                f[9] = r,
                f[13] = s,
                f[2] = o,
                f[6] = c,
                f[10] = d,
                f[14] = p,
                f[3] = u,
                f[7] = m,
                f[11] = g,
                f[15] = h,
                this
        },
        identity: function () {
            return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
                this
        },
        multiplyMatrices: function (e, t) {
            var a = e.elements
                , n = this.elements
                , i = a[0]
                , l = a[4]
                , r = a[8]
                , s = a[12]
                , o = a[1]
                , c = a[5]
                , d = a[9]
                , p = a[13]
                , u = a[2]
                , m = a[6]
                , g = a[10]
                , h = a[14]
                , f = a[3]
                , v = a[7]
                , x = a[11]
                , y = a[15]
                , b = t[0]
                , L = t[1]
                , T = t[2]
                , _ = t[3]
                , C = t[4]
                , k = t[5]
                , M = t[6]
                , w = t[7]
                , S = t[8]
                , D = t[9]
                , E = t[10]
                , I = t[11]
                , H = t[12]
                , A = t[13]
                , V = t[14]
                , Y = t[15];
            return n[0] = i * b + l * C + r * S + s * H,
                n[4] = i * L + l * k + r * D + s * A,
                n[8] = i * T + l * M + r * E + s * V,
                n[12] = i * _ + l * w + r * I + s * Y,
                n[1] = o * b + c * C + d * S + p * H,
                n[5] = o * L + c * k + d * D + p * A,
                n[9] = o * T + c * M + d * E + p * V,
                n[13] = o * _ + c * w + d * I + p * Y,
                n[2] = u * b + m * C + g * S + h * H,
                n[6] = u * L + m * k + g * D + h * A,
                n[10] = u * T + m * M + g * E + h * V,
                n[14] = u * _ + m * w + g * I + h * Y,
                n[3] = f * b + v * C + x * S + y * H,
                n[7] = f * L + v * k + x * D + y * A,
                n[11] = f * T + v * M + x * E + y * V,
                n[15] = f * _ + v * w + x * I + y * Y,
                this
        },
        _rounded: function (e, t) {
            return t = Math.pow(10, t || 15),
                Math.round(e * t) / t
        },
        _arrayWrap: function (e) {
            return window.Float32Array ? new Float32Array(e) : e
        },
        appendTransform: function (e, t, a, n, i, r, c, d, p, u, m, g, h, f) {
            var v = c * o
                , x = this._rounded(l(v))
                , y = this._rounded(s(v))
                , b = d * o
                , L = this._rounded(l(b))
                , T = this._rounded(s(b))
                , _ = p * o
                , C = this._rounded(l(-1 * _))
                , k = this._rounded(s(-1 * _));
            return this.multiplyMatrices(this, this._arrayWrap([1, 0, 0, e, 0, x, y, t, 0, -y, x, a, 0, 0, 0, 1])),
                this.multiplyMatrices(this, this._arrayWrap([L, 0, T, 0, 0, 1, 0, 0, -T, 0, L, 0, 0, 0, 0, 1])),
                this.multiplyMatrices(this, this._arrayWrap([C * n, k * i, 0, 0, -k * n, C * i, 0, 0, 0, 0, 1 * r, 0, 0, 0, 0, 1])),
                (u || m) && this.multiplyMatrices(this, this._arrayWrap([this._rounded(l(u * o)), this._rounded(s(u * o)), 0, 0, -1 * this._rounded(s(m * o)), this._rounded(l(m * o)), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])),
                (g || h || f) && (this.elements[12] -= g * this.elements[0] + h * this.elements[4] + f * this.elements[8],
                    this.elements[13] -= g * this.elements[1] + h * this.elements[5] + f * this.elements[9],
                    this.elements[14] -= g * this.elements[2] + h * this.elements[6] + f * this.elements[10]),
                this
        }
    };
    var c = function (e, t, a, n, i, l) {
        return this.a = null == e ? 1 : e,
            this.b = t || 0,
            this.c = a || 0,
            this.d = null == n ? 1 : n,
            this.tx = i || 0,
            this.ty = l || 0,
            this
    };
    c.prototype = {
        identity: function () {
            return this.a = this.d = 1,
                this.b = this.c = this.tx = this.ty = 0,
                this
        },
        appendTransform: function (e, t, a, n, i, c, d, p, u) {
            if (i % 360)
                var m = i * o
                    , r = l(m)
                    , g = s(m);
            else
                r = 1,
                    g = 0;
            return c || d ? (c *= o,
                d *= o,
                this.append(l(d), s(d), -s(c), l(c), e, t),
                this.append(r * a, g * a, -g * n, r * n, 0, 0)) : this.append(r * a, g * a, -g * n, r * n, e, t),
                (p || u) && (this.tx -= p * this.a + u * this.c,
                    this.ty -= p * this.b + u * this.d),
                this
        },
        append: function (e, t, a, n, i, l) {
            var r = this.a
                , s = this.b
                , o = this.c
                , c = this.d;
            return this.a = e * r + t * o,
                this.b = e * s + t * c,
                this.c = a * r + n * o,
                this.d = a * s + n * c,
                this.tx = i * r + l * o + this.tx,
                this.ty = i * s + l * c + this.ty,
                this
        },
        initialize: function (e, t, a, n, i, l) {
            return this.a = e,
                this.b = t,
                this.c = a,
                this.d = n,
                this.tx = i,
                this.ty = l,
                this
        },
        setValues: function (e, t, a, n, i, l) {
            return this.a = null == e ? 1 : e,
                this.b = t || 0,
                this.c = a || 0,
                this.d = null == n ? 1 : n,
                this.tx = i || 0,
                this.ty = l || 0,
                this
        },
        copy: function (e) {
            return this.setValues(e.a, e.b, e.c, e.d, e.tx, e.ty)
        }
    },
        i.getMatrix3D = function (e) {
            var t = {
                translateX: 0,
                translateY: 0,
                translateZ: 0,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                skewX: 0,
                skewY: 0,
                originX: 0,
                originY: 0,
                originZ: 0,
                scaleX: 1,
                scaleY: 1,
                scaleZ: 1
            };
            for (var a in e)
                e.hasOwnProperty(a) && (t[a] = e[a]);
            return new r().identity().appendTransform(t.translateX, t.translateY, t.translateZ, t.scaleX, t.scaleY, t.scaleZ, t.rotateX, t.rotateY, t.rotateZ, t.skewX, t.skewY, t.originX, t.originY, t.originZ).elements
        }
        ,
        i.getMatrix2D = function (e) {
            var t = {
                translateX: 0,
                translateY: 0,
                rotation: 0,
                skewX: 0,
                skewY: 0,
                originX: 0,
                originY: 0,
                scaleX: 1,
                scaleY: 1
            };
            for (var a in e)
                e.hasOwnProperty(a) && (t[a] = e[a]);
            return new c().identity().appendTransform(t.translateX, t.translateY, t.scaleX, t.scaleY, t.rotation, t.skewX, t.skewY, t.originX, t.originY)
        }
        ,
        "undefined" != typeof module && "object" == typeof exports ? module.exports = i : e.transform = i
}
)(phoenix);
//清除定时器
(function () {
    'use strict';
    Date.now || (Date.now = function () {
        return new Date().getTime()
    }
    );
    for (var e, t = ["webkit", "moz"], a = 0; a < t.length && !window.requestAnimationFrame; ++a)
        e = t[a],
            window.requestAnimationFrame = window[e + "RequestAnimationFrame"],
            window.cancelAnimationFrame = window[e + "CancelAnimationFrame"] || window[e + "CancelRequestAnimationFrame"];
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var n = 0;
        window.requestAnimationFrame = function (e) {
            var t = Date.now()
                , a = Math.max(n + 16, t);
            return setTimeout(function () {
                e(n = a)
            }, a - t)
        }
            ,
            window.cancelAnimationFrame = clearTimeout
    }
}
)();
(function (e) {
    function t(e, t, a) {
        e.addEventListener(t, a, !1)
    }
    function a(e) {
        return s(1 - Math.pow(e - 1, 2))
    }
    function n(e) {
        return 1 - s(1 - e * e)
    }
    function i(e, t) {
        for (var a in t)
            if (t[a].test(e[a]))
                return !0;
        return !1
    }
    var l = Math.abs
        , r = Math.round
        , s = Math.sqrt
        , o = function (a) {
            this.reverse = this._getValue(a.reverse, !1),
                this.element = "string" == typeof a.touch ? document.querySelector(a.touch) : a.touch;
            var n = document.createElement("div");
            n.classList.add("touch_scroller"),
                this.element.insertBefore(n, this.element.firstChild),
                this.target = n;
            var i = document.createElement("div");
            i.classList.add("touch_scroller_list", "clear"),
                this.target.insertBefore(i, this.target.firstChild),
                this.box = i,
                this.pageCurrent = 1,
                this.pageTotal = 1,
                this.URL = a.URL,
                this.creatHTML = a.creatHTML,
                this.parameters = a.parameters || {},
                this.listTotal = 0,
                this.ifGeting = !1,
                this.loadAlready = !1,
                this.complete = a.complete || "",
                this.loading = "",
                this.text = document.createElement("DIV"),
                this.text.classList.add("touch_load_text"),
                this.text.innerHTML = a.refreshText || "\u677E\u5F00\u7ACB\u5373\u5237\u65B0",
                "none" === a.lastText ? this.lastHTML = "<div class=\"touch_last\"></div>" : "none" !== a.lastText && (this.lastHTML = a.lastText ? "<div class=\"touch_last\">-- " + a.lastText + " --</div>" : "<div class=\"touch_last\">-- \u4EE5\u4E0A\u4E3A\u5168\u90E8\u4FE1\u606F --</div>"),
                this.blankText = a.blankText || "",
                this.topHtml = a.topHtml || "";
            var l = this._getValue(a.followers, []);
            this.followers = l.map(function (e) {
                return {
                    element: "string" == typeof e.element ? document.querySelector(e.element) : e.element,
                    offset: e.offset
                }
            }),
                this.vertical = this._getValue(a.vertical, !0),
                this.property = a.property || "translateY",
                this.tickID = 0,
                this.value = this._getValue(a.value, this.target[this.property]),
                this.target[this.property] = this.value,
                this.followers.forEach(function (e) {
                    e.element[this.property] = this.value + e.offset
                }
                    .bind(this)),
                this.fixed = this._getValue(a.fixed, !1),
                this.sensitivity = this._getValue(a.sensitivity, 1),
                this.moveFactor = this._getValue(a.moveFactor, 1),
                this.factor = this._getValue(a.factor, 1),
                this.outFactor = this._getValue(a.outFactor, .3),
                this.min = a.min || -1600,
                this.max = a.max || 0,
                this.deceleration = this._getValue(a.deceleration, 6e-4),
                this.maxRegion = this._getValue(a.maxRegion, 600),
                this.springMaxRegion = this._getValue(a.springMaxRegion, 60),
                this.maxSpeed = a.maxSpeed,
                this.hasMaxSpeed = void 0 !== this.maxSpeed,
                this.lockDirection = this._getValue(a.lockDirection, !0);
            var r = function () { };
            this.change = a.change || r,
                this.touchEnd = a.touchEnd || r,
                this.touchStart = a.touchStart || r,
                this.touchMove = a.touchMove || r,
                this.touchCancel = a.touchCancel || r,
                this.reboundEnd = a.reboundEnd || r,
                this.animationEnd = a.animationEnd || r,
                this.correctionEnd = a.correctionEnd || r,
                this.tap = a.tap || r,
                this.pressMove = a.pressMove || r,
                this.shouldRebound = a.shouldRebound || function () {
                    return !0
                }
                ,
                this.preventDefault = this._getValue(a.preventDefault, !0),
                this.preventDefaultException = {
                    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
                },
                this.hasMin = void 0 !== this.min,
                this.hasMax = void 0 !== this.max,
                this.isTouchStart = !1,
                this.step = a.step || 40,
                this.inertia = this._getValue(a.inertia, !0),
                this._calculateIndex(),
                this.eventTarget = window,
                a.bindSelf && (this.eventTarget = this.element),
                this._moveHandler = this._move.bind(this),
                t(this.element, "touchstart", this._start.bind(this)),
                t(this.eventTarget, "touchend", this._end.bind(this)),
                t(this.eventTarget, "touchcancel", this._cancel.bind(this)),
                this.eventTarget.addEventListener("touchmove", this._moveHandler, {
                    passive: !1,
                    capture: !1
                }),
                this.x1 = this.x2 = this.y1 = this.y2 = null,
                e.transform(this.target, !0)
        };
    o.prototype = {
        isAtMax: function () {
            return this.hasMax && this.target[this.property] >= this.max
        },
        isAtMin: function () {
            return this.hasMin && this.target[this.property] <= this.min
        },
        _getValue: function (e, t) {
            return void 0 === e ? t : e
        },
        stop: function () {
            cancelAnimationFrame(this.tickID),
                this._calculateIndex()
        },
        _start: function (e) {
            this.isTouchStart = !0,
                this.touchStart.call(this, e, this.target[this.property]),
                cancelAnimationFrame(this.tickID),
                this._calculateIndex(),
                this.startTime = new Date().getTime(),
                this.x1 = this.preX = e.touches[0].pageX,
                this.y1 = this.preY = e.touches[0].pageY,
                this.start = this.vertical ? this.preY : this.preX,
                this._firstTouchMove = !0,
                this._preventMove = !1
        },
        _move: function (e) {
            if (this.isTouchStart) {
                var t = e.touches.length
                    , a = e.touches[0].pageX
                    , n = e.touches[0].pageY;
                if (this._firstTouchMove && this.lockDirection) {
                    var r = l(a - this.x1) - l(n - this.y1);
                    0 < r && this.vertical ? this._preventMove = !0 : 0 > r && !this.vertical && (this._preventMove = !0),
                        this._firstTouchMove = !1
                }
                if (!this._preventMove) {
                    var s = (this.vertical ? n - this.preY : a - this.preX) * this.sensitivity
                        , o = this.moveFactor;
                    if (this.isAtMax() && 0 < (this.reverse ? -s : s) ? o = this.outFactor : this.isAtMin() && 0 > (this.reverse ? -s : s) && (o = this.outFactor),
                        s *= o,
                        this.preX = a,
                        this.preY = n,
                        !this.fixed) {
                        var c = this.reverse ? -s : s;
                        this.target[this.property] += c,
                            this.followers.forEach(function (e) {
                                e.element[this.property] += c
                            }
                                .bind(this))
                    }
                    this.min = window.innerHeight < this.box.offsetHeight ? window.innerHeight - this.box.offsetHeight : 0,
                        this.change.call(this, this.target[this.property]);
                    var p = new Date().getTime();
                    300 < p - this.startTime && (this.startTime = p,
                        this.start = this.vertical ? this.preY : this.preX),
                        this.touchMove.call(this, e, this.target[this.property])
                }
                this.preventDefault && !i(e.target, this.preventDefaultException) && e.preventDefault(),
                    1 === t && (null === this.x2 ? (e.deltaX = 0,
                        e.deltaY = 0) : (e.deltaX = a - this.x2,
                            e.deltaY = n - this.y2),
                        this.pressMove.call(this, e, this.target[this.property])),
                    this.x2 = a,
                    this.y2 = n
            }
            50 < this.target[this.property] && !this.element.querySelector(".touch_loading") && this.element.appendChild(this.text)
        },
        _cancel: function (e) {
            var t = this.target[this.property];
            this.touchCancel.call(this, e, t),
                this._end(e)
        },
        to: function (e, t, n, i) {
            this._to(e, this._getValue(t, 600), n || a, this.change, function (e) {
                this._calculateIndex(),
                    this.reboundEnd.call(this, e),
                    this.animationEnd.call(this, e),
                    i && i.call(this, e)
            }
                .bind(this))
        },
        _calculateIndex: function () {
            this.hasMax && this.hasMin && (this.currentPage = r((this.max - this.target[this.property]) / this.step))
        },
        loadNextPage: function () {
            var t = this;
            t.pageCurrent <= t.pageTotal && e.ajax({
                url: t.URL,
                type: "GET",
                data: t.parameters,
                beforeSend: function () {
                    t.ifGeting = !0
                },
                success: function (e) {
                    var a = "";
                    "function" == typeof t.creatHTML ? (a = t.creatHTML(e, t.pageCurrent),
                        t.pageCurrent += 1,
                        t.parameters.page = t.pageCurrent) : a = "<div class=\"touch_blank\">\u65E0\u6570\u636E</div>";
                    t.box.insertAdjacentHTML("beforeend", a),
                        t.pageCurrent > t.pageTotal && 0 < t.listTotal && t.box.insertAdjacentHTML("beforeend", t.lastHTML)
                },
                complete: function () {
                    "function" == typeof t.complete && t.complete(t.pageCurrent - 1),
                        t.ifGeting = !1
                }
            })
        },
        loadFirstPage: function () {
            var t = this;
            t.pageCurrent = 1,
                t.parameters.page = t.pageCurrent,
                t._to(0, 0, a, "", function () {
                    e.ajax({
                        url: t.URL,
                        type: "GET",
                        data: t.parameters,
                        beforeSend: function () {
                            t.ifGeting = !0,
                                e.loading()
                        },
                        success: function (a) {
                            var n = "";
                            t.pageTotal = a.totalPage,
                                t.listTotal = a.total,
                                "function" == typeof t.creatHTML && 0 < t.listTotal ? (n = t.creatHTML(a, t.pageCurrent),
                                    t.pageCurrent += 1,
                                    t.parameters.page = t.pageCurrent) : n = "<div class=\"null\"><img src=\"" + e.config.nullImg + "\"><span>" + t.blankText + "</span></div>";
                            1 === t.pageTotal && 0 < t.listTotal && (n += t.lastHTML);
                            n = t.topHtml + n,
                                t.box.innerHTML = n,
                                t.loadAlready = !0,
                                e.pluginRemove(),
                                t.min = 0
                        },
                        complete: function () {
                            "function" == typeof t.complete && t.complete(t.pageCurrent - 1),
                                t.ifGeting = !1
                        }
                    })
                })
        },
        _end: function (e) {
            if (this.isTouchStart) {
                this.isTouchStart = !1;
                var t = this
                    , i = this.target[this.property]
                    , s = 30 > l(e.changedTouches[0].pageX - this.x1) && 30 > l(e.changedTouches[0].pageY - this.y1);
                if (s && this.tap.call(t, e, i),
                    !1 === this.touchEnd.call(this, e, i, this.currentPage))
                    return;
                if (this.hasMax && i > this.max) {
                    if (!this.shouldRebound(i))
                        return;
                    this._to(this.max, 200, a, this.change, function (e) {
                        this.reboundEnd.call(this, e),
                            this.animationEnd.call(this, e)
                    }
                        .bind(this))
                } else if (this.hasMin && i < this.min) {
                    if (!this.shouldRebound(i))
                        return;
                    this._to(this.min, 200, a, this.change, function (e) {
                        this.reboundEnd.call(this, e),
                            this.animationEnd.call(this, e)
                    }
                        .bind(this))
                } else if (this.inertia && !s && !this._preventMove && !this.fixed) {
                    var o = new Date().getTime() - this.startTime;
                    if (300 > o) {
                        var c = ((this.vertical ? e.changedTouches[0].pageY : e.changedTouches[0].pageX) - this.start) * this.sensitivity
                            , d = l(c) / o
                            , p = this.factor * d;
                        this.hasMaxSpeed && p > this.maxSpeed && (p = this.maxSpeed);
                        var u = 0 > c ? -1 : 1;
                        this.reverse && (u = -u);
                        var m = i + p * p / (2 * this.deceleration) * u
                            , g = 1;
                        m < this.min ? m < this.min - this.maxRegion ? (g = n((i - this.min + this.springMaxRegion) / (i - m)),
                            m = this.min - this.springMaxRegion) : (g = n((i - this.min + this.springMaxRegion * (this.min - m) / this.maxRegion) / (i - m)),
                                m = this.min - this.springMaxRegion * (this.min - m) / this.maxRegion) : m > this.max && (m > this.max + this.maxRegion ? (g = n((this.max + this.springMaxRegion - i) / (m - i)),
                                    m = this.max + this.springMaxRegion) : (g = n((this.max + this.springMaxRegion * (m - this.max) / this.maxRegion - i) / (m - i)),
                                        m = this.max + this.springMaxRegion * (m - this.max) / this.maxRegion));
                        var h = r(d / t.deceleration) * g;
                        t._to(r(m), h, a, t.change, function (e) {
                            if (t.hasMax && t.target[t.property] > t.max) {
                                if (!this.shouldRebound(t.target[t.property]))
                                    return;
                                cancelAnimationFrame(t.tickID),
                                    t._to(t.max, 600, a, t.change, t.animationEnd)
                            } else if (t.hasMin && t.target[t.property] < t.min) {
                                if (!this.shouldRebound(t.target[t.property]))
                                    return;
                                cancelAnimationFrame(t.tickID),
                                    t._to(t.min, 600, a, t.change, t.animationEnd)
                            } else
                                t.step ? t._correction() : t.animationEnd.call(t, e);
                            t.change.call(this, e)
                        })
                    } else
                        t._correction()
                } else
                    t._correction()
            }
            this.x1 = this.x2 = this.y1 = this.y2 = null,
                this.text.parentNode && this.text.parentNode.removeChild(this.text);
            isNaN(i) || !1 !== this.ifGeting || (50 < i ? this.loadFirstPage() : i < this.min + 200 && this.loadNextPage())
        },
        _to: function (e, t, a, n, i) {
            var l = this.target
                , r = this.property
                , s = this.followers
                , o = l[r]
                , c = +new Date
                , d = this
                , p = function () {
                    var u = +new Date - c;
                    if (u >= t)
                        return l[r] = e,
                            n && n.call(d, e),
                            void (i && i.call(d, e));
                    var m = (e - o) * a(u / t) + o;
                    l[r] = m,
                        s.forEach(function (e) {
                            e.element[r] = m + e.offset
                        }),
                        d.tickID = requestAnimationFrame(p),
                        n && n.call(d, l[r])
                };
            p()
        },
        _correction: function () {
            if (void 0 !== this.step) {
                var e = this.target
                    , t = this.property
                    , n = e[t]
                    , i = Math.floor(l(n / this.step))
                    , r = n % this.step;
                l(r) > this.step / 2 ? this._to((0 > n ? -1 : 1) * (i + 1) * this.step, 400, a, this.change, function (e) {
                    this._calculateIndex(),
                        this.correctionEnd.call(this, e),
                        this.animationEnd.call(this, e)
                }
                    .bind(this)) : this._to((0 > n ? -1 : 1) * i * this.step, 400, a, this.change, function (e) {
                        this._calculateIndex(),
                            this.correctionEnd.call(this, e),
                            this.animationEnd.call(this, e)
                    }
                        .bind(this))
            }
        }
    },
        "undefined" != typeof module && "object" == typeof exports ? module.exports = o : e.touch = o
}
)(phoenix);
//路由
(function (e) {
    var t = function () {
        this.route = [],
            this.pageNameStart = "phoenixPage_",
            this.blankPage = "blank",
            this.turnDuration = 300,
            this.turnType = "normal"
    };
    t.prototype = {
        to: function (t) {
            var a = this;
            if ("restart" === t.type) {
                var n = e.config.homeUrl;
                return t.params && (n += "?" + t.path),
                    void (location.href = n)
            }
            if (!t.path)
                return void a.back();
            if (t.path) {
                for (var l = -1, r = 0; r < a.route.length; r++)
                    if (a.route[r].name === t.path) {
                        l = r;
                        break
                    }
                if (-1 < l)
                    return void a.go(t, l)
            }
            a.load(t)
        },
        go: function (t, a) {
            var n = this;
            n.load(t),
                setTimeout(function () {
                    e.config.body.removeChild(n.route[a].page),
                        n.route.splice(a, 1)
                }, n.turnDuration)
        },
        back: function () {
            var t = this;
            if (1 >= t.route.length)
                return void (location.href = e.config.homeUrl);
            for (var a = t.route[t.route.length - 1], n = e.page[a.name], i = t.route[t.route.length - 2], l = e.page[i.name]; 1 < t.route.length && i.skip;)
                t.route.pop(),
                    e.config.body.removeChild(i.page),
                    i = t.route[t.route.length - 2],
                    l = e.page[i.name];
            "none" === t.turnType ? t.turnNone(i.page, a.page, "back") : t.turn(i.page, a.page, "back");
            setTimeout(function () {
                if (e.config.body.removeChild(a.page),
                    "function" == typeof l.everyShow && l.everyShow(i.page, i.params),
                    e.pageNav) {
                    let a = t.pageNameStart + e.config.homeName;
                    if (i.page.id == a && 0 < e.pageNav.data.length) {
                        let t = e.pageNav.data[e.pageNav.index].url;
                        "function" == typeof e.page[t].everyShow && e.page[t].everyShow(i.page, i.params)
                    }
                }
                "function" == typeof n.everyHide && n.everyHide(l.page, l.params),
                    t.route.pop()
            }, t.turnDuration)
        },
        start: function (t) {
            function a() {
                e.config.body.insertBefore(l, e.config.body.firstChild),
                    "function" == typeof i.loadComplete && i.loadComplete(l, t.params),
                    n.route.push({
                        name: t.path,
                        page: l,
                        skip: !1,
                        params: t.params
                    }),
                    "function" == typeof i.everyShow && setTimeout(function () {
                        i.everyShow(l, t.params)
                    }, n.turnDuration)
            }
            var n = this;
            e.page[t.path] || (t.path = n.blankPage);
            var i = e.page[t.path]
                , l = document.createElement("DIV");
            l.classList.add("page"),
                l.setAttribute("id", n.pageNameStart + t.path),
                l.setAttribute("data-params", t.params),
                e.page[t.path].template && (l.innerHTML = i.template);
            e.config.pluginWrap.innerHTML = "",
                "function" == typeof i.loadBefore ? i.loadBefore(t, function () {
                    a()
                }) : a()
        },
        load: function (t) {
            function a() {
                var a = document.createElement("DIV");
                a.classList.add("page"),
                    a.setAttribute("id", n.pageNameStart + t.path),
                    a.setAttribute("data-params", JSON.stringify(t.params)),
                    a.innerHTML = r.template,
                    e.config.body.insertBefore(a, e.config.body.firstChild),
                    "function" == typeof r.loadComplete && r.loadComplete(a, t.params),
                    n.turn(a, i.page),
                    n.route.push({
                        name: t.path,
                        page: a,
                        skip: t.skip,
                        params: t.params
                    }),
                    "function" == typeof r.everyShow && setTimeout(function () {
                        r.everyShow(a, t.params)
                    }, n.turnDuration);
                "function" == typeof l.everyHide && setTimeout(function () {
                    l.everyHide(i.page, i.params)
                }, n.turnDuration)
            }
            var n = this;
            e.page[t.path] || (t.path = n.blankPage);
            e.page[t.path].template || (t.path = n.blankPage);
            var i = n.route[n.route.length - 1]
                , l = e.page[i.name]
                , r = e.page[t.path];
            e.config.pluginWrap.innerHTML = "",
                "function" == typeof r.loadBefore ? r.loadBefore(t, function () {
                    a()
                }) : a()
        },
        turn: function (e, t, a) {
            this;
            return (e.classList.remove("reverse"),
                t.classList.remove("reverse"),
                "back" === a) ? (t.classList.remove("in"),
                    t.classList.add("reverse", "out"),
                    e.classList.remove("out"),
                    void e.classList.add("in", "reverse")) : void (e.classList.add("slide", "in"),
                        t.classList.remove("in"),
                        t.classList.add("slide", "out"))
        },
        turnNone: function (e, t) {
            var a = this;
            e.classList.remove("out"),
                t.classList.remove("in"),
                t.classList.add("out"),
                a.turnType = "normal"
        }
    },
        e.route = t
}
)(phoenix);
//菜单栏
(function (e) {
    var t = function (e) {
        if (e.data && e.content && !(1 > e.data.length)) {
            this.data = e.data || [],
                this.content = e.content
        }
    };
    t.prototype = {
        create: function () {
            var a = this;
            a.pageNameStart = "phoenixPage_",
                a.u = "",
                a.li = [],
                a.l = "",
                a.pages = [],
                a.index = -1,
                a.u = document.createElement("UL"),
                a.u.classList.add("nav", "border", "border_t", "flex"),
                a.l = document.createElement("DIV"),
                a.content.appendChild(a.u),
                a.content.appendChild(a.l);
            for (var t, n = 0; n < a.data.length; n++) {
                t = document.createElement("LI"),
                    t.classList.add("flex1"),
                    t.innerHTML = "<div class=\"link\" data-url=\"" + a.data[n].url + "\" data-index=\"" + n + "\" data-refresh=\"" + a.data[n].refresh + "\"></div>" + a.data[n].icon0 + "" + a.data[n].icon1 + "<div class=\"nav_name\">" + a.data[n].name + "</div>",
                    a.li.push(t),
                    a.u.appendChild(t);
                var l = document.createElement("DIV");
                l.classList.add("nav_list", "hide"),
                    a.l.appendChild(l),
                    a.pages.push(l)
            }
            new e.finger(a.u, {
                tap: function (e) {
                    var n = e.target;
                    "DIV" == n.tagName && n.classList.contains("link") && a.set(n.getAttribute("data-index"), n.getAttribute("data-prevent"))
                }
            })
        },
        set: function (t) {
            function a() {
                n.li[t].querySelectorAll(".icons")[0].classList.contains("hide") && n.li[t].querySelectorAll(".icons")[0].classList.remove("hide"),
                    n.li[t].querySelectorAll(".icons")[1].classList.add("hide"),
                    n.li[t].querySelector(".nav_name").classList.add("color"),
                    0 <= i && (n.li[i].querySelectorAll(".icons")[1].classList.remove("hide"),
                        n.li[i].querySelectorAll(".icons")[0].classList.add("hide"),
                        n.li[i].querySelector(".nav_name").classList.remove("color")),
                    n.pages[t].classList.remove("hide"),
                    0 <= i && n.pages[i].classList.add("hide");
                var a = n.pages[t].innerHTML
                    , l = n.data[t].refresh;
                if (a && !1 === l) {
                    var r = e.page[n.data[t].url]
                        , s = n.data[t].page;
                    "function" == typeof r.everyShow && r.everyShow(s, n.data[t].params)
                } else {
                    var r = e.page[n.data[t].url]
                        , s = document.createElement("DIV");
                    s.innerHTML = r.template,
                        n.pages[t].innerHTML = "",
                        n.pages[t].insertBefore(s, n.pages[t].firstChild),
                        n.data[t].page = s,
                        "function" == typeof r.loadComplete && r.loadComplete(s, n.data[t].params),
                        "function" == typeof r.everyShow && r.everyShow(s, n.data[t].params)
                }
                if (0 <= i) {
                    var o = e.page[n.data[i].url]
                        , c = n.data[i].page;
                    "function" == typeof o.everyHide && o.everyHide(c, n.data[i].params)
                }
            }
            var n = this
                , i = n.index;
            (t = +t,
                !(t > n.data.length - 1 || 0 > t || t === i)) && e.page[n.data[t].url] && (n.index = t,
                    n.url = n.data[t].url,
                    e.config.pluginWrap.innerHTML = "",
                    "function" == typeof e.page[n.data[t].url].loadBefore ? e.page[n.data[t].url].loadBefore({}, function () {
                        a()
                    }) : a())
        }
    },
        e.nav = t
}
)(phoenix);
//分页
(function (e) {
    var t = function (t) {
        var a = this;
        if (t.tabList && t.tabContent && t.items && !(1 > t.items.length)) {
            var n = function () { };
            a.tabList = t.tabList,
                a.items = t.items,
                a.tabContent = t.tabContent,
                a.isSingle = !1 !== t.isSingle,
                a.isScroll = !!t.isScroll,
                a.activeIndex = -1,
                a.lis = [],
                a.contents = [],
                a.already = t.already || n,
                a.onChange = t.onChange || n,
                a.activeColor = t.activeColor || "ff3824",
                a.activeLineBg = t.activeLineBg || "ff3824",
                a.activeLineHeight = t.activeLineHeight || "2px",
                a.activeLineWidth = t.activeLineWidth || "40px",
                a.setTab(a.tabList, a.items),
                new e.finger(a.tabList, {
                    tap: function (e) {
                        var n = e.target;
                        n.classList.contains("link") && a.set(n.getAttribute("data-index"))
                    }
                })
        }
    };
    t.prototype = {
        setTab: function (t, a) {
            var n = this
                , l = a.length
                , r = document.createElement("UL");
            if (n.isScroll) {
                r.classList.add("flex", "scrollX");
                for (var s, o = 0; o < a.length; o++)
                    s = e.createDom("LI", "flex0 plr10 relative", "<div class=\"link\" data-index=\"" + o + "\"></div><span>" + a[o].name + "</span>"),
                        r.appendChild(s),
                        n.lis.push(s)
            } else {
                r.classList.add("flex");
                for (var s, o = 0; o < a.length; o++)
                    s = document.createElement("LI"),
                        s.classList.add("flex1", "ac", "relative"),
                        s.innerHTML = "<div class=\"link\" data-index=\"" + o + "\"></div><span>" + a[o].name + "</span>",
                        r.appendChild(s),
                        n.lis.push(s)
            }
            t.innerHTML = "",
                t.appendChild(r),
                n.ul = r,
                n.setContent()
        },
        setContent: function () {
            var e = this
                , t = document.createElement("UL");
            if (e.isSingle) {
                var a = document.createElement("DIV");
                a.classList.add("w100", "h100"),
                    a.innerHTML = "<div class=\"touch_wrapper\"></div>",
                    e.tabContent.appendChild(a),
                    e.contents.push(a)
            } else
                for (var a, n = 0; n < e.items.length; n++)
                    a = document.createElement("DIV"),
                        a.classList.add("hide", "w100", "h100"),
                        a.innerHTML = "<div class=\"touch_wrapper\"></div>",
                        e.tabContent.appendChild(a),
                        e.contents.push(a);
            e.already()
        },
        set: function (t) {
            var a = this;
            a.activeLine && a.activeLine.parentNode.removeChild(a.activeLine);
            var n = document.createElement("DIV");
            n.classList.add("absolute", "bottom0", "left0"),
                n.setAttribute("style", "width:100%;height:" + a.activeLineHeight + ";"),
                n.innerHTML = "<div style=\"margin:0 auto;width:" + a.activeLineWidth + ";height:" + a.activeLineHeight + ";background-color:" + a.activeLineBg + ";\"></div>",
                a.lis[t].appendChild(n),
                a.activeLine = n,
                -1 < a.activeIndex && a.lis[a.activeIndex].querySelector("SPAN").setAttribute("style", "");
            a.lis[t].querySelector("SPAN").setAttribute("style", "color:" + a.activeColor);
            for (var l = 0, r = parseInt(e.config.innerWidth / 2), s = 0; s < t; s++)
                l += a.lis[s].offsetWidth;
            var o = l - r;
            0 < o ? a.ul.scrollTo(o, 0) : a.ul.scrollTo(0, 0);
            a.isSingle ? (a.activeIndex = t,
                a.onChange(a.activeIndex, a.items[t], a.contents[0])) : (-1 < a.activeIndex && a.contents[a.activeIndex].classList.add("hide"),
                    a.activeIndex = t,
                    a.contents[t].classList.remove("hide"),
                    a.onChange(a.activeIndex, a.items[t], a.contents[t]))
        }
    },
        e.tab = t
}
)(phoenix);
//对话框
(function (e) {
    var t = function (t) {
        var a = this;
        t.title && (a.pluginWrap = e.config.pluginWrap || document.querySelector("#pluginWrap"),
            a.onTap = "function" == typeof t.onTap ? t.onTap : function () { }
            ,
            a.create(t))
    };
    t.prototype = {
        create: function (e) {
            var t = this;
            t.pluginWrap.innerHTML = "",
                t.domBox = document.createElement("DIV"),
                t.domBox.classList.add("plugin_box"),
                t.domModal = document.createElement("DIV"),
                t.domModal.classList.add("plugin_modal"),
                t.domDialog = document.createElement("DIV"),
                t.domDialog.classList.add("plugin_dialog", "ac"),
                t.domTitle = document.createElement("DIV"),
                t.domTitle.classList.add("p20"),
                t.domTitle.innerHTML = e.title,
                t.domMessage = document.createElement("DIV"),
                t.domMessage.classList.add("plr20", "pb20", "color_gray5"),
                t.domBtn = document.createElement("DIV"),
                t.domBtn.classList.add("mt10", "flex", "border", "border_t", "lh48"),
                t.pluginWrap.appendChild(t.domBox),
                t.domBox.appendChild(t.domModal),
                t.domBox.appendChild(t.domModal),
                t.domBox.appendChild(t.domDialog),
                t.domDialog.appendChild(t.domTitle),
                e.message && (t.domMessage.innerHTML = e.message,
                    t.domDialog.appendChild(t.domMessage));
            t.domDialog.appendChild(t.domBtn),
                (e.button === void 0 || 1 > e.button.length) && (e.button = [{
                    name: "\u786E\u5B9A",
                    color: "color_blue"
                }]);
            for (var a, n = 0; n < e.button.length; n++)
                a = document.createElement("DIV"),
                    a.classList.add("flex1"),
                    e.button[n].color ? a.classList.add(e.button[n].color) : 1 < e.button.length && 0 === n ? a.classList.add("color_gray4") : a.classList.add("color_blue"),
                    0 < n && a.classList.add("border", "border_l"),
                    a.setAttribute("data-index", n),
                    a.innerHTML = e.button[n].name,
                    t.domBtn.appendChild(a);
            t.listenOnTap()
        },
        listenOnTap: function () {
            var a = this;
            new e.finger(a.domBtn, {
                tap: function (e) {
                    var n = e.target;
                    n.getAttribute("data-index") && (a.pluginWrap.removeChild(a.domBox),
                        a.onTap(+n.getAttribute("data-index")))
                }
            })
        }
    },
        e.dialog = t
}
)(phoenix);
//轻提示
(function (e) {
    var t = function (t) {
        var n = this;
        if ("string" == typeof t) {
            var i = t;
            t = {
                message: i
            }
        }
        t.message && (n.pluginWrap = e.config.pluginWrap || document.querySelector("#pluginWrap"),
            this.message = t.message,
            this.duration = t.duration || 2e3,
            this.bgClass = t.bgClass || "bg_black",
            n.create(t))
    };
    t.prototype = {
        create: function () {
            var t = this;
            t.pluginWrap.innerHTML = "",
                t.domToast = document.createElement("DIV"),
                t.domToast.classList.add("plugin_toast"),
                t.domToast.style.cssText = "top:" + (e.device.height / 2 - 40) + "px;",
                t.domToast.innerHTML = "<span class=\"" + t.bgClass + " opacity70 radius_sm p10\">" + t.message + "</span>",
                t.pluginWrap.appendChild(t.domToast),
                setTimeout(function () {
                    t.domToast.parentNode && t.pluginWrap.removeChild(t.domToast)
                }, t.duration)
        }
    },
        e.toast = t
}
)(phoenix);
//prompt
(function (e) {
    var t = function (e) {
        var t = function () { };
        this.titleText = e.tips || "\u8BF7\u8F93\u5165\u4FE1\u606F",
            this.buttonText = e.buttonText || ["\u53D6\u6D88", "\u786E\u5B9A"],
            this.inputs = e.inputs || ["\u8BF7\u8F93\u5165"],
            this.maskClose = e.maskClose || 2,
            this.backbuttonClose = e.backbuttonClose || 2,
            this.callbackCancel = e.cancel || t,
            this.callbackCheck = e.check,
            this.callbackOk = e.confirm || t,
            this.pluginWrap = phoenix.config.pluginWrap || document.querySelector("#pluginWrap"),
            this.initial()
    };
    t.prototype = {
        initial: function () {
            var t = this;
            t.pluginWrap.innerHTML = "",
                t.promptWrap = document.createElement("div"),
                t.promptWrap.classList.add("prompt_wrap"),
                t.promptWrap.classList.add("modal"),
                t.pluginWrap.appendChild(t.promptWrap),
                t.pluginWrap.setAttribute("data-id", this.backbuttonClose),
                t.prompt = document.createElement("div"),
                t.prompt.classList.add("prompt"),
                t.promptWrap.appendChild(t.prompt),
                t.title = document.createElement("div"),
                t.title.classList.add("prompt_title"),
                t.title.innerHTML = t.titleText,
                t.prompt.appendChild(t.title),
                t.input = document.createElement("div"),
                t.input.classList.add("prompt_input"),
                t.prompt.appendChild(t.input);
            var e = "";
            this.inputs.forEach(function (t) {
                e += "<input type = \"text\" placeholder=\"" + t + "\">"
            }),
                t.input.innerHTML = e,
                t.error = document.createElement("div"),
                t.error.classList.add("prompt_error"),
                t.prompt.appendChild(t.error),
                t.btn = document.createElement("div"),
                t.btn.classList.add("prompt_btn"),
                t.btn.classList.add("flex"),
                t.prompt.appendChild(t.btn),
                t.btnCancel = document.createElement("div"),
                t.btnCancel.classList.add("flex1"),
                t.btnCancel.classList.add("relative"),
                t.btnCancel.innerHTML = "<div class=\"link\"></div>" + t.buttonText[0],
                t.btn.appendChild(t.btnCancel),
                t.btnOk = document.createElement("div"),
                t.btnOk.classList.add("flex1"),
                t.btnOk.classList.add("relative"),
                t.btnOk.innerHTML = "<div class=\"link\"></div>" + t.buttonText[1],
                t.btn.appendChild(t.btnOk),
                new phoenixFinger(t.btnCancel.querySelector(".link"), {
                    singleTap: function () {
                        t.pluginWrap.removeChild(t.promptWrap),
                            t.callbackCancel()
                    }
                }),
                new phoenixFinger(t.btnOk.querySelector(".link"), {
                    singleTap: function () {
                        for (var e = t.input.querySelectorAll("input"), a = [], n = 0; n < e.length; n++)
                            a.push(e[n].value);
                        var l = "function" == typeof t.callbackCheck ? t.callbackCheck(a) : [!0];
                        l[0] ? (t.pluginWrap.removeChild(t.promptWrap),
                            t.callbackOk(a)) : t.error.innerHTML = l[1]
                    }
                }),
                !0 === t.maskClose && new phoenixFinger(t.promptWrap, {
                    singleTap: function (a) {
                        a.target.classList.contains("modal") && (t.pluginWrap.removeChild(t.promptWrap),
                            t.callbackCancel())
                    }
                })
        }
    },
        e.prompt = t
}
)(window);
//swipe
(function (e) {
    var t = function (t) {
        var a = this;
        if (this.ele = t.ele,
            this.width = t.width || document.documentElement.clientWidth,
            this.height = t.ratio ? this.width * t.ratio : document.documentElement.clientHeight,
            (this.images = t.images || e.config.blankImg || "",
                this.defaultIndex = t.defaultIndex || 1,
                this.auto = t.auto,
                this.duration = t.duration || 5e3,
                this.changeEnd = t.changeEnd,
                this.tapEnd = t.tapEnd,
                this.position = t.defaultIndex || 1,
                this.step = 15,
                this.x = 0,
                this.onTrans = !1,
                2 > a.images.length)) {
            a.ele.style.width = "" + a.width * (a.images.length + 2) + "px",
                a.ele.style.height = "" + a.height + "px";
            var n = document.createElement("LI");
            n.style.width = "" + a.width + "px",
                n.style.height = "" + a.height + "px";
            var i = document.createElement("IMG");
            return i.src = a.images[0][0],
                n.appendChild(i),
                a.ele.appendChild(n),
                void (this.touchEvent = new e.finger(a.ele, {
                    tap: function () {
                        "function" == typeof a.tapEnd && a.tapEnd(a.position)
                    }
                }))
        }
        e.transform(a.ele),
            a.createImg(),
            this.touchEvent = new e.finger(a.ele, {
                touchStart: function () {
                    cancelAnimationFrame(a.rafPlay)
                },
                touchEnd: function () {
                    if (!1 === a.onTrans) {
                        var e = parseInt(a.ele.translateX - a.x)
                            , t = Math.abs(e);
                        2 <= t && 100 >= t ? a.to(a.ele, a.ele.translateX, a.x, 6) : 60 < t && (0 < e ? (a.position -= 1,
                            a.x += a.width,
                            a.to(a.ele, a.ele.translateX, a.x, a.step)) : (a.position += 1,
                                a.x -= a.width,
                                a.to(a.ele, a.ele.translateX, a.x, a.step)))
                    }
                },
                tap: function () {
                    "function" == typeof a.tapEnd && a.tapEnd(a.position)
                },
                pressMove: function (e) {
                    !1 === a.onTrans && (clearInterval(a.interval),
                        a.ele.translateX += e.deltaX)
                }
            }),
            a.auto && a.autoPlay(a.duration)
    };
    t.prototype = {
        createImg: function () {
            var e = this;
            e.ele.style.width = "" + e.width * (e.images.length + 2) + "px",
                e.ele.style.height = "" + e.height + "px",
                e.li = [];
            for (var t, a = 0; a < e.images.length; a++) {
                t = document.createElement("LI"),
                    t.style.width = "" + e.width + "px",
                    t.style.height = "" + e.height + "px";
                var n = document.createElement("IMG");
                n.src = e.images[a][0],
                    t.appendChild(n),
                    e.li.push(t)
            }
            var l = document.createElement("LI");
            l.style.width = "" + e.width + "px",
                l.style.height = "" + e.height + "px";
            var r = document.createElement("IMG");
            r.src = e.images[0][0],
                l.appendChild(r),
                e.li.push(l);
            var s = document.createElement("LI");
            s.style.width = "" + e.width + "px",
                s.style.height = "" + e.height + "px";
            var o = document.createElement("IMG");
            o.src = e.images[e.images.length - 1][0],
                s.appendChild(o),
                e.li.unshift(s),
                e.ele.innerHTML = "";
            for (var a = 0; a < e.li.length; a++)
                e.ele.appendChild(e.li[a]);
            e.ele.translateX = -e.width * e.defaultIndex,
                e.x = e.ele.translateX,
                e.createPage()
        },
        createPage: function () {
            var e = this;
            e.page = [];
            for (var t, a = 0; a < e.images.length; a++)
                t = document.createElement("SPAN"),
                    e.page.push(t);
            var t = document.createElement("DIV");
            t.classList.add("swipe_page"),
                e.ele.parentNode.querySelector(".swipe_page_box").insertBefore(t, e.ele.parentNode.querySelector(".swipe_page_box").firstChild);
            for (var a = 0; a < e.page.length; a++)
                t.appendChild(e.page[a]);
            e.setPage()
        },
        setPage: function () {
            for (var e = this, t = 0; t < e.page.length; t++)
                e.page[t].classList.remove("active");
            e.page[e.position - 1].classList.add("active")
        },
        autoPlay: function (e) {
            var t = this
                , a = new Date().getTime()
                , n = function () {
                    t.rafPlay = requestAnimationFrame(n);
                    var i = new Date().getTime();
                    i - a >= e && (t.position += 1,
                        t.x -= t.width,
                        t.to(t.ele, t.ele.translateX, t.x, t.step),
                        cancelAnimationFrame(t.rafPlay))
                };
            n()
        },
        to: function (e, t, a, n) {
            var i = this
                , e = e || i.ele
                , t = t || i.ele.translateX
                , a = a || 0
                , n = n || i.step || 1;
            i.onTrans = !0;
            var l = function () {
                i.rafTo = requestAnimationFrame(l);
                e.translateX === a ? (i.transEnd(),
                    cancelAnimationFrame(i.rafTo),
                    i.onTrans = !1) : t > a ? e.translateX - n <= a ? e.translateX = a : e.translateX -= n : t < a && (e.translateX + n >= a ? e.translateX = a : e.translateX += n)
            };
            l()
        },
        transEnd: function () {
            var e = this;
            e.onTrans = !1,
                e.position === e.images.length + 1 && (e.ele.translateX = -e.width * e.defaultIndex,
                    e.position = 1,
                    e.x = e.ele.translateX);
            0 === e.position && (e.ele.translateX = -e.width * e.images.length,
                e.position = e.images.length,
                e.x = e.ele.translateX);
            e.setPage(),
                "function" == typeof e.changeEnd && e.changeEnd(e.position),
                e.auto && e.autoPlay(e.duration)
        }
    },
        e.swipe = t
}
)(phoenix);
//选择
(function (e) {
    var t = function (t) {
        var a = this;
        if (t.ele && t.data) {
            var n = function () { };
            a.pluginWrap = e.config.pluginWrap || document.querySelector("#pluginWrap"),
                a.ele = t.ele,
                a.data = t.data,
                a.title = t.title || !1,
                a.input = t.input || !1,
                a.inputOut = t.inputOut || 1,
                a.show = t.show || !1,
                a.colNum = t.colNum || 1,
                a.activeStyle = t.activeStyle || "color_red",
                a.disabledStyle = t.disabledStyle || "color_gray3",
                a.onSelect = t.onSelect || n,
                a.onCancel = t.onCancel || n,
                a.check = "",
                a.initial()
        }
    };
    t.prototype = {
        initial: function () {
            for (var t = this, a = 0; a < t.data.length; a++)
                if ("active" === t.data[a][2]) {
                    t.check = a;
                    break
                }
            t.check && (t.show && (t.show.innerHTML = t.data[t.check][0]),
                t.input && (t.input.value = t.data[t.check][t.inputOut]));
            new e.finger(t.ele, {
                singleTap: function () {
                    t.create()
                }
            })
        },
        create: function () {
            var e = this
                , a = document.createElement("DIV");
            a.classList.add("plugin_box");
            var n = document.createElement("DIV");
            n.classList.add("plugin_modal");
            var i = document.createElement("DIV");
            if (i.classList.add("pick"),
                !1 !== e.title) {
                var l = document.createElement("DIV");
                l.classList.add("pick_title"),
                    l.innerHTML = e.title,
                    i.appendChild(l)
            }
            var t = document.createElement("UL");
            i.appendChild(t),
                t.innerHTML = e.createList(e.data);
            var r = document.createElement("DIV");
            r.classList.add("pick_cancel"),
                r.innerHTML = "\u53D6\u6D88",
                i.appendChild(r),
                a.appendChild(i),
                a.appendChild(n),
                e.pluginWrap.appendChild(a),
                e.pb = a,
                e.p = i,
                e.m = n,
                e.u = t,
                e.c = r,
                e.listen()
        },
        createList: function (e) {
            for (var t, a = this, n = "", l = 0; l < e.length; l++)
                t = "",
                    "active" !== e[l][2] || a.check || (t += " " + a.activeStyle),
                    a.check && a.check == l && (t += " " + a.activeStyle),
                    "disabled" === e[l][2] && (t += " " + a.disabledStyle),
                    2 === a.colNum ? t += " w50" : 3 === a.colNum ? t += " w33" : 4 === a.colNum && (t += " w25"),
                    n += "<li class=\"" + t + "\" data-id=\"" + e[l][1] + "\" data-index=\"" + l + "\">" + e[l][0] + "</li>";
            return n
        },
        listen: function () {
            var a = this;
            new e.finger(a.m, {
                tap: function () {
                    a.close()
                }
            }),
                new e.finger(a.c, {
                    tap: function () {
                        a.onCancel(),
                            a.close()
                    }
                }),
                new e.finger(a.u, {
                    tap: function (n) {
                        var e = n.target;
                        "LI" !== e.tagName || e.classList.contains(a.disabledStyle) || (a.check ? (a.u.querySelectorAll("LI")[a.check].classList.remove(a.activeStyle),
                            a.check = "",
                            a.show.innerHTML = "",
                            a.input.value = "") : (e.classList.add(a.activeStyle),
                                a.check = e.getAttribute("data-index"),
                                a.show && (a.show.innerHTML = a.data[a.check][0]),
                                a.input && (a.input.value = a.data[a.check][a.inputOut]),
                                a.onSelect([a.data[a.check][0], a.data[a.check][1]])),
                            a.close())
                    }
                })
        },
        close: function () {
            var e = this;
            e.p.setAttribute("style", "animation:am_fadeOutBottom .5s ease forwards;"),
                e.pb.removeChild(e.m),
                setTimeout(function () {
                    e.pluginWrap.removeChild(e.pb)
                }, 450)
        }
    },
        e.pick = t
}
)(phoenix);
//多选
(function (e) {
    var t = function (t) {
        var a = this;
        if (t.ele && t.data) {
            var n = function () { };
            a.pluginWrap = e.config.pluginWrap || document.querySelector("#pluginWrap"),
                a.ele = t.ele,
                a.data = t.data,
                a.title = t.title || !1,
                a.input = t.input || !1,
                a.inputOut = t.inputOut || 1,
                a.show = t.show || !1,
                a.colNum = t.colNum || 1,
                a.activeStyle = t.activeStyle || "color_red",
                a.disabledStyle = t.disabledStyle || "color_gray3",
                a.onSelect = t.onSelect || n,
                a.max = t.max || 100,
                a.check = [],
                a.names = [],
                a.checkNum = 0,
                a.initial()
        }
    };
    t.prototype = {
        initial: function () {
            for (var t = this, a = 0; a < t.data.length; a++)
                "active" === t.data[a][2] && (t.check.push(a),
                    t.names.push(t.data[a][0]),
                    t.checkNum += 1);
            0 < t.check.length && (t.show && (t.show.innerHTML = t.names.toString()),
                0 === t.inputOut ? t.input && (t.input.value = t.names.toString()) : 1 === t.inputOut && t.input && (t.input.value = t.check.toString()));
            new e.finger(t.ele, {
                singleTap: function () {
                    t.create()
                }
            })
        },
        create: function () {
            var e = this
                , a = document.createElement("DIV");
            a.classList.add("plugin_box");
            var n = document.createElement("DIV");
            n.classList.add("plugin_modal");
            var l = document.createElement("DIV");
            if (l.classList.add("picks"),
                !1 !== e.title) {
                var r = document.createElement("DIV");
                r.classList.add("picks_title"),
                    r.innerHTML = e.title,
                    l.appendChild(r)
            }
            var t = document.createElement("UL");
            l.appendChild(t),
                t.innerHTML = e.createList(e.data);
            var s = document.createElement("DIV");
            if (s.classList.add("picks_ok"),
                s.innerHTML = "\u786E\u5B9A",
                l.appendChild(s),
                a.appendChild(l),
                a.appendChild(n),
                e.pluginWrap.appendChild(a),
                e.pb = a,
                e.p = l,
                e.m = n,
                e.u = t,
                e.c = s,
                0 < e.check.length)
                for (var o = t.querySelectorAll("LI"), c = 0; c < e.check.length; c++)
                    o[e.check[c]].classList.add(e.activeStyle);
            e.listen()
        },
        createList: function (e) {
            for (var t, a = this, n = "", l = 0; l < e.length; l++)
                t = "",
                    "disabled" === e[l][2] && (t += " " + a.disabledStyle),
                    2 === a.colNum ? t += " w50" : 3 === a.colNum ? t += " w33" : 4 === a.colNum && (t += " w25"),
                    n += "<li class=\"" + t + "\" data-id=\"" + e[l][1] + "\" data-index=\"" + l + "\">" + e[l][0] + "</li>";
            return n
        },
        listen: function () {
            var a = this;
            new e.finger(a.m, {
                tap: function () {
                    a.close()
                }
            }),
                new e.finger(a.c, {
                    tap: function () {
                        var e = a.u.querySelectorAll("." + a.activeStyle);
                        a.names = [],
                            a.check = [];
                        for (var t = 0; t < e.length; t++)
                            a.names.push(e[t].innerHTML),
                                a.check.push(e[t].getAttribute("data-index"));
                        a.show && (a.show.innerHTML = a.names.toString()),
                            0 === a.inputOut ? a.input && (a.input.value = a.names.toString()) : 1 === a.inputOut && a.input && (a.input.value = a.check.toString());
                        a.onSelect(a.names, a.check),
                            a.close()
                    }
                }),
                new e.finger(a.u, {
                    tap: function (n) {
                        var e = n.target;
                        if (!("LI" !== e.tagName || e.classList.contains(a.disabledStyle))) {
                            if (e.classList.contains(a.activeStyle))
                                return e.classList.remove(a.activeStyle),
                                    void (a.checkNum -= 1);
                            if (!e.classList.contains(a.activeStyle) && a.checkNum < a.max)
                                return e.classList.add(a.activeStyle),
                                    void (a.checkNum += 1)
                        }
                    }
                })
        },
        close: function () {
            var e = this;
            e.p.setAttribute("style", "animation:am_fadeOutBottom .5s ease forwards;"),
                e.pb.removeChild(e.m),
                setTimeout(function () {
                    e.pluginWrap.removeChild(e.pb)
                }, 450)
        }
    },
        e.picks = t
}
)(phoenix);
//开关
(function (e) {
    var t = function (e) {
        var t = this;
        t.wrap = e.wrap,
            t.state = e.state || "off",
            t.readonly = e.readonly || "true",
            t.onChange = e.onChange || function () { }
            ,
            t.eleSwitch = t.wrap.parentNode.querySelector(".switch"),
            t.eleSwitchBall = t.wrap.parentNode.querySelector(".switch_ball"),
            t.eleInput = t.wrap.parentNode.querySelector("INPUT"),
            t.initial()
    };
    t.prototype = {
        initial: function () {
            var t = this;
            (t.eleInput.value = "off",
                "on" === t.state && (t.eleSwitchBall.classList.add("switch_ball_on"),
                    t.eleSwitch.classList.add("switch_on"),
                    t.eleInput.value = "on"),
                "false" !== t.readonly) && new e.finger(t.wrap, {
                    tap: function () {
                        "off" === t.state ? (t.eleSwitchBall.classList.add("switch_ball_on"),
                            t.eleSwitch.classList.add("switch_on"),
                            t.state = "on") : (t.eleSwitchBall.classList.remove("switch_ball_on"),
                                t.eleSwitch.classList.remove("switch_on"),
                                t.state = "off"),
                            t.eleInput.value = t.state,
                            t.onChange(t.state)
                    }
                })
        }
    },
        e.switcher = t
}
)(phoenix);
//侧边栏
(function (e) {
    var t = function (e) {
        this;
        this.dataList = e.dataList,
            this.data = e.data || [],
            this.already = e.already || null,
            this.onChange = e.onChange || null,
            this.liList = [],
            this.sIndex = 0,
            this.initial()
    };
    t.prototype = {
        initial: function () {
            var e, t = this;
            return (t.dataList.innerHTML = "",
                t.listenSlidebar(),
                0 == t.data.length) ? void ("function" == typeof t.already && t.already(null)) : void (t.data.forEach(function (a, n) {
                    e = "",
                        "selected" == a[2] ? (e = "slider_selected slider_color",
                            t.sIndex = n) : "disabled" == a[2] && (e = "slider_disabled");
                    var i = document.createElement("LI");
                    i.innerText = a[0],
                        i.setAttribute("data-id", a[1]),
                        i.setAttribute("data-index", n),
                        i.className = e,
                        t.liList.push(i),
                        t.dataList.appendChild(i)
                }),
                    "function" == typeof t.already && t.already(t.sIndex))
        },
        reset: function () {
            var e, t = this;
            return (t.dataList.innerHTML = "",
                t.sIndex = 0,
                t.liList = [],
                0 == t.data.length) ? void ("function" == typeof t.already && t.already(null)) : void (t.data.forEach(function (a, n) {
                    e = "",
                        "selected" == a[2] ? (e = "slider_selected slider_color",
                            t.sIndex = n) : "disabled" == a[2] && (e = "slider_disabled");
                    var i = document.createElement("LI");
                    i.innerText = a[0],
                        i.setAttribute("data-id", a[1]),
                        i.setAttribute("data-index", n),
                        i.className = e,
                        t.liList.push(i),
                        t.dataList.appendChild(i)
                }),
                    "function" == typeof t.already && t.already(t.sIndex))
        },
        listenSlidebar: function () {
            var a = this;
            new e.finger(this.dataList, {
                singleTap: function (n) {
                    if (!(n.target.classList.contains("slider_disabled") || !0 == n.target.classList.contains("slider_selected")) && "LI" == n.target.tagName) {
                        var e = n.target;
                        a.liList[a.sIndex].classList.remove("slider_selected", "slider_color"),
                            e.classList.add("slider_selected", "slider_color"),
                            a.sIndex = e.getAttribute("data-index"),
                            "function" == typeof a.onChange && a.onChange(a.sIndex)
                    }
                }
            })
        }
    },
        e.sidebar = t
}
)(phoenix);
//单选
(function (e) {
    var t = function (e) {
        this;
        this.wrap = e.wrap,
            this.url = e.url,
            this.title = e.title || "\u9009\u62E9\u7701\u5E02\u533A",
            this.defaultVal = e.defaultVal || [],
            this.columnNum = e.columnNum || 3,
            this.isShowAll = e.isShowAll || [!1, !1, !1],
            this.nameEle = e.nameEle || e.wrap.querySelector(".pickerName"),
            this.inputEle = e.inputEle || e.wrap.querySelector("input"),
            this.backbuttonClose = e.backbuttonClose || 1,
            this.confirmCallback = e.confirmCallback || null,
            this.cancelCallback = e.cancelCallback || null,
            this.pluginWrap = document.querySelector("#pluginWrap"),
            this.initial()
    };
    t.prototype = {
        initial: function () {
            var t = this;
            this.defaultVal && this.showDefaultVal(this.defaultVal);
            new e.finger(this.wrap, {
                tap: function () {
                    t.pluginWrap.innerHTML = "";
                    var e = document.createElement("div");
                    e.className = "picker modal",
                        t.pluginWrap.appendChild(e),
                        e.innerHTML = "<div class=\"picker_box\"><div class=\"picker_btn box\">" + t.title + "<div class=\"picker_cancel\">\u53D6\u6D88</div><div class=\"picker_ok\" data-value=\"\">\u786E\u5B9A</div></div></div>",
                        e.setAttribute("data-id", this.backbuttonClose);
                    var a = ""
                        , n = t.columnNum
                        , l = [];
                    2 === n ? a = "w50" : 3 === n && (a = "w33");
                    for (var r, s = 1; s <= n; s++)
                        r = document.createElement("UL"),
                            l.push(r),
                            r.className = "picker_ul" + s + " " + a + "",
                            e.querySelector(".picker_box").appendChild(r);
                    for (var o = [0], s = 0; s < t.columnNum - 1; s++)
                        t.defaultVal[s] && o.push(t.defaultVal[s][1]);
                    for (var s = 0; s < o.length; s++)
                        0 < s && 0 == o[s] || t.getList({
                            pid: o[s],
                            index: s,
                            complete: function (e, a) {
                                t.insertList(a, l, e)
                            }
                        });
                    t.listenList(e)
                }
            })
        },
        listenList: function (t) {
            var a = this;
            new e.finger(t, {
                tap: function (n) {
                    var e, l, r, s, o, c = n.target;
                    if ("LI" == c.tagName && !1 == c.classList.contains("picker_selected")) {
                        e = c.parentNode.parentNode.querySelectorAll("ul"),
                            l = c.getAttribute("data-id"),
                            o = c.getAttribute("data-childareacount"),
                            c.parentNode.classList.contains("picker_ul1") ? s = 1 : c.parentNode.classList.contains("picker_ul2") && (s = 2);
                        for (var d = 0; d < e.length; d++)
                            s < d && (e[d].innerHTML = "");
                        r = c.parentNode.querySelectorAll("li");
                        for (var d = 0; d < r.length; d++)
                            if (r[d].classList.contains("picker_selected")) {
                                r[d].classList.remove("picker_selected");
                                break
                            }
                        if (c.classList.add("picker_selected"),
                            null != c.parentNode.nextElementSibling)
                            if (0 != o) {
                                var p = "";
                                a.getList({
                                    pid: l,
                                    index: s,
                                    complete: function (t, n) {
                                        p = e[n] && !0 == a.isShowAll[n] ? "<li data-id=\"0\" data-childareacount=\"0\">\u5168\u90E8</li>" : "",
                                            e[n].innerHTML = p + t
                                    }
                                })
                            } else
                                c.parentNode.nextElementSibling.innerHTML = ""
                    } else if (c.classList.contains("picker_ok")) {
                        var u, m = [];
                        u = t.querySelectorAll(".picker_selected");
                        for (var d = 0; d < u.length; d++)
                            m.push([u[d].innerHTML, u[d].getAttribute("data-id")]);
                        a.showDefaultVal(m),
                            a.defaultVal = m,
                            "function" == typeof a.confirmCallback && a.confirmCallback(m),
                            a.pluginWrap.innerHTML = ""
                    } else
                        c.classList.contains("picker_cancel") && ("function" == typeof a.cancelCallback && a.cancelCallback(),
                            a.pluginWrap.innerHTML = "")
                }
            })
        },
        showDefaultVal: function (e) {
            var t = []
                , a = [];
            e.forEach(function (e) {
                t.push(e[0]),
                    a.push(e[1])
            }),
                this.nameEle.innerHTML = t,
                this.inputEle.value = a
        },
        getList: function (t) {
            var a, n = this, l = "", r = [];
            e.ajax({
                url: n.url,
                data: {
                    pid: t.pid
                },
                success: function (e) {
                    for (var s = e.data, o = 0; o < s.length; o++)
                        n.defaultVal && (n.defaultVal.forEach(function (e) {
                            r.push(e[1])
                        }),
                            a = -1 < r.indexOf(s[o].id + "") ? "picker_selected" : ""),
                            l += "<li data-id=\"" + s[o].id + "\" data-childareacount=\"" + s[o].child_area_count + "\" class=\"" + a + "\">" + s[o].name + "</li>";
                    "function" == typeof t.complete && t.complete(l, t.index)
                }
            })
        },
        insertList: function (e, t, a) {
            var n = this
                , i = "";
            i = n.defaultVal[e] && !0 == n.isShowAll[e] ? "0" == n.defaultVal[e][1] ? "<li data-id=\"0\" data-childareacount=\"0\" class=\"picker_selected\">\u5168\u90E8</li>" : "<li data-id=\"0\" data-childareacount=\"0\">\u5168\u90E8</li>" : "";
            t[e].innerHTML = i + a
        }
    },
        e.picker = t
}
)(phoenix);
//缩放
(function (e) {
    var t = function (t) {
        var a = this;
        if (t.src) {
            a.src = t.src,
                a.pluginWrap = e.config.pluginWrap || document.querySelector("#pluginWrap");
            var n = function () { };
            a.callback = t.longTap || n,
                a.To = function (e, t, n, i, l, r, s) {
                    var o = e[t]
                        , c = new Date
                        , d = this
                        , p = l || function (e) {
                            return e
                        }
                        ;
                    this.tickID = null;
                    var u = function () {
                        var a = new Date - c;
                        return a >= i ? (e[t] = n,
                            s && s(n),
                            r && r(n),
                            cancelAnimationFrame(d.tickID),
                            void (d.toTick = null)) : void (e[t] = (n - o) * p(a / i) + o,
                                d.tickID = requestAnimationFrame(u),
                                s && s(e[t]))
                    };
                    u(),
                        a.To.List.push(this)
                }
                ,
                a.To.List = [],
                a.To.stopAll = function () {
                    for (var e = 0, t = a.To.List.length; e < t; e++)
                        cancelAnimationFrame(a.To.List[e].tickID);
                    a.To.List.length = 0
                }
                ,
                a.To.stop = function (e) {
                    cancelAnimationFrame(e.tickID)
                }
                ,
                a.create()
        }
    };
    t.prototype = {
        create: function () {
            var t = this;
            return t.domBox = document.createElement("DIV"),
                t.domBox.classList.add("plugin_box"),
                t.domModal = document.createElement("DIV"),
                t.domModal.classList.add("plugin_modal"),
                t.domModal.setAttribute("style", "background:rgba(0,0,0,.8);"),
                t.content = document.createElement("DIV"),
                t.content.classList.add("bg_black", "w100", "h100"),
                t.content.innerHTML = "<div class=\"absolute left0 bottom0 w100\" style=\"z-index:2;bottom:20px;\"><div class=\"fc ew60 relative p10 ac color_white i24 domClose\"><i class=\"phoenix_icon phoenix_icon_close\"></i></div></div>",
                t.pluginWrap.appendChild(t.domBox),
                t.domBox.appendChild(t.domModal),
                t.domBox.appendChild(t.content),
                t.imgBox = document.createElement("DIV"),
                t.imgBox.classList.add("fixed", "w100", "h100", "left0", "top0"),
                t.content.appendChild(t.imgBox),
                t.img = new Image,
                t.content.appendChild(t.img),
                t.img.onload = function () {
                    var a = e.device.height / 2 - this.height / 2;
                    this.style.top = a + "px",
                        t.listenImg(this),
                        t.listenClose(t.content.querySelector(".domClose"))
                }
                ,
                t.img.src = t.src,
                t.img.classList.add("w100", "absolute"),
                void e.transform(t.img)
        },
        listenImg: function (t) {
            function a(e) {
                return Math.sqrt(1 - Math.pow(e - 1, 2))
            }
            var n = this;
            var i = 1;
            new e.finger(t, {
                multipointStart: function () {
                    n.To.stopAll(),
                        i = t.scaleX
                },
                rotate: function (e) {
                    t.rotateZ += e.angle
                },
                pinch: function (e) {
                    t.scaleX = t.scaleY = i * e.zoom
                },
                multipointEnd: function () {
                    n.To.stopAll(),
                        1 > t.scaleX && (new n.To(t, "scaleX", 1, 500, a),
                            new n.To(t, "scaleY", 1, 500, a)),
                        3 < t.scaleX && (new n.To(t, "scaleX", 2, 500, a),
                            new n.To(t, "scaleY", 2, 500, a));
                    var e = t.rotateZ % 360;
                    0 > e && (e = 360 + e),
                        t.rotateZ = e,
                        0 < e && 45 > e ? new n.To(t, "rotateZ", 0, 500, a) : 315 <= e ? new n.To(t, "rotateZ", 360, 500, a) : 45 <= e && 135 > e ? new n.To(t, "rotateZ", 90, 500, a) : 135 <= e && 225 > e ? new n.To(t, "rotateZ", 180, 500, a) : 225 <= e && 315 > e && new n.To(t, "rotateZ", 270, 500, a)
                },
                pressMove: function (e) {
                    t.translateX += e.deltaX,
                        t.translateY += e.deltaY
                },
                longTap: function () {
                    n.callback(n.src)
                }
            })
        },
        listenClose: function (t) {
            var a = this;
            new e.finger(t, {
                tap: function () {
                    a.pluginWrap.removeChild(a.domBox)
                }
            })
        }
    },
        e.zoomIn = t
}
)(phoenix);
//日历
(function (e) {
    var t = function (t) {
        var a = this;
        if (t.ele) {
            var n = function () {
                return !0
            };
            a.pluginWrap = e.config.pluginWrap || document.querySelector("#pluginWrap"),
                a.ele = t.ele,
                a.title = t.title || "\u65E5\u671F\u9009\u62E9",
                a.type = t.type || "single";
            var i;
            i = t.defaultShow ? new Date(t.defaultShow) : new Date,
                a.currentYear = i.getFullYear(),
                a.currentMonth = i.getMonth() + 1,
                a.currentDay = i.getDate(),
                a.activeDate = t.defaultDate || [],
                a.minDate = new Date(t.minDate) || null,
                a.maxDate = new Date(t.maxDate) || null,
                a.filterDate = "function" == typeof t.filterDate ? t.filterDate : n,
                a.confirm = "function" == typeof t.confirm ? t.confirm : function () {
                    return "ok"
                }
                ,
                a.complete = "function" == typeof t.complete ? t.complete : n,
                a.multipleSelect = [],
                "range" === a.type && 0 < a.activeDate.length && (a.multipleSelect.push(a.activeDate[0]),
                    a.multipleSelect.push(a.activeDate[a.activeDate.length])),
                a.listenEle()
        }
    };
    t.prototype = {
        listenEle: function () {
            var t = this;
            new e.finger(t.ele, {
                tap: function () {
                    t.createDom()
                }
            })
        },
        createDom: function () {
            var t = this;
            t.pluginWrap.innerHTML = "",
                t.pluginBox = e.createDom("DIV", "plugin_box"),
                t.modal = e.createDom("DIV", "plugin_modal"),
                t.plugin = e.createDom("DIV", "calendar"),
                t.plugin.appendChild(e.createDom("DIV", "calendar_name color_gray3", t.title));
            var a = e.createDom("DIV", "calendar_top");
            t.prevYear = e.createDom("DIV", "calendar_prev_year", "<i class=\"phoenix_icon phoenix_icon_doubleleft\"></i>"),
                a.appendChild(t.prevYear),
                t.prevMonth = e.createDom("DIV", "calendar_prev_month", "<i class=\"phoenix_icon phoenix_icon_left\"></i>"),
                a.appendChild(t.prevMonth),
                t.pluginTitle = e.createDom("DIV", "calendar_title"),
                a.appendChild(t.pluginTitle),
                t.nextMonth = e.createDom("DIV", "calendar_next_month", "<i class=\"phoenix_icon phoenix_icon_right\"></i>"),
                a.appendChild(t.nextMonth),
                t.nextYear = e.createDom("DIV", "calendar_next_year", "<i class=\"phoenix_icon phoenix_icon_doubleright\"></i>"),
                a.appendChild(t.nextYear),
                t.plugin.appendChild(a),
                t.plugin.appendChild(e.createDom("DIV", "calendar_weekdays  color_gray4", "<span>\u4E00</span><span>\u4E8C</span><span>\u4E09</span><span>\u56DB</span><span>\u4E94</span><span>\u516D</span><span>\u65E5</span>")),
                t.pluginContent = e.createDom("UL", "calendar_content"),
                t.plugin.appendChild(t.pluginContent),
                t.btnBox = e.createDom("DIV", "calendar_btn"),
                t.plugin.appendChild(t.btnBox),
                t.btn = e.createDom("DIV", "calendar_button", "\u786E\u5B9A"),
                t.btnBox.appendChild(t.btn),
                t.btnModal = e.createDom("DIV", "calendar_btn_modal"),
                t.btnBox.appendChild(t.btnModal),
                t.pluginBox.appendChild(t.plugin),
                t.pluginBox.appendChild(t.modal),
                t.pluginWrap.appendChild(t.pluginBox),
                t.createDay(t.pluginContent),
                "multiple" === t.type ? t.listenMultiple() : "range" === t.type ? t.listenRange() : t.listenSingle();
            t.listenModal(),
                t.listenPrevYear(),
                t.listenPrevMonth(),
                t.listenNextMonth(),
                t.listenNextYear(),
                t.listenBtn(),
                t.setClose()
        },
        listenSingle: function () {
            var t = this;
            new e.finger(t.pluginContent, {
                tap: function (a) {
                    var e = a.target
                        , n = e.getAttribute("data-date");
                    null == n || "LI" !== e.tagName || e.classList.contains("active") || e.classList.contains("disabled") || (t.activeDate = [n],
                        t.setActive())
                }
            })
        },
        listenRange: function () {
            var t = this;
            new e.finger(t.pluginContent, {
                tap: function (a) {
                    var e = a.target
                        , n = e.getAttribute("data-date");
                    if (!(null == n || "LI" !== e.tagName || e.classList.contains("disabled"))) {
                        if (2 == t.multipleSelect.length)
                            t.multipleSelect = [n],
                                t.activeDate = [n];
                        else if (1 == t.multipleSelect.length) {
                            t.multipleSelect.push(n);
                            var i = new Date(t.multipleSelect[0])
                                , l = new Date(t.multipleSelect[1]);
                            for (i > l && (i = new Date(t.multipleSelect[1]),
                                l = new Date(t.multipleSelect[0])),
                                t.activeDate = []; i <= l;) {
                                if (i < t.minDate || i > t.maxDate || !1 === t.filterDate(i)) {
                                    i.setDate(i.getDate() + 1);
                                    continue
                                }
                                var r = i.getMonth() + 1;
                                t.activeDate.push(i.getFullYear() + "/" + r + "/" + i.getDate()),
                                    i.setDate(i.getDate() + 1)
                            }
                        } else
                            0 == t.multipleSelect.length && (t.multipleSelect.push(n),
                                t.activeDate = [n]);
                        t.setActive()
                    }
                }
            })
        },
        listenMultiple: function () {
            var t = this;
            new e.finger(t.pluginContent, {
                tap: function (a) {
                    var e = a.target
                        , n = e.getAttribute("data-date");
                    null == n || "LI" !== e.tagName || e.classList.contains("disabled") || (e.classList.contains("active") ? -1 < t.activeDate.indexOf(n) && t.activeDate.splice(t.activeDate.indexOf(n), 1) : t.activeDate.push(n),
                        t.setActive())
                }
            })
        },
        createDay: function () {
            var e = this;
            e.setTitle();
            var t = new Date(e.currentYear, e.currentMonth, 0).getDate()
                , a = new Date(Date.UTC(e.currentYear, e.currentMonth - 1, 1)).getDay();
            0 === a && (a = 7);
            var n = "";
            for (let e = 1; e < a; e++)
                n += "<li>&nbsp;</li>";
            for (let a = 1; a <= t; a++) {
                var l = new Date(e.currentYear + "/" + e.currentMonth + "/" + a);
                if (e.minDate && l < e.minDate) {
                    n += "<li class=\"disabled\" data-date=\"" + e.currentYear + "/" + e.currentMonth + "/" + a + "\">" + a + "</li>";
                    continue
                }
                if (e.maxDate && l > e.maxDate) {
                    n += "<li class=\"disabled\" data-date=\"" + e.currentYear + "/" + e.currentMonth + "/" + a + "\">" + a + "</li>";
                    continue
                }
                if (!1 === e.filterDate(l)) {
                    n += "<li class=\"disabled\" data-date=\"" + e.currentYear + "/" + e.currentMonth + "/" + a + "\">" + a + "</li>";
                    continue
                }
                n += "<li data-date=\"" + e.currentYear + "/" + e.currentMonth + "/" + a + "\">" + a + "</li>"
            }
            e.pluginContent.innerHTML = n,
                e.setActive()
        },
        setActive: function () {
            var e = this
                , t = e.pluginContent.querySelectorAll("LI")
                , a = e.activeDate.length;
            if ("range" === e.type) {
                for (let r = 0; r < t.length; r++) {
                    var n = t[r].getAttribute("data-date")
                        , l = e.activeDate.indexOf(n);
                    if (null !== n)
                        if (-1 < l) {
                            t[r].className = 0 === l || l === a - 1 ? "active" : "active_in";
                            continue
                        } else
                            t[r].classList.contains("active") && t[r].classList.remove("active"),
                                t[r].classList.contains("active_in") && t[r].classList.remove("active_in")
                }
                1 < e.multipleSelect.length ? e.btnBox.querySelector(".calendar_btn_modal") && e.btnBox.removeChild(e.btnModal) : e.btnBox.querySelector(".calendar_btn_modal") || e.btnBox.appendChild(e.btnModal)
            }
            if ("single" === e.type || "multiple" === e.type) {
                for (let a = 0; a < t.length; a++) {
                    var n = t[a].getAttribute("data-date");
                    if (null !== n)
                        if (-1 < e.activeDate.indexOf(n)) {
                            t[a].className = "active";
                            continue
                        } else
                            t[a].classList.contains("active") && t[a].classList.remove("active")
                }
                0 < a ? e.btnBox.querySelector(".calendar_btn_modal") && e.btnBox.removeChild(e.btnModal) : e.btnBox.querySelector(".calendar_btn_modal") || e.btnBox.appendChild(e.btnModal)
            }
        },
        setClose: function () {
            var t = this
                , a = e.createDom("DIV", "calendar_close i18", "<i class=\"phoenix_icon phoenix_icon_close\"></i>");
            t.plugin.querySelector(".calendar_name").appendChild(a),
                new e.finger(a, {
                    tap: function () {
                        t.close()
                    }
                })
        },
        listenPrevYear: function () {
            var t = this;
            new e.finger(t.prevYear, {
                tap: function () {
                    t.currentYear -= 1,
                        t.createDay()
                }
            })
        },
        listenPrevMonth: function () {
            var t = this;
            new e.finger(t.prevMonth, {
                tap: function () {
                    1 < t.currentMonth ? --t.currentMonth : (t.currentMonth = 12,
                        t.currentYear -= 1);
                    t.createDay()
                }
            })
        },
        listenNextMonth: function () {
            var t = this;
            new e.finger(t.nextMonth, {
                tap: function () {
                    12 > t.currentMonth ? ++t.currentMonth : (t.currentMonth = 1,
                        t.currentYear += 1);
                    t.createDay()
                }
            })
        },
        listenNextYear: function () {
            var t = this;
            new e.finger(t.nextYear, {
                tap: function () {
                    t.currentYear += 1,
                        t.createDay()
                }
            })
        },
        close: function () {
            var e = this;
            e.plugin.setAttribute("style", "animation:am_fadeOutBottom .5s ease forwards;"),
                e.pluginBox.removeChild(e.modal),
                setTimeout(function () {
                    e.pluginBox.removeChild(e.plugin),
                        e.pluginWrap.removeChild(e.pluginBox)
                }, 450)
        },
        listenModal: function () {
            var t = this;
            new e.finger(t.modal, {
                tap: function () {
                    t.close()
                }
            })
        },
        listenBtn: function () {
            var t = this;
            new e.finger(t.btn, {
                tap: function () {
                    var e = t.confirm(t.activeDate);
                    "ok" === e ? (t.complete(t.activeDate),
                        t.close()) : t.showError(e)
                }
            })
        },
        showError: function (t) {
            var a = this;
            a.error || (a.error = e.createDom("DIV", "calendar_error", "<span>" + t + "</span>"),
                a.btnBox.appendChild(a.error),
                setTimeout(function () {
                    a.btnBox.removeChild(a.error),
                        a.error = null
                }, 2e3))
        },
        setTitle: function () {
            var e = this;
            e.pluginTitle.innerHTML = "" + e.currentYear + "\u5E74" + e.currentMonth + "\u6708"
        }
    },
        e.calendar = t
}
)(phoenix);
//scrollNews
(function (e) {
    var t = function (e) {
        var t = this;
        t.wrap = e.wrap,
            t.newsDetail = e.newsDetail,
            t.newsData = e.newsData,
            t.listHeight = e.listHeight || 40,
            t.time = e.time || 5e3,
            t.initial()
    };
    t.prototype = {
        initial: function () {
            var e = this
                , t = document.createElement("UL");
            for (var a in e.newsData) {
                var n = "<li class=\"of relative\"><page path=\"" + e.newsDetail + "\" params={\"id\":" + e.newsData[a][1] + "}></page>" + e.newsData[a][0] + "</li>";
                t.insertAdjacentHTML("beforeend", n)
            }
            e.wrap.appendChild(t),
                e.scroll(t)
        },
        scroll: function (e) {
            var t = this;
            if (0 != t.wrap.length) {
                var a = 0;
                1 < t.newsData.length && setInterval(function () {
                    a += 1,
                        e.classList.add("scroll_news_animate"),
                        e.setAttribute("style", "transform:translateY(-" + t.listHeight * a + "px);-webkit-transform:translateY(-" + t.listHeight * a + "px)"),
                        setTimeout(function () {
                            a == t.newsData.length && (e.classList.remove("scroll_news_animate"),
                                e.setAttribute("style", "transform:translateY(0);-webkit-transform:translateY(0)"),
                                a = 0)
                        }, 300)
                }, t.time)
            }
        }
    },
        e.scrollNews = t
}
)(phoenix);
//搜索
(function (e) {
    var t = function (e) {
        var t = this;
        t.i = e.searchInput,
            t.d = e.searchInputDel,
            t.b = e.searchBtn,
            t.c = e.searchContent,
            t.h = e.searchList,
            t.m = e.searchListMax || 30,
            t.r = e.searchResult,
            t.l = e.loadResult,
            t.e = e.editHistory,
            t.t = "",
            t.ul = "",
            0 < t.h.length && t.listHistory();
        t.listenerInput(),
            t.listenerBtn(),
            t.listenerInputDel()
    };
    t.prototype = {
        listHistory: function () {
            var e = this;
            e.c.innerHTML = "";
            var a = document.createElement("div");
            e.t = a,
                a.classList.add("flex"),
                a.classList.add("box"),
                a.insertAdjacentHTML("beforeend", "<div class=\"flex1 p10 color_gray3\">\u5386\u53F2\u8BB0\u5F55</div><div class=\"flex0 fr color_gray3 p10\">\u6E05\u7A7A\u5386\u53F2\u641C\u7D22</div>");
            var t = document.createElement("ul");
            e.ul = t,
                t.classList.add("box"),
                t.classList.add("plr10"),
                t.classList.add("color_gray");
            for (var n = "", l = 0; l < e.h.length; l++)
                n += "<li class=\"box ptb10\" data-key=\"" + e.h[l] + "\">" + e.h[l] + "</li>";
            t.insertAdjacentHTML("beforeend", n),
                e.c.appendChild(a),
                e.c.appendChild(t),
                e.listenerDel(e.t.getElementsByTagName("div")[1]),
                e.listenerList(e.ul)
        },
        listenerDel: function (e) {
            var t = this;
            e.addEventListener("click", function () {
                t.h = [],
                    "function" == typeof t.e && t.e(t.h),
                    t.c.innerHTML = ""
            })
        },
        listenerInputDel: function () {
            var e = this;
            e.d.addEventListener("click", function () {
                e.i.value = "",
                    e.r.classList.contains("hide") || (e.r.classList.add("hide"),
                        e.listHistory());
                e.d.classList.add("hide")
            })
        },
        listenerList: function (e) {
            var t = this;
            e.addEventListener("click", function (a) {
                if ("LI" == a.target.tagName) {
                    var e = a.target.getAttribute("data-key");
                    t.h.splice(t.h.indexOf(e), 1),
                        t.h.unshift(e),
                        t.c.innerHTML = "",
                        t.i.value = e,
                        t.r.classList.remove("hide"),
                        "function" == typeof t.l && t.l(e),
                        "function" == typeof t.e && t.e(t.h),
                        t.d.classList.remove("hide")
                }
            })
        },
        listenerInput: function () {
            var e = this;
            e.i.addEventListener("input", function () {
                0 == e.i.value.length ? (e.d.classList.add("hide"),
                    e.r.classList.add("hide"),
                    e.listHistory()) : e.d.classList.remove("hide")
            }, !1)
        },
        listenerBtn: function () {
            var e = this;
            e.b.addEventListener("click", function () {
                var t = e.i.value;
                0 < t.length && (e.c.innerHTML = "",
                    e.r.classList.remove("hide"),
                    "function" == typeof e.l && e.l(t),
                    -1 == e.h.indexOf(t) ? (29 < e.h.length && e.h.pop(),
                        e.h.unshift(t),
                        "function" == typeof e.e && e.e(e.h)) : (e.h.splice(e.h.indexOf(t), 1),
                            e.h.unshift(t)),
                    "function" == typeof e.e && e.e(e.h))
            })
        }
    },
        e.search = t
}
)(phoenix);
//支付选择
(function (e) {
    var t = function (e) {
        var t = this;
        if (e.type && e.price && e.page) {
            var a = function () { };
            t.page = e.page,
                t.type = e.type,
                t.price = e.price,
                t.cancel = e.cancel || a,
                t.pay = e.pay || a,
                t.icon = e.icon || "<i class=\"phoenix_icon phoenix_icon_star-fill\"></i>",
                t.size = e.size || "i30",
                t.color0 = e.color0 || "color_gray3",
                t.color1 = e.color1 || "color_yellow",
                t.create(),
                t.selectType = -1
        }
    };
    t.prototype = {
        create: function () {
            var a = this;
            a.pluginWrap = document.createElement("DIV"),
                a.pluginWrap.classList.add("payment_wrap"),
                a.page.appendChild(a.pluginWrap),
                a.pb = document.createElement("DIV"),
                a.pb.classList.add("plugin_box"),
                a.m = document.createElement("DIV"),
                a.m.classList.add("plugin_modal"),
                a.payment = document.createElement("DIV"),
                a.payment.classList.add("payment"),
                a.top = document.createElement("DIV"),
                a.top.classList.add("payment_top", "flex"),
                a.top.innerHTML = "<div class=\"flex0 plr20\"></div><div class=\"flex1 p10 pt20 ac\">\u8BF7\u9009\u62E9\u652F\u4ED8\u65B9\u5F0F</div><div class=\"flex0 relative pt10 pb20 pl20 pr10\"><div class=\"link\"></div><i class=\"phoenix_icon phoenix_icon_close\"></i></div>",
                a.ul = document.createElement("UL");
            for (var t = "", n = 0; n < a.type.length; n++)
                "wxpay" === a.type[n] && (t += "<li class=\"flex relative lh48 ptb5\"><div class=\"link\" data-type=\"weixin\" data-index=\"" + n + "\"></div><div class=\"flex0 plr10 i28 color_green\"><i class=\"phoenix_icon phoenix_icon_weixinpay\"></i></div><div class=\"flex1 f16\">\u5FAE\u4FE1</div><div class=\"flex0 plr20 i20 color_gray2 paymentType\"><i class=\"phoenix_icon phoenix_icon_circle\"></i></div></li>"),
                    "alipay" === a.type[n] && (t += "<li class=\"flex relative lh48 ptb5\"><div class=\"link\" data-type=\"alipay\" data-index=\"" + n + "\"></div><div class=\"flex0 plr10 i28 color_blue\"><i class=\"phoenix_icon phoenix_icon_alipay-circle-fill\"></i></div><div class=\"flex1 f16\">\u652F\u4ED8\u5B9D</div><div class=\"flex0 plr20 i20 color_gray2 paymentType\"><i class=\"phoenix_icon phoenix_icon_circle\"></i></div></li>"),
                    "face" === a.type[n] && (t += "<li class=\"flex relative lh48 ptb5\"><div class=\"link\" data-type=\"face\" data-index=\"" + n + "\"></div><div class=\"flex0 plr10 i28 color_orange\"><i class=\"phoenix_icon phoenix_icon_huodaofukuan\"></i></div><div class=\"flex1 f16\">\u8D27\u5230\u4ED8\u6B3E</div><div class=\"flex0 plr20 i20 color_gray2 paymentType\"><i class=\"phoenix_icon phoenix_icon_circle\"></i></div></li>"),
                    "balance" === a.type[n] && (t += "<li class=\"flex relative lh48 ptb5\"><div class=\"link\" data-type=\"face\" data-index=\"" + n + "\"></div><div class=\"flex0 plr10 i28 color_pink\"><i class=\"phoenix_icon phoenix_icon_yuan-circle-fill\"></i></div><div class=\"flex1 f16\">\u4F59\u989D\u652F\u4ED8</div><div class=\"flex0 plr20 i20 color_gray2 paymentType\"><i class=\"phoenix_icon phoenix_icon_circle\"></i></div></li>");
            a.ul.innerHTML = t,
                a.btn = document.createElement("DIV"),
                a.btn.classList.add("plr20", "ptb10"),
                a.btn.innerHTML = "<div class=\"relative lh48 ac bg_orange radius100\"><div class=\"link\"></div>\u786E\u8BA4\u652F\u4ED8 <span class=\"f12\">\uFFE5</span><span class=\"f18\">" + a.price + "</span></div>",
                a.pluginWrap.appendChild(a.pb),
                a.pb.appendChild(a.m),
                a.payment.appendChild(a.top),
                a.payment.appendChild(a.ul),
                a.payment.appendChild(a.btn),
                a.pb.appendChild(a.payment),
                new e.finger(a.top, {
                    tap: function (t) {
                        t.target.classList.contains("link") && a.cancel()
                    }
                }),
                new e.finger(a.ul, {
                    tap: function (n) {
                        var e = a.ul.querySelectorAll("LI")
                            , i = n.target;
                        if (i.classList.contains("link")) {
                            var t = i.parentNode.querySelector(".paymentType I");
                            if (-1 < a.selectType) {
                                var e = a.ul.querySelectorAll("LI")[a.selectType]
                                    , l = e.querySelector(".paymentType I");
                                l.classList.remove("color_red", "phoenix_icon_check-circle-fill"),
                                    l.classList.add("phoenix_icon_circle")
                            }
                            t.classList.add("color_red", "phoenix_icon_check-circle-fill"),
                                t.classList.remove("phoenix_icon_circle"),
                                a.selectType = +n.target.getAttribute("data-index")
                        }
                    }
                }),
                new e.finger(a.btn, {
                    tap: function (t) {
                        t.target.classList.contains("link") && -1 < a.selectType && -1 < a.selectType && a.pay(a.type[a.selectType], +a.price)
                    }
                })
        },
        remove: function () {
            var e = this;
            e.payment.setAttribute("style", "animation:am_fadeOutBottom .5s ease forwards;"),
                e.pb.removeChild(e.m),
                setTimeout(function () {
                    e.pluginWrap.querySelector(".plugin_box") && (e.pluginWrap.removeChild(e.pb),
                        e.pluginWrap.parentNode.removeChild(e.pluginWrap))
                }, 450)
        }
    },
        e.pickPayment = t
}
)(phoenix);
//城市选择
(function (e) {
    var t = function (e) {
        var t = this;
        if (e.content) {
            var a = function () { };
            t.wrap = document.querySelector("#pluginWrap"),
                t.data = e.data,
                t.content = e.content,
                t.callback = e.callback || a,
                t.input = e.input || !1,
                t.searchDel = e.searchDel || "",
                t.createList()
        }
    };
    t.prototype = {
        createSearch: function (t) {
            var a = this;
            if (a.input && "INPUT" == a.input.tagName) {
                var n = document.createElement("UL");
                n.classList.add("pickletters3", "box", "hide"),
                    a.content.insertBefore(n, a.content.firstChild),
                    new e.finger(n, {
                        tap: function (t) {
                            t.target.classList.contains("link") && a.callback(t.target.getAttribute("data-name"), t.target.getAttribute("data-id"))
                        }
                    }),
                    new e.finger(a.searchDel, {
                        tap: function (t) {
                            t.target.classList.contains("link") && (a.input.value = "",
                                n.classList.add("hide"),
                                a.searchDel.classList.add("hide"))
                        }
                    }),
                    a.input.oninput = function () {
                        var e = (a.input.value + "").trim();
                        if (!e)
                            return n.classList.add("hide"),
                                void a.searchDel.classList.add("hide");
                        a.searchDel.classList.contains("hide") && a.searchDel.classList.remove("hide");
                        for (var l = "", r = 0; r < t.length; r++)
                            -1 != t[r][0].indexOf((a.input.value + "").trim()) && (l += "<li class=\"box plr12 lh48\"><div class=\"link\" data-id=\"" + t[r][1] + "\" data-name=\"" + t[r][0] + "\"></div>" + t[r][0] + "</li>");
                        n.innerHTML = l,
                            n.classList.contains("hide") && n.classList.remove("hide")
                    }
            }
        },
        createList: function () {
            var t = this
                , a = []
                , n = document.createElement("UL");
            n.classList.add("pickletters1");
            for (var r, s = "", o = 0, c = [], d = 0; d < t.data.length; d++) {
                r = t.data[d].content,
                    a.push([t.data[d].letter, o]),
                    o += r.length + 1,
                    s += "<li class=\"p12\">" + t.data[d].letter + "</li>";
                for (var p, u = 0; u < r.length; u++)
                    p = r[u][1] ? r[u][1] : 0,
                        s += "<li class=\"box plr12 lh48\"><div class=\"link\" data-id=\"" + p + "\" data-name=" + r[u][0] + "></div>" + r[u][0] + "</li>",
                        c.push([r[u][0], p])
            }
            n.insertAdjacentHTML("afterbegin", s),
                t.content.insertBefore(n, t.content.firstChild),
                new e.finger(n, {
                    tap: function (a) {
                        a.target.classList.contains("link") && t.callback(a.target.getAttribute("data-name"), a.target.getAttribute("data-id"))
                    }
                }),
                t.createLetters(a),
                t.createSearch(c)
        },
        createLetters: function (t) {
            var a = this
                , n = document.createElement("DIV");
            n.classList.add("pickletters2");
            for (var l = "", r = 0; r < t.length; r++)
                l += "<li class=\"relative\"><div class=\"link\" data-num=\"" + t[r][1] + "\"></div>" + t[r][0] + "</li>";
            n.insertAdjacentHTML("afterbegin", "<ul>" + l + "</ul>"),
                a.content.parentNode.insertBefore(n, a.content),
                new e.finger(n, {
                    tap: function (t) {
                        t.target.getAttribute("data-num") && (a.content.scrollTop = 48 * parseInt(t.target.getAttribute("data-num")))
                    }
                })
        }
    },
        e.pickLetters = t
}
)(phoenix);


export default phoenix;