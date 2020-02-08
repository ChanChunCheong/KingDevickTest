
        let constraintObj = { 
            audio: false, 
            video: { 
                facingMode: "user", 
                width: { min: 640, ideal: 1280, max: 1920 },
                height: { min: 480, ideal: 720, max: 1080 } 
            } 
        }; 
        // width: 1280, height: 720  -- preference only
        // facingMode: {exact: "user"}
        // facingMode: "environment"
        
        //handle older browsers that might implement getUserMedia in some way
        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
            navigator.mediaDevices.getUserMedia = function(constraintObj) {
                let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                if (!getUserMedia) {
                    return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                }
                return new Promise(function(resolve, reject) {
                    getUserMedia.call(navigator, constraintObj, resolve, reject);
                });
            }
        }else{
            navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                devices.forEach(device=>{
                    console.log(device.kind.toUpperCase(), device.label);
                    //, device.deviceId
                })
            })
            .catch(err=>{
                console.log(err.name, err.message);
            })
        }

        navigator.mediaDevices.getUserMedia(constraintObj)
        .then(function(mediaStreamObj) {
            //connect the media stream to the first video element
            let video = document.querySelector('video');
            if ("srcObject" in video) {
                video.srcObject = mediaStreamObj;
            } else {
                //old version
                video.src = window.URL.createObjectURL(mediaStreamObj);
            }
            
            video.onloadedmetadata = function(ev) {
                //show in the video element what is being captured by the webcam
                video.play();
            };
            
            //add listeners for saving video/audio
            let start = document.getElementById('btnStart');
            let stop = document.getElementById('btnStop');
            let vidSave = document.getElementById('vid2');
            let mediaRecorder = new MediaRecorder(mediaStreamObj);
            let chunks = [];
            
            start.addEventListener('click', (ev)=>{
                mediaRecorder.start();
                console.log(mediaRecorder.state);
            })
            stop.addEventListener('click', (ev)=>{
                mediaRecorder.stop();
                console.log(mediaRecorder.state);
            });
            mediaRecorder.ondataavailable = function(ev) {
                chunks.push(ev.data);
            }
            mediaRecorder.onstop = (ev)=>{
                let blob = new Blob(chunks, { 'type' : 'video/mp4;' });
                chunks = [];
                let videoURL = window.URL.createObjectURL(blob);
                vidSave.src = videoURL;
                downloadBlob(blob);
            }

            function downloadBlob(blob, filename) {
                // Create an object URL for the blob object
                const url = URL.createObjectURL(blob);
                
                // Create a new anchor element
                const a = document.createElement('a');
                
                // Set the href and download attributes for the anchor element
                // You can optionally set other attributes like `title`, etc
                // Especially, if the anchor element will be attached to the DOM
                a.href = url;
                a.download = filename || 'download.mp4';
                
                // Click handler that releases the object URL after the element has been clicked
                // This is required for one-off downloads of the blob content
                const clickHandler = () => {
                  setTimeout(() => {
                    URL.revokeObjectURL(url);
                    this.removeEventListener('click', clickHandler);
                  }, 150);
                };
                
                // Add the click event listener on the anchor element
                // Comment out this line if you don't want a one-off download of the blob content
                a.addEventListener('click', clickHandler, false);
                
                // Programmatically trigger a click on the anchor element
                // Useful if you want the download to happen automatically
                // Without attaching the anchor element to the DOM
                // Comment out this line if you don't want an automatic download of the blob content
                a.click();
                
                // Return the anchor element
                // Useful if you want a reference to the element
                // in order to attach it to the DOM or use it in some other way
                return a;
              }

        })
        .catch(function(err) { 
            console.log(err.name, err.message); 
        });
        
        /*********************************
        getUserMedia returns a Promise
        resolve - returns a MediaStream Object
        reject returns one of the following errors
        AbortError - generic unknown cause
        NotAllowedError (SecurityError) - user rejected permissions
        NotFoundError - missing media track
        NotReadableError - user permissions given but hardware/OS error
        OverconstrainedError - constraint video settings preventing
        TypeError - audio: false, video: false
        *********************************/