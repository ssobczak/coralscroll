$(function(){
    // cleanup after Wordpress
    $('.paralax').removeAttr('width');
    $('.paralax').removeAttr('height');

    // repack images into container divs
    $('.paralax').parent().replaceWith(function() {
        var container = $("<div class='paralax-img-cell'></div>");
        container.append($(this).children());
        return $("<div class='paralax-div paralax-container'></div>").append(container);
    });

    // activate first image
    $('.paralax-container').first().addClass('active');


    // repack non-image content into divs
    $('.paralax-container').each(function () {
        var text_div =  $("<div class='paralax-cell'></div>");

        $(this).prevAll(":not(.paralax-div)").each(function () {
            text_div.prepend($(this));
        });

        $("<div class='paralax-div paralax-text'></div>").append(text_div).insertBefore($(this));
    });

    // repack bottom non-image content into div:last
    var text_div =  $("<div class='paralax-cell'></div>");
    text_div.append($('.paralax-container').last().nextAll());
    $("<div class='paralax-div paralax-text paralax-last'></div>").append(text_div).insertAfter($('.paralax-container').last());

    // add hook on scrolling
    var texts = $('.paralax-text');
    var oldY = 0;

    $(document).scroll(function(){
        var y = window.scrollY;

        texts.each(function(){
            var text = $(this);

            if(y >= text.offset().top) {
                text.next().addClass('active');
            } else {
                text.next().removeClass('active');
            }
        });
    });
});