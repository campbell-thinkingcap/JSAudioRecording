$(document).ready(function () {
    $('#start').on('click', function () {
        AudioPlayer.start();
    })
    $('#stop').on('click', function () {
        AudioPlayer.stop();
    })
    $('#play').on('click', function () {
        AudioPlayer.play();
    });
    $('#save').on('click', function () {
        AudioPlayer.save();
    })
})

let AudioPlayer = {
    isRecording: false,
    mediaRecorder: null,
    audioChunks: [],
    audioBlob: null,
    audioUrl : null,
    start: function () {
        this.audioBlob = null;
        this.audioChunks = [];
        this.audioUrl = null;
        this.isRecording = true;
        this.mediaRecorder = null;
        $('#record').attr('disabled', true);
        $('#play').attr('disabled', true);
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                AudioPlayer.mediaRecorder = new MediaRecorder(stream);
                AudioPlayer.mediaRecorder.start();            

                AudioPlayer.mediaRecorder.addEventListener("dataavailable", event => {
                    AudioPlayer.audioChunks.push(event.data);
                });

                AudioPlayer.mediaRecorder.addEventListener("stop", () => {
                    AudioPlayer.audioBlob = new Blob(AudioPlayer.audioChunks);
                    AudioPlayer.audioUrl = URL.createObjectURL(AudioPlayer.audioBlob);
                });
            });
    },
    stop: function(){
        AudioPlayer.mediaRecorder.stop();
        $('#record').removeAttr('disabled');    
        $('#play').removeAttr('disabled');
    },
    play: function () {
       // const a = new Audio(AudioPlayer.audioUrl);
       // a.play();
        $('#player').attr('src', AudioPlayer.audioUrl);

    },
    save: function () {
        //fetch(`saveaudio.ashx`, { method: "POST", body: AudioPlayer.audioBlob })
        //    .then(response => {
        //        if (response.ok) return response;
        //        else throw Error(`Server returned ${response.status}: ${response.statusText}`)
        //    })
        //    .then(response => console.log(response.text()))
        //    .catch(err => {
        //        alert(err);
        //    });
        let file = new File([AudioPlayer.audioBlob], 'voice.mp3', { type: 'audio/mp3', lastModified: new Date().getTime() });
        let container = new DataTransfer();
        container.items.add(file);
        let fileinput = document.getElementById('fileinput');
        fileinput.files = container.files;
        let input = $('#fileinput');
        let files = input.prop('files');
        let fu = input.fileupload();
        fu.fileupload('send', {
            url: 'saveaudio.ashx',
            files: files,
            formData: {
                op: 'EditProfile'                
            }
        }).success(function (d) {
            console.log(d);
        }
        );

    }

}