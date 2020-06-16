$('#countdown').countdown('2020/05/16', function(event) {
    $('#days').html(event.strftime('%d'));
    $('#hours').html(event.strftime('%H'));
    $('#minutes').html(event.strftime('%M'));
    $('#seconds').html(event.strftime('%S'));
});