var spinner = new Spinner({
    color: '#ddd'
});
var firebaseRef = 'https://hotnot.firebaseio.com/uploads/';

function handleFileSelect(evt) {
    f = evt.target.files[0];
    var reader = new FileReader();
    reader.onload = (function(theFile) {
        return function(e) {
            var filePayload = e.target.result;
            console.log(filePayload);
            // Generate a location that can't be guessed using the file's contents and a random number
            var hash = CryptoJS.SHA256(Math.random() + CryptoJS.SHA256(filePayload));
            //var hash = Math.random()* 137 + Math.random()* 19 + Math.random()* 7;

            //var f = new Firebase(firebaseRef + 'pano/' + hash + '/filePayload');
            var fref = new Firebase(firebaseRef);
             fref = fref.child('new');


            spinner.spin(document.getElementById('spin'));
            // Set the file payload to Firebase and register an onComplete handler to stop the spinner and show the preview
            fref.push({name : f.name, content : filePayload});
            spinner.stop();
            document.getElementById("pano").src = e.target.result;
            $('#file-upload').hide();
                // Update the location bar so the URL can be shared with others
            window.location.hash = hash;

           /* fref.set(filePayload, function() {
                spinner.stop();
                document.getElementById("pano").src = e.target.result;
                $('#file-upload').hide();
                // Update the location bar so the URL can be shared with others
                window.location.hash = hash;
            }); */

        };
    })(f);
    reader.readAsDataURL(f);
}

$(function() {
    $('#spin').append(spinner);
    var count = 0;
    var idx = window.location.href.indexOf('#');
    var hash = (idx > 0) ? window.location.href.slice(idx + 1) : '';
    if (hash === '') {
        // No hash found, so render the file upload button.
        $('#file-upload').show();
        document.getElementById("file-upload").addEventListener('change', handleFileSelect, false);

           imgListRef = new Firebase(firebaseRef + "new");
                imgListRef.once('value', function(all) {
                    all.forEach(function(elem) {
                        // Will be called with a messageSnapshot for each message under message_list.
                        //var userId = elem.child('user_id').val();
                        //var text = elem.child('text').val();
                        // Do something with message.
                        alert(count);
                        $('#body').append(++count);
                        $( "#body" ).append( '<img class="pano" id ="pano"/>' );
                        document.getElementById("pano").id = count;
                        document.getElementById(count).src = elem.child('content').val();


                    });
                });


    } else {
        // A hash was passed in, so let's retrieve and render it.
        spinner.spin(document.getElementById('spin'));
        var f = new Firebase(firebaseRef);
        f.once('value', function(snap) {
            var payload = snap.val();
            if (payload != null) {
              document.getElementById("pano").src = payload;
            } else {
                $('#body').append("Not fouddnd");
            }
            spinner.stop();
        });
    }
});
