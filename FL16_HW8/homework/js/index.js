$(document).ready(function () {

    const hundred = 100;
    $('.calculator-button').click(function () {

        if ($('#inputField').val() === '0') {
            $('#inputField').val($(this).text())
        } else {
            $('#inputField').val($('#inputField').val() + $(this).text());
        }
    });

    $('#equalsButton').click(function () {
        const expresionString = $('#inputField').val()


        if (isSafe(expresionString)) {
            const calculationResult = count(expresionString)
            let result = Math.round(calculationResult * hundred) / hundred
            if (result === Infinity) {
                $('#inputField').val('ERROR').css('color', 'red')
            } else {
                $('#inputField').val(result)
                $(function () {
                    if (/[4][8]{1,}/.test(result) || /[48]{2}/.test(expresionString)) {

                        $('.text-log').prepend(`<div class='history-log'><div class='circle'>
                        </div><div class='expression text-decoration'>${expresionString} = ${result}
                        </div><div class='delete'>X</div></div>`);
                    } else {
                        $('.text-log').prepend(`<div class='history-log'><div class='circle'>
                        </div><div class='expression'>${expresionString} = ${result}
                        </div><div class='delete'>X</div></div>`);
                    }
                })
            }
        } else {
            $('#inputField').val('ERROR')
        }
    })

    $('.clean').click(function () {
        $('#inputField').val('0')
    })


    $(document).on('click', '.circle', function () {
        $(this).toggleClass('red-circle')
    });


    $(document).on('click', '.delete', function () {

        $(this).closest('.history-log').remove();
    });

    $('.history-wrap').scroll(function () {
        console.log(`Scroll Top: ${$(this).scrollTop()}`);
    });

    function isSafe(expression) {
        return /(?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$/.test(expression)

    }

    function count(fn) {
        return new Function('return ' + fn)();
    }


})