document.addEventListener("deviceready", onDeviceReady, false);
 
function id(element) {
	return document.getElementById(element);
}

var pictureSource;
var destinationType;

function onDeviceReady() {
	id("captureVideo").addEventListener("click", captureVideo);
	id("captureAudio").addEventListener("click", capureAudio);
	id("captureImage").addEventListener("click", captureImage);
}

function captureVideo() {
	navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:2});
}

function captureSuccess(capturedFiles) {
	var i,
	media = document.getElementById("media");
	media.innerHTML = "";
	for (i=0;i < capturedFiles.length;i+=1) {
		media.innerHTML+='<p>Capture taken! Its path is: ' + capturedFiles[i].fullPath + '</p>'
	}
}

function captureError(error) {
	var media = document.getElementById("media");
	media.innerHTML = "";
	media.innerHTML = "Error occured! Code:" + error.code;
}

function capureAudio() {
	navigator.device.capture.captureAudio(captureSuccess, captureError, {limit: 2});
}

function captureImage() {
	navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 2})
}