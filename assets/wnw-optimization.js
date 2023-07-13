var src,srcset,wnw_windowWidth,wnw_windowHeight,critical2,critical3,cls_css,lazyBackground,lazyIframe,lazyPoster,lazybg,lazybg2,s,i,flag=1,external_single_loaded=1;

document.addEventListener("DOMContentLoaded", function() {
	wnw_windowWidth=screen.width;
	wnw_windowHeight=screen.height;
	lazyLoadImg2();
	lazyLoadBackground2();
	window.addEventListener("scroll", function() {
		wnw_init();
	});
	window.addEventListener("mousemove", function() {
		wnw_init();
	});
	window.addEventListener("touchstart", function() {
		wnw_init();
	});
	setTimeout(function() {
		wnw_init();
	}, 8000);
});

function wnw_init() {
	cls_css = document.querySelectorAll(".cls_css");
	cls_css.forEach(function(a) {
		a.remove();
	});
	lazyLoadCss();
	lazyLoadStyle();
	lazyLoadImg();
	lazyLoadBackground();
	lazyLoadIframe();
	lazyLoadPoster();
	if (flag) {
		flag = 0;
		load_all_js();
	}
}

function insertAfter(newNode, referenceNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function lazyLoadImg() {
	var imgs = document.querySelectorAll("img.lazy2");

	for (i = 0; i < imgs.length; i++) {
			if (wnw_windowWidth < 600) {
				src = (imgs[i].dataset.mobsrc === undefined) ? imgs[i].dataset.src : imgs[i].dataset.mobsrc;
			} else {
				src = (imgs[i].dataset.src === undefined) ? imgs[i].src : imgs[i].dataset.src;
			}
			srcset = imgs[i].getAttribute("data-srcset") ? imgs[i].getAttribute("data-srcset") : "";
			if (src != null && src != "") {
				imgs[i].src = src;
			}
			if (srcset != null && srcset != "") {
				imgs[i].srcset = srcset;
			}
			imgs[i].classList.remove("lazy2");
	}
}

function lazyLoadImg2() {
	var imgs = document.querySelectorAll("img.lazy3");

	for (i = 0; i < imgs.length; i++) {
		var elemRect = imgs[i].getBoundingClientRect();
        if (elemRect.top != 0 && elemRect.top - wnw_windowHeight < 0) {
			if (wnw_windowWidth < 600) {
				src = (imgs[i].dataset.mobsrc === undefined) ? imgs[i].dataset.src : imgs[i].dataset.mobsrc;
			} else {
				src = (imgs[i].dataset.src === undefined) ? imgs[i].src : imgs[i].dataset.src;
			}
			srcset = imgs[i].getAttribute("data-srcset") ? imgs[i].getAttribute("data-srcset") : "";
			if (src != null && src != "") {
				imgs[i].src = src;
			}
			if (srcset != null && srcset != "") {
				imgs[i].srcset = srcset;
			}
			imgs[i].classList.remove("lazy3");
		}
	}
}

function lazyLoadBackground() {
	lazyBackground = document.querySelectorAll(".lazybg");
	lazyBackground.forEach(function(a) {
		if (wnw_windowWidth < 600) {
			lazybg = (a.dataset.mobstyle === undefined) ? a.dataset.style : a.dataset.mobstyle;
		} else {
			lazybg = (a.dataset.style === undefined) ? a.style : a.dataset.style;
		}
		if (lazybg != null && lazybg != "") {
			a.style = lazybg;
		}
		a.classList.remove("lazybg");
	});
}

function lazyLoadBackground2() {
	lazyBackground = document.querySelectorAll(".lazybg2");
	lazyBackground.forEach(function(a) {
		var elemRect = a.getBoundingClientRect();
        if (elemRect.top != 0 && elemRect.top - wnw_windowHeight < 0) {
            if (wnw_windowWidth < 600) {
                lazybg = (a.dataset.mobstyle === undefined) ? a.dataset.style : a.dataset.mobstyle;
            } else {
                lazybg = (a.dataset.style === undefined) ? a.style : a.dataset.style;
            }
            if (lazybg != null && lazybg != "") {
                a.style = lazybg;
            }
            a.classList.remove("lazybg2");
		}
	});
}

function lazyLoadCss() {
	var lazyLink = document.querySelectorAll("link[data-href]");
	for (i = 0; i < lazyLink.length; i++) {
		var css_element = document.createElement("link");
		css_element.href = lazyLink[i].getAttribute("data-href");
		css_element.rel = "stylesheet";
		lazyLink[i].parentNode.insertBefore(css_element, lazyLink[i]);
		delete lazyLink[i].dataset.href;
		lazyLink[i].parentNode.removeChild(lazyLink[i]);
	}
}

function lazyLoadStyle() {
	var lazyStyle = document.querySelectorAll("style[type=lazyload2]");
	for (i = 0; i < lazyStyle.length; i++) {
		var style_element = document.createElement("style");
		style_element.innerHTML = lazyStyle[i].innerHTML;
		lazyStyle[i].parentNode.insertBefore(style_element, lazyStyle[i]);
		lazyStyle[i].parentNode.removeChild(lazyStyle[i]);
	}
}

function lazyLoadIframe() {
	lazyIframe = document.querySelectorAll("iframe");
	lazyIframe.forEach(function(a) {
		if (a.dataset.src != null && a.dataset.src != "") {
			a.src = a.dataset.src;
			delete a.dataset.src;
		}
	});
}

		
function lazyLoadPoster() {	
	var lazyPoster = document.querySelectorAll("video[data-poster]");	
	lazyPoster.forEach(function(a) {	
		if (a.dataset.poster != null && a.dataset.poster != "") {	
			a.poster = a.dataset.poster;	
			delete a.dataset.poster;	
		}	
	});	
}

function w3_load_js_uri(static_script) {
	var ext_js_element = document.createElement("script");
	if (typeof(static_script.attributes) != "undefined") {
		for (var att, i3 = 0, atts = static_script.attributes, n3 = atts.length; i3 < n3; i3++) {
			att = atts[i3];
			if (att.nodeName != "data-src" && att.nodeName != "type") {
				ext_js_element.setAttribute(att.nodeName, att.nodeValue);
			}
		}
	}
	ext_js_element.src = static_script.getAttribute("data-src");
	insertAfter(ext_js_element, static_script);
	delete static_script.dataset.src;
	delete static_script.type;
	static_script.parentNode.removeChild(static_script);
	return ext_js_element;
}

function w3_load_inline_js_single(script) {
	if (!external_single_loaded) {
		setTimeout(function() {
			w3_load_inline_js_single(script);
		}, 100);
		return false;
	}
	s = document.createElement("script");
	for (var i2 = 0; i2 < script.attributes.length; i2++) {
		var attrib = script.attributes[i2];
		if (attrib.name != "type") {
			s.setAttribute(attrib.name, attrib.value);
		}
	}
	s.innerHTML = script.innerHTML;
	insertAfter(s, script);
	script.parentNode.removeChild(script);
}

function lazyLoadScripts() {
	var static_script = document.querySelectorAll("script[type=lazyload2]");
	if (static_script.length < 1) {
      	document.body.classList.add("wnw_loaded");
		fullJSLoadedCB();
		return;
	}
	if (static_script[0].getAttribute("data-src") !== null) {
		var js_obj = w3_load_js_uri(static_script[0]);
		js_obj.onload = function() {
			lazyLoadScripts();
		};
		js_obj.onerror = function() {
			lazyLoadScripts();
		};
	} else {
		w3_load_inline_js_single(static_script[0]);
		lazyLoadScripts();
	}
}

function wnwAnalytics() {
	var script2 = document.querySelectorAll(".analytics");
	script2.forEach(function(analyticsScript) {
		trekkie.integrations=false;
		s = document.createElement("script");
		s.innerHTML = analyticsScript.innerHTML;
		insertAfter(s, analyticsScript);
		analyticsScript.parentNode.removeChild(analyticsScript);
	});
}


function load_all_js() {
	if(Shopify.designMode || window.location.href.indexOf("/cart") > -1 || window.location.href.indexOf("/checkout") > -1) {
		console.log("No-optimization");
	} else {
		console.log("Yes-optimization");
		setTimeout(function() {
			wnwAnalytics();		
	  	},100);
		setTimeout(function() {
			var wnw_load_event = document.createEvent("Event");
			wnw_load_event.initEvent("wnw_load", true, true);
			window.document.dispatchEvent(wnw_load_event);
		}, 500);
		setTimeout(function() {
			var DOMContentLoaded2_event = document.createEvent("Event");
			DOMContentLoaded2_event.initEvent("DOMContentLoaded2", true, true);
			window.document.dispatchEvent(DOMContentLoaded2_event);
		}, 5000);

	}

	lazyLoadScripts();
	setTimeout(function() {
		critical2 = document.querySelectorAll(".critical2");
		critical2.forEach(function(a) {
			a.remove();
		});
	}, 9999);
	setTimeout(function() {
		critical3 = document.querySelectorAll(".critical3");
		critical3.forEach(function(a) {
			a.remove();
		});
	}, 3000);
	setInterval(function() {
		lazyLoadImg();
		lazyLoadIframe();
    });

}

function fullJSLoadedCB() {
	setTimeout(function() {
	});
}