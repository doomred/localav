/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */

var player = document.getElementById("ACFlashPlayer-re");
var url = player.src
var tempNum = url.search('vid');
var url = url.substr(tempNum);    /* strip & temp store */
var tempNum = url.search(';');
var vid = url.substring(4,tempNum);   /* get the vid num */
var dlUrl = "https://ssl.acfun.tv//aliyun/index.php?&type=mobileclient&vid=" + vid;
// alert(dlUrl);

/* some codes to gather json */
/* and it's storged into data */
/* it's now faked */
var data = {"code":200,"message":"request success.","success":true,"result":{"C20":{"quality":"\u9ad8\u6e05","totalseconds":252,"totalbytes":0,"files":[{"type":"flv","seconds":252,"bytes":0,"url":"http:\/\/edge.v.iask.com.lxdns.com\/19951758.flv?KID=sina,viask&Expires=1408118400&ssig=MFYELPrmCG","no":0}]},"C10":{"quality":"\u9ad8\u6e05","totalseconds":252,"totalbytes":0,"files":[{"type":"flv","seconds":252,"bytes":0,"url":"http:\/\/edge.v.iask.com.lxdns.com\/19951758.flv?KID=sina,viask&Expires=1408118400&ssig=MFYELPrmCG","no":0}]}}}




