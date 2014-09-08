// ==UserScript==
// @name localav
// @namespace https://github.com/doomred
// @description Lightweight avfun video dumper
// @version v0.0.0
// @encoding utf-8
// @license GPLv3
// @copyleft dye `Eric' jarhoo
// @author dye `Eric' jarhoo
// @homepageURL htpp://saltyremix.com
// @icon https://raw.github.com/doomred/localav/master/localav_icon.png
// @updateURL https://raw.github.com/doomred/localav/master/localav.meta.js
// @include http://*.acfun.*/v/ac*
// @run-at document-end
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// @grant GM_openInTab
// @grant GM_registerMenuCommand
// ==/UserScript==

var lvDebug, lvRight, lvBt, lvMain;
lvDebug = 0;  /* debug usage */
lvRight = GM_getValue('gm_lv_right', '1em');
lvBt = GM_getValue('gm_lv_bottom', '1em');

function forceupdate() {
	'use strict';
	GM_openInTab('https://raw.github.com/doomred/localav/master/localav.user.js');
	void(0);
}
GM_registerMenuCommand('localav| Force Update!', forceupdate, 'a');


function lvMain() {
	'use strict';
	function dynamicparts(obj) {
		var key, contentbox, contentSize, temp, i, contentURL, lvDiv;
		lvDiv = window.top.document.getElementById('lv-box');
		for(key in obj) {
			if(obj.hasOwnProperty(key)) {
				contentbox = document.createElement('div');
				contentbox.classList.add('lv-content');
				contentbox.style.margin = '1em 1.5em 0 1.5em';
				contentbox.style.cssFloat = 'left';
				contentbox.style.cursor = 'pointer';
				contentURL = obj[key].files[0].url;
				contentbox.setAttribute('data-lv', contentURL);
				temp = (obj[key].files[0].bytes / 1024 / 1024 * 100);  // leave two float point
				contentSize = parseInt(temp, 10) / 100;

				contentbox.appendChild(document.createTextNode(obj[key].quality + '[' + obj[key].files[0].type + ']'));
				contentbox.innerHTML += "<br />";
				if(!contentSize) {contentSize = '未知';}
				contentbox.appendChild(document.createTextNode(contentSize + "MB"));
				contentbox.addEventListener('click', function (e) {  // to download stuff within pure js, midified via stackoverflow 	
					var iframe, eventSender, cSrc;
					if (!e && window.event) {e = window.event;}
					eventSender = (window.event) ? e.srcElement : e.target;
					cSrc = eventSender.getAttribute('data-lv');
					if(cSrc.search('.hlv?') !== -1) {  // sina hlv fix
						GM_openInTab(cSrc);
					} else {
						iframe = document.createElement('iframe');
						iframe.style.display = 'none';
						iframe.style.position = 'absoulte';
						iframe.style.top = '0px';
						iframe.style.left = '0px';
						iframe.src = cSrc;
						document.body.appendChild(iframe);
					}
				}, false);
				if(contentURL.search('&id=tudou') !== -1 || 0) {  // add broken parsed urls here, blame API
					contentbox.style.backgroundColor = 'grey';
					contentbox.innerHTML += "<br />可能失效";
				}

				/* remove same links */
				temp = document.getElementsByClassName('lv-content');
				if(!temp.length) {lvDiv.appendChild(contentbox);}
				for(i = 0; i < temp.length; i++) {
					if(temp[i].getAttribute('data-lv') !== contentbox.getAttribute('data-lv')) {
						lvDiv.appendChild(contentbox);
					}
				}
			}
		}
	}

	var idPlayer, temp, tempNum, playerVID, playerDLURL, playerData, lvDiv ;
	/* idPlayer = document.getElementById("ACFlashPlayer-re"); This not work, cuz page has two same id name */
	idPlayer = document.getElementsByTagName('iframe')[0];
	temp = idPlayer.getAttribute('src');
	temp = temp.substr(temp.search('vid'));  // strip & temp store
	tempNum = temp.search(';');
	playerVID = temp.substring(4, tempNum);
	playerDLURL = "https://ssl.acfun.tv//aliyun/index.php?&type=mobileclient&vid=" + playerVID;  /* key core of localav */
	if(lvDebug) {window.alert(playerDLURL);}

	/* init lv-box */
	lvDiv = document.createElement('div');
	lvDiv.style.border = '2px solid';
	lvDiv.style.right = lvRight;
	lvDiv.style.bottom = lvBt;
	lvDiv.style.lineHeight = '1em';
	lvDiv.style.zIndex = '9999';
	lvDiv.style.position = 'fixed';
	lvDiv.style.backgroundColor = '#ffe';
	lvDiv.id = 'lv-box';
	window.document.body.appendChild(lvDiv);

	GM_xmlhttpRequest({
		method: "GET",
		url: playerDLURL,
		headers: {
			"Accept": "application/json"
		},
		onload: function(response) {
			playerData = JSON.parse(response.responseText);
     			dynamicparts(playerData.result); 
		}
	});

/*
(function () {     // make grabbing BUG 
  document.onmousedown = coordinates;
  document.onmouseup = mouseup;
  function coordinates(e) {
    if (e == null) { e = window.event;}
    var sender = (typeof( window.event ) != "undefined" ) ? e.srcElement : e.target;
    if (sender.id === "lv-topbar") {      
      mouseover = true;
      pleft = parseInt(lvCloseDiv.style.left);
      ptop = parseInt(lvCloseDiv.style.top);
      xcoor = e.clientX;
      ycoor = e.clientY;
      document.onmousemove = moveBox;
      return false;
    } 
    return false;
  }
	
  function moveBox(e) {
    if (e == null) { e = window.event; }
    lvCloseDiv.style.left = pleft+e.clientX-xcoor+"px";
    lvCloseDiv.style.top = ptop+e.clientY-ycoor+"px";
    return false;
  }
  function mouseup(e) {
    document.onmousemove = null;
  }
})();
 */

	var lvCloseDiv, lvClose, lvFB;
	lvCloseDiv = document.createElement('div');
	lvCloseDiv.id = 'lv-topbar';
	lvCloseDiv.style.textAlign = 'right';
	lvCloseDiv.style.background = '#810400';
	lvClose = document.createElement('span');
	lvClose.innerHTML = '[CLOSE]';
	lvClose.style.cursor = 'pointer';
	lvClose.style.padding = '0 5px';
	lvClose.style.textDecoration = 'underline';
	lvClose.onclick = function() {
  		lvDiv.style.display = 'none';
	};
	lvCloseDiv.appendChild(lvClose);
	lvDiv.appendChild(lvCloseDiv);
	lvFB = document.createElement('div');
	lvFB.innerHTML = 'feedback';
	lvFB.style.cursor = 'pointer';
	lvFB.style.padding = '0 5px';
	lvFB.style.textDecoration = 'underline';
	lvFB.onclick = function() {
		window.open('https://github.com/doomred/localav/issues', 'FEED_ME_BUG');
	};
	lvDiv.appendChild(lvFB);
}
        
window.setTimeout(lvMain, 1500); /* src attribute of iframe is dynamic generated,  needs time */
