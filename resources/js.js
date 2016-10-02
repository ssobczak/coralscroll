function coralscroll() {
    if ($('.paralax').length > 0) {
        // cleanup after Wordpress
        $('.paralax').removeAttr('width');
        $('.paralax').removeAttr('height');

        if (window.orientation == 0) {
            $('img.paralax').addClass('paralax-disabled-img');
        } else {
            // cleanup old layout tags
            $('.main-body').removeClass('col-md-6').removeClass('col-md-offset-3');
            $('.main-body').addClass('container').addClass('paralax-main-body');


            // repack images into container divs
            $('.paralax').parent().replaceWith(function () {
                var container = $("<div class='paralax-img-cell'></div>");
                container.append($(this).children());
                return $("<div class='paralax-div paralax-container'></div>").append(container);
            });

            // activate first image
            $('.paralax-container').first().addClass('active');


            // repack non-image content into divs
            $('.paralax-container').each(function () {
                var text_div = $("<div class='paralax-cell col-md-6 col-md-offset-3'></div>");

                $(this).prevAll(":not(.paralax-div)").each(function () {
                    text_div.prepend($(this));
                });

                $("<div class='paralax-div paralax-text row'></div>").append(text_div).insertBefore($(this));
            });

            if ($('.paralax-container').last().nextAll().length > 0) {
                // repack bottom non-image content into div:last
                var text_div = $("<div class='paralax-cell col-md-6 col-md-offset-3'></div>");
                text_div.append($('.paralax-container').last().nextAll());
                $("<div class='paralax-div paralax-text row paralax-last'></div>").append(text_div).insertAfter($('.paralax-container').last());
            }

            // add hook on scrolling
            var texts = $('.paralax-text');
            var oldY = 0;

            $(document).scroll(function () {
                var y = window.scrollY;

                texts.each(function () {
                    var text = $(this);

                    if (y >= text.offset().top - 50) {
                        text.next().addClass('active');
                    } else {
                        text.next().removeClass('active');
                    }
                });
            });
        }
    }
}

$(function () {
    coralscroll();

    $(window).on("orientationchange", function(){
        if ($('.paralax').length > 0)
            if (window.orientation == 0) {
                location.reload();
            } else {
                coralscroll();
            }
    });
});