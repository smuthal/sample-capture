document.addEventListener("deviceready", onDeviceReady, false);
 
function id(element) {
	return document.getElementById(element);
}

function onDeviceReady() {
	captureApp = new captureApp();
	captureApp.run();
}

function captureApp() {
}

captureApp.prototype = {
	pictureSource:null,
    
	destinationType:null,
    
	run:function() {
		var that = this;
		id("captureVideo").addEventListener("click", function() {
			that._captureVideo.apply(that, arguments);
		});
		id("captureAudio").addEventListener("click", function() {
			that._capureAudio.apply(that, arguments);
		});
		id("captureImage").addEventListener("click", function() {
			that._captureImage.apply(that, arguments);
		});
		id("selectImage").addEventListener("click", function() {
			that._selectImage.apply(that, arguments);
		});
	},
    
	_captureVideo:function() {
		var that = this;
		navigator.device.capture.captureVideo(function() {
			that._captureSuccess.apply(that, arguments);
		}, function() { 
			captureApp._captureError.apply(that, arguments);
		}, {limit:1});
	},
    
	_capureAudio:function() {
		var that = this;
		navigator.device.capture.captureAudio(function() {
			that._captureSuccess.apply(that, arguments);
		}, function() { 
			captureApp._captureError.apply(that, arguments);
		}, {limit:1});
	},
    
	_captureImage:function() {
		var that = this;
		/*navigator.device.capture.captureImage(function() {
		that._captureSuccess.apply(that, arguments);
		}, function() { 
		captureApp._captureError.apply(that, arguments);
		}, {limit:1});*/
		that._capture(Camera.PictureSourceType.CAMERA);
	},
    
	_selectImage:function() {
		var that = this;
		/*navigator.device.capture.captureImage(function() {
		that._captureSuccess.apply(that, arguments);
		}, function() { 
		captureApp._captureError.apply(that, arguments);
		}, {limit:1});*/
		console.log("Select Image");
		that._capture(Camera.PictureSourceType.SAVEDPHOTOALBUM);
	},
    
	_capture: function(sourceType) {
		var that = this;
		console.log("Capture Fn", sourceType);
		navigator.camera.getPicture(function() {
			that._captureSuccess.apply(that, arguments);
		}, function() { 
			captureApp._captureError.apply(that, arguments);
		}, {
			destinationType: Camera.DestinationType.FILE_URI,
			encodingType:Camera.EncodingType.JPEG,
			mediaType:Camera.MediaType.PICTURE,
			allowEdit : true,
			quality : 75, 
			targetWidth: 200,
			targetHeight: 200,
			sourceType: sourceType,
			correctOrientation: true,
			saveToPhotoAlbum: false,
		});
	},
	_captureSuccess:function(capturedFiles) {
		console.log("On_captureSuccess", capturedFiles);
		/*var i,
		media = document.getElementById("media");
		media.innerHTML = "";
		for (i=0;i < capturedFiles.length;i+=1) {
		media.innerHTML+='<p>Capture taken! Its path is: ' + capturedFiles[i].fullPath + '</p>'
		}*/
	},
    
	_captureError:function(error) {
		console.log("On_captureError", "An error occured! Code:" + error.code);
	/*	var media = document.getElementById("media");
		media.innerHTML = "An error occured! Code:" + error.code;*/
	},
}