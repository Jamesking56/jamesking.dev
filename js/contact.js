$(document).ready(function () {
    $('#contact-form').on('submit', function () {
        if ($('#contact-form').hasClass('clicked')) {
            return false;
        }

        $('#contact-form').addClass('clicked');

        var buttonWidth = $('#contact-form button').width();

        var buttonCopy = $('#contact-form button').html(),
            errorMessage = $('#contact-form button').data('error-message'),
            sendingMessage = $('#contact-form button').data('sending-message'),
            okMessage = $('#contact-form button').data('ok-message'),
            hasError = false;

        $('#contact-form button').width(buttonWidth);
        $('#contact-form .error-message').remove();

        $('.requiredField').each(function () {
            if ($(this).val().trim() === '') {
                var errorText = $(this).data('error-empty');
                $(this)
                    .parents('.field-wrap')
                    .append(
                        '<span class="error-message" style="display:none;">' +
                            errorText +
                            '.</span>'
                    )
                    .find('.error-message')
                    .fadeIn('fast');
                $(this).addClass('inputError');
                hasError = true;
            } else if (
                $(this).is("input[type='email']") ||
                $(this).attr('name') === 'email'
            ) {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,10})?$/;
                if (!emailReg.test($(this).val().trim())) {
                    var invalidEmail = $(this).data('error-invalid');
                    $(this)
                        .parents('.field-wrap')
                        .append(
                            '<span class="error-message" style="display:none;">' +
                                invalidEmail +
                                '.</span>'
                        )
                        .find('.error-message')
                        .fadeIn('fast');
                    $(this).addClass('inputError');
                    hasError = true;
                }
            }
        });

        if (hasError) {
            $('#contact-form button').html(
                '<i class="fa fa-times"></i>' + errorMessage
            );
            setTimeout(function () {
                $('#contact-form button').html(buttonCopy);
                $('#contact-form button').width('auto');
                $('#contact-form').removeClass('clicked');
            }, 2000);
        } else {
            $('#contact-form button').html(
                '<i class="fa fa-spinner fa-spin"></i>' + sendingMessage
            );

            var formInput = $(this).serialize();
            $.post($(this).attr('action'), formInput, function (data) {
                $('#contact-form button').html(
                    '<i class="fa fa-check"></i>' + okMessage
                );
                $('#contact-form')[0].reset();
                setTimeout(function () {
                    $('#contact-form button').html(buttonCopy);
                    $('#contact-form button').width('auto');
                    $('#contact-form').removeClass('clicked');
                }, 2000);
            });
        }

        return false;
    });
});
