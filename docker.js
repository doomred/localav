/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */

/* some codes to gather json */
/* and it's storged into data */
/* it's now faked */
var data = {"code":200,"message":"request success.","success":true,"result":{"C20":{"quality":"\u9ad8\u6e05","totalseconds":252,"totalbytes":0,"files":[{"type":"flv","seconds":252,"bytes":0,"url":"http:\/\/edge.v.iask.com.lxdns.com\/19951758.flv?KID=sina,viask&Expires=1408118400&ssig=MFYELPrmCG","no":0}]},"C10":{"quality":"\u9ad8\u6e05","totalseconds":252,"totalbytes":0,"files":[{"type":"flv","seconds":252,"bytes":0,"url":"http:\/\/edge.v.iask.com.lxdns.com\/19951758.flv?KID=sina,viask&Expires=1408118400&ssig=MFYELPrmCG","no":0}]}}}


var body = document.body;
var floatbox = document.createElement('div');
floatbox.style.top = '64px';
floatbox.style.left = '64px';
floatbox.style.position = 'absolute';
floatbox.style.backgroundColor = 'red';
floatbox.style.
floatbox.id = 'box';

var contentbox = document.createElement('div');
var breakrow = document.createElement('br');

contentbox.class = 'contentbox';
contentbox.style.margin = '1em 2em'
contentbox.appendChild(document.createTextNode(data.result.C10.quality + '[' + data.result.C10.files.type + ']'));
contentbox.appendChild(breakrow);
contentbox.appendChild(document.createTextNode(data.result.C10.files.bytes / 1024 / 1024 + "MB"));
floatbox.appendChild(contentbox);

// if exist C20
var contentbox2 = document.createElement('div');

contentbox.class = 'contentbox';
contentbox.style.margin = '1em 2em'
contentbox2.appendChild(document.createTextNode(data.result.C20.quality + '[' + data.result.C20.files.type + ']'));
contentbox2.appendChild(breakrow);
contentbox2.appendChild(document.createTextNode(data.result.C20.files.bytes / 1024 / 1024 + "MB"));
floatbox.appendChild(contentbox2);









body.appendChild(floatbox);


