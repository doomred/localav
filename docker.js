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
var data = {"code":200,"message":"request success.","success":true,"result":{"C20":{"quality":"\u9ad8\u6e05","totalseconds":252,"totalbytes":0,"files":[{"type":"flv","seconds":252,"bytes":100000000,"url":"http:\/\/edge.v.iask.com.lxdns.com\/19951758.flv?KID=sina,viask&Expires=1408118400&ssig=MFYELPrmCG","no":0}]},"C10":{"quality":"\u9ad8\u6e05","totalseconds":252,"totalbytes":0,"files":[{"type":"flv","seconds":252,"bytes":100000000,"url":"http:\/\/edge.v.iask.com.lxdns.com\/19951758.flv?KID=sina,viask&Expires=1408118400&ssig=MFYELPrmCG","no":0}]}}}





var body = document.body;
var floatbox = document.createElement('div');
floatbox.style.top = '64px';
floatbox.style.left = '64px';
// floatbox.style.width = '128px';
floatbox.style.position = 'absolute';
floatbox.style.backgroundColor = 'red';
floatbox.id = 'box';




function loop(obj) {
    for( var key in obj ) {
        if( obj.hasOwnProperty(key) ) {

var contentbox = document.createElement('div');
    
contentbox.class = 'contentbox';
contentbox.style.padding = '1em 2em';
            
  /* problem next line */
var avSize = parseInt(obj[key].files[0].bytes / 1024 / 1024);
//contentbox.style.float = 'left';
contentbox.appendChild(document.createTextNode(obj[key].quality + '[' + obj[key].files[0].type + ']'));
contentbox.innerHTML += "<br />";
contentbox.appendChild(document.createTextNode(avSize + "MB"));
contentbox.onclick = function () {                       /* function to download withing with pure js, midified via S.O. */
    var url = obj[key].files[0].url;
    var ranNum3 = parseInt(Math.random() * 1000);
    var hiddenIFrameID = 'hiddenDownloader' + ranNum3;   /* random ID for dump browser */

        iframe = document.getElementById(hiddenIFrameID);
    if (iframe === null) {
        iframe = document.createElement('iframe');
        iframe.id = hiddenIFrameID;
        iframe.style.display = 'none';
        iframe.style.position = 'absoulte';
        iframe.style.top = '0px';
        iframe.style.left = '0px';
        document.body.appendChild(iframe);
    }
    iframe.src = url;
};
            
floatbox.appendChild(contentbox);

        }
    }

};

loop(data.result)




var close = document.createElement('div');
close.innerHTML += 'CLOSE!';
close.onclick = function() {
  floatbox.style.display = 'none';
}
floatbox.appendChild(close);


/* clearboth block
var clearboth = document.createElement('div');
clearboth.style.clear = 'both';
floatbox.appendChild(clearboth);
 */

body.appendChild(floatbox);




