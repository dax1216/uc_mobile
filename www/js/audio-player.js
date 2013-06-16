// The Audio player
var my_media = null;
var mediaTimer = null;
// duration of media (song)
var dur = -1;
// need to know when paused or not
var is_paused = true;
//Set audio position on page
function setAudioPosition(position) {
    $("#audio_position").html(position + " sec");
}

//onSuccess Callback
function onSuccess() {
    setAudioPosition(dur);
    clearInterval(mediaTimer);
    mediaTimer = null;
    //my_media = null;
    is_paused = false;
    dur = -1;
    
    $('#audio-player').show();
}

//onError Callback
function onError(error) {
    /* alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    clearInterval(mediaTimer);
    mediaTimer = null;
    my_media = null;
    is_paused = false;
    setAudioPosition("0"); */
    alert('Error in streaming audio.');    
}

function playAudio(src) {    
    if (is_paused) {   
    	is_paused = false;        	
    	my_media.play();
    }

    // Update my_media position every second
    if (mediaTimer === null) {
        mediaTimer = setInterval(function() {
            my_media.getCurrentPosition(
                    // success callback
                    function(position) {
                        if (position > -1) {
                            setAudioPosition(Math.round(position));
                            // getDuration() can take a few seconds so keep trying
                            // this could be done a better way, no callback for it
                            if (dur <= 0) {
                                dur = my_media.getDuration();
                                if (dur > 0) {
                                    dur = Math.round(dur);
                                    $("#media_dur").html(dur);
                                }
                            }
                        }
                    },
                    // error callback
                    function(e) {
                        alert("Error getting pos=" + e);
                        setAudioPosition("Error: " + e);
                    }
            );
        }, 1000);
    }
}

//Pause audio
function pauseAudio() {
    if (is_paused) return;
    if (my_media) {
        is_paused = true;
        my_media.pause();
    }
}

//Stop audio
function stopAudio() {
    if (my_media) {
        // A successful .stop() will call .release()
        my_media.stop();
        my_media = null;
    }
    if (mediaTimer) {
        clearInterval(mediaTimer);
        mediaTimer = null;
    }
    is_paused = false;
    dur = 0;
}