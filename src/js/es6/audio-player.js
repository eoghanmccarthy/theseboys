
var myAudio = document.getElementById("almost-home"); {

    function aud_play_pause() {

        // On click play audio when paused, and replace play icon with pause icon
        if (myAudio.paused) {
            $("#icon-state").removeClass("fa fa-angle-right");
            $("#icon-state").addClass("fa fa-pause");
            myAudio.play();
        }

        // On click pause audio when playing, and replace pause icon with play icon
        else {
            $("#icon-state").removeClass("fa fa-pause");
            $("#icon-state").addClass("fa fa-angle-right");
            myAudio.pause();
        }
    }

    function aud_stop() {

            // On click stop audio, and replace pause icon with play icon
            $("#icon-state").removeClass("fa fa-pause");
            $("#icon-state").addClass("fa fa-angle-right");
            myAudio.pause();
            myAudio.currentTime = 0;
    }
}
