function coralscroll($) {
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


            // handle items in the same paragraph as the image
            $('.paralax').parent().each(function () {
                var child_nodes = Array.prototype.slice.call(this.childNodes);

                var paralax_pos = child_nodes.findIndex(function(node) {
                    return $(node).hasClass('paralax');
                });


                $(this).before($('<p></p>').append(child_nodes.slice(0, paralax_pos)));
                $(this).after($('<p></p>').append($(child_nodes).slice(paralax_pos+1)));
            });


            // repack images into container divs
            $('.paralax').parent().replaceWith(function () {
                var res = $("<div class='paralax-div paralax-container'></div>");

                var container = $("<div class='paralax-img-cell'></div>");
                container.append($(this).children());
                return res.append(container);
            });


            // activate first image
            $('.paralax-container').first().addClass('active');

            // repack non-image content into divs
            $('.paralax-container').each(function () {
                if ($(this).prevAll().length > 0) {
                    var text_div = $("<div class='paralax-cell col-md-6 col-md-offset-3'></div>");

                    $(this).prevAll(":not(.paralax-div)").each(function () {
                        text_div.prepend($(this));
                    });

                    $("<div class='paralax-div paralax-text row'></div>").append(text_div).insertBefore($(this));
                }
            });

            // repack bottom non-image content into div:last
            if ($('.paralax-container').last().nextAll().length > 0) {
                var text_div = $("<div class='paralax-cell col-md-6 col-md-offset-3'></div>");
                text_div.append($('.paralax-container').last().nextAll());
                $("<div class='paralax-div paralax-text row paralax-last'></div>").append(text_div).insertAfter($('.paralax-container').last());
            }

            if ($('.paralax-container').first().prevAll().length == 0) {
                $('.paralax-text').first().attr('style', 'margin-top: 60vh;')
            } else {
                $('.paralax-text').first().attr('style', 'min-height: 65vh');
            }

            // add hook on scrolling
            var texts = $('.paralax-text');
            var oldY = 0;

            $(document).scroll(function () {
                var y = window.scrollY;

                texts.each(function () {
                    var text = $(this);

                    if (y > 0) {
                        if (y >= text.offset().top - 60) {
                            text.next().addClass('active');
                        } else {
                            text.next().removeClass('active');
                        }
                    }
                });
            });
        }
    }
}

(function($){
    coralscroll($);

    $(window).on("orientationchange", function(){
        if ($('.paralax').length > 0)
            if (window.orientation == 0) {
                location.reload();
            } else {
                coralscroll($);
            }
    });
})(jQuery);
