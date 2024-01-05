
                jQuery.noConflict();
                (function($) {
                    // Your jQuery code here
                    $.get('../pages/footer.html', function(data) {
                        $('#foot-section').html(data);
                    });
                })(jQuery);
     