/* box Init */
var body = document.body;
var floatbox = document.createElement('div');
floatbox.style.top = '64px';
floatbox.style.left = '64px';
floatbox.style.width = '128px';
floatbox.style.position = 'absolute';
floatbox.style.backgroundColor = 'red';
floatbox.id = 'box';
/* append fixed height to become visible */
floatbox.style.height = '128px';
body.appendChild(floatbox);

/* finished Init */


/* Finish rending, start enable grabbing */
function grabbing() {     /* need something instead of window.onload */
  var grabber = document.getElementById('box');

  document.onmousedown = coordinates;
  document.onmouseup = mouseup;

  function coordinates(e) {

    if (e == null) { e = window.event;}
    
    // e.srcElement holds the target element in IE, whereas e.target holds the target element in Firefox
    // Both properties return the HTML element the event took place on.

    var sender = (typeof( window.event ) != "undefined" ) ? e.srcElement : e.target;
          // alert(sender.id);

    if (sender.id=="box") {
      
      mouseover = true;
      pleft = parseInt(grabber.style.left);
      ptop = parseInt(grabber.style.top);
      xcoor = e.clientX;
      ycoor = e.clientY;
      document.onmousemove = moveBox;
      return false;
    } 
    return false;
  }

  function moveBox(e) {
    if (e == null) { e = window.event; }
    grabber.style.left = pleft+e.clientX-xcoor+"px";
    grabber.style.top = ptop+e.clientY-ycoor+"px";
    return false;
  }

  function mouseup(e) {
    document.onmousemove = null;
  }
}


  grabbing();
