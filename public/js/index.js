/**
 * Created by zhoutengteng on 16/6/25.
 */

$(document).ready(function() {
    $('#carousel-example-generic')
        .carousel({
            interval: 2000 // in milliseconds
        })
        .hover(
            function () {
                $(this).carousel('pause')
            },
            function() {
                $(this).carousel(
                    {
                        interval: 2000 // in milliseconds
                    }
                )
            }
        )
    $('.left').click(
        function() {
            $('#carousel-example-generic').carousel('next')
        }
    )
    $('.right').click(
        function() {
            $('#carousel-example-generic').carousel('prev')
        }
    )

});