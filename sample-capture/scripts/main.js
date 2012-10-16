document.addEventListener("deviceready", onDeviceReady, false);
 
function id(element) {
	return document.getElementById(element);
}

function onDeviceReady() {
    captureApp = new captureApp();
    captureApp.run();
}


function captureApp(){}

captureApp.prototype={
    pictureSource:null,
    
    destinationType:null,
    
    run:function(){
        var that = this;
	    id("captureVideo").addEventListener("click", that._captureVideo);
	    id("captureAudio").addEventListener("click", that._capureAudio);
	    id("captureImage").addEventListener("click", that._captureImage);
    },
    
    _captureVideo:function() {
        console.log("invideo");
    	navigator.device.capture.captureVideo(captureApp._captureSuccess, captureApp._captureError, {limit:1});
    },
    
    _capureAudio:function() {
    	navigator.device.capture.captureAudio(captureApp._captureSuccess, captureApp._captureError, {limit: 1});
    },
    
    _captureImage:function() {
    	navigator.device.capture.captureImage(captureApp._captureSuccess, captureApp._captureError, {limit: 1})
    },
    
    _captureSuccess:function(capturedFiles) {
    	var i,
    	media = document.getElementById("media");
    	media.innerHTML = "";
    	for (i=0;i < capturedFiles.length;i+=1) {
    		media.innerHTML+='<p>Capture taken! Its path is: ' + capturedFiles[i].fullPath + '</p>'
    	}
    },
    
    _captureError:function(error) {
    	var media = document.getElementById("media");
    	media.innerHTML = "";
    	media.innerHTML = "Error occured! Code:" + error.code;
    },
}