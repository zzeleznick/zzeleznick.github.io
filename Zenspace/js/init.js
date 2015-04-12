(function($) {
    $(function() {

        $('.button-collapse').sideNav();

    }); // end of document ready
})(jQuery); // end of jQuery name space

function clearContent(self) {
    $(self).css('display', 'none');
}

function genCard(self) {
    $('#value-child').fadeOut();
    x = '<div class="col s12 m6"><div class="card"> <div class="card-image">'
    x += '<img src="images/med3.jpg"><span class="card-title">Peaceful Meditation</span></div>'
    x += '<div class="card-content"> <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p> </div>'
    x += '<div class="card-action"><a href="#">This is a link</a> <a href="#">This is a link</a> </div> </div></div>'
    $(self).append(x);
    $('#index-banner').slideUp('slow');
}

function hideCards(self) {
        console.log(self);
        console.log($(self).parent());
        console.log($(self).parent().parent()); //card
        y = $(self).parent().parent('.card').attr('id').substring(5);
        for (i = 1; i <= $('.card').length; i++) {
            $('#card-' + i).toggleClass('hidden');
            console.log(i);
        }
        $('#card-' + y).removeClass('hidden');
        $('#card-' + y).parent().toggleClass('m12');
    }
    /*meds = [{
        "medicine": 'Fortecortin',
        "pseudo": '(deksametazon)',
        "quantity_amount": 2,
        "quantity_unit": 'mg, Daily'
    }];
    for (var i = 0; i < meds.length; i++) {
        $('ul.medications').append('<li> <content-editable>' + '<code>' + meds[i].medicine + '</code> <small>' + meds[i].pseudo + ' </small> <br> - ' + meds[i].quantity_amount + meds[i].quantity_unit + '</content-editable></li>');
    }*/

