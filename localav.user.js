// ==UserScript==
// @name localav
// @namespace https://github.com/doomred
// @description Lightweight avfun video dumper
// @version 0.2
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

var lvDebug, lvLeft, lvBt, lvMain;
lvDebug = 0;  // debug usage
lvLeft = GM_getValue('gm_lv_left', '1em');
lvBt = GM_getValue('gm_lv_bottom', '1em');

function forceupdate() {
	'use strict';
	GM_openInTab('https://raw.github.com/doomred/localav/master/localav.user.js');
	return 0;
}
GM_registerMenuCommand('localav| Force Update!', forceupdate, 'a');


function lvMain() {
	'use strict';
	function dynamicparts(obj) {
		var key, lvContBox, lvContSize, temp, i, lvContURL, lvDiv, lvContQuality,lvContType;
		lvDiv = window.top.document.getElementById('lv-box');
		for(key in obj) {
			if(obj.hasOwnProperty(key)) {
				lvContBox = document.createElement('div');
				lvContBox.classList.add('lv-content');
				lvContBox.style.margin = '1em 1.5em 0 1.5em';
				lvContBox.style.cssFloat = 'left';
				lvContBox.style.cursor = 'pointer';
				lvContQuality = obj[key].quality;
				lvContType = obj[key].files[0].type;
				temp = 0;
				lvContURL = '';
				for(i = 0; i < obj[key].files.length; i++) {
					lvContURL += obj[key].files[i].url;
					lvContURL += '^';			// split urls
					temp += obj[key].files[i].bytes;	// add up bytes
				}
				lvContBox.setAttribute('data-lv', lvContURL);
if(lvDebug) {window.alert(lvContURL);}
				temp = temp / 1024 / 1024 * 100;  // leave two float point
				lvContSize = parseInt(temp, 10) / 100 + 'MB';

				if(lvContURL.search('.hlv?') !== -1) {  // sina hlv fix
					lvContType = 'hlv';
				}
				if(!parseInt(lvContSize, 10)) {lvContSize = '大小仍是个迷';}	// make a joke here

				lvContBox.innerHTML = lvContQuality + ' [' + lvContType + ']<br />' + lvContSize;

				lvContBox.addEventListener('click', function (e) {  // to download stuff within pure js, midified via stackoverflow 	
					var iframe, eventSender, cSrc, arraySrc, i;
					if (!e && window.event) {e = window.event;}
					eventSender = (window.event) ? e.srcElement : e.target;
					cSrc = eventSender.getAttribute('data-lv');
					
					arraySrc = cSrc.split('^');
					if(cSrc.search('.hlv?') !== -1) {  // sina hlv fix
						for(i = 0; i < arraySrc.length; i++) {
							GM_openInTab(arraySrc[i]);
						}
					} else {
						for(i = 0; i < arraySrc.length; i++) {
							iframe = document.createElement('iframe');
							iframe.style.display = 'none';
							iframe.style.position = 'absoulte';
							iframe.style.top = '0px';
							iframe.style.left = '0px';
							iframe.src = arraySrc[i];
							document.body.appendChild(iframe);
						}
					}
				}, false);

				if(lvContURL.search('&id=tudou') !== -1 || 0) {  // add broken parsed urls here, blame API
					lvContBox.style.backgroundColor = 'grey';
					lvContBox.innerHTML += "<br />可能失效";
				}


				lvDiv.appendChild(lvContBox);

				/* fix sina duplicate generated API*/
				if(lvContURL.search('v.iask.com') !== -1) {
					break;
				}
			}
		}
	}

	var idPlayer, temp, tempNum, playerVID, playerDLURL, playerData, lvDiv ;
	// idPlayer = document.getElementById("ACFlashPlayer-re"); This not work, cuz page has two same id name
	idPlayer = document.getElementsByTagName('iframe')[0];
	temp = idPlayer.getAttribute('src');
	temp = temp.substr(temp.search('vid'));  // strip & temp store
	tempNum = temp.search(';');
	playerVID = temp.substring(4, tempNum);
	playerDLURL = "https://ssl.acfun.tv//aliyun/index.php?&type=mobileclient&vid=" + playerVID;
				// key core of localav, another API: jiexi.avfun.info/index.php?vid=xxx
	if(lvDebug) {window.alert(playerDLURL);}

	/* init lv-box */
	lvDiv = document.createElement('div');
	lvDiv.style.border = '2px solid';
	lvDiv.style.left = lvLeft;
	lvDiv.style.bottom = lvBt;
	lvDiv.style.lineHeight = '1em';
	lvDiv.style.zIndex = '9999';
	lvDiv.style.position = 'fixed';
	lvDiv.style.backgroundColor = '#ffe';
	lvDiv.id = 'lv-box';
	lvDiv.setAttribute('draggable', 'true');
	window.document.body.appendChild(lvDiv);

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
	
	/* HTML5 drag & drop element
	 * Modified via:http://jsfiddle.net/robertc/kKuqH/
	 * More info: https://stackoverflow.com/questions/6230834/html5-drag-and-drop-anywhere-on-the-screen */
	function drag_start(event) {
    	var style = window.getComputedStyle(event.target, null);
    	event.dataTransfer.setData("text/plain",
    	(parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("bottom"),10) + event.clientY));
	} 
	function drag_over(event) { 
    	event.preventDefault(); 
    	return false;
	} 
	function drop(event) { 
	    var offset = event.dataTransfer.getData("text/plain").split(',');
    	var dg = document.getElementById('lv-box');
    	dg.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
    	dg.style.bottom = (-event.clientY + parseInt(offset[1],10)) + 'px';
		GM_setValue('gm_lv_left', dg.style.left);
		GM_setValue('gm_lv_bt', dg.style.bottom);
		
    	event.preventDefault();
    	return false;
	} 
	document.getElementById('lv-box').addEventListener('dragstart',drag_start,false); 
	document.body.addEventListener('dragover',drag_over,false); 
	document.body.addEventListener('drop',drop,false); 

	
}
        
function checkload() {
	var temp = document.getElementsByTagName('iframe')[0].getAttribute('src');
	if(temp !== null) {
		lvMain();
	} else {
		window.setTimeout(checkload, 1000);
	}
}
window.setTimeout(checkload, 1500); /* src attribute of iframe is dynamic generated,  needs time */
