document.addEventListener('DOMContentLoaded', function () {
    var refillButton = document.querySelector('.submit-button')
    var blackOverlay = document.querySelector('.black-overlay')
    var step1Element = document.getElementById('step1')
    var step2Element = document.getElementById('step2')
    var step3Element = document.getElementById('step3')
    var counterElement = document.getElementById('counter-payment')
    var amountTotal = document.getElementById('amount-total')
    var successTotal = document.getElementById('success-total')

    var coinItems = document.getElementsByClassName('item-coins')
    var totalPriceElement = document.querySelector('.total-price span')

    for (var i = 0; i < coinItems.length; i++) {
        coinItems[i].addEventListener('click', function () {
            for (var j = 0; j < coinItems.length; j++) {
                coinItems[j].classList.remove('active')
            }

            this.classList.add('active')

            var price = this.querySelector('.price').textContent
            totalPriceElement.innerHTML = '<b>' + price + '</b>'
            amountTotal.innerHTML = price
            successTotal.innerHTML = '<b>' + price + '</b>'
        })
    }

    refillButton.addEventListener('click', function () {
        blackOverlay.classList.add('show')

        setTimeout(function () {
            step1Element.classList.add('show')

            setTimeout(function () {
                step1Element.classList.add('animate__fadeOut')
                step1Element.classList.remove('show')
                step2Element.classList.add('show')
                // Memulai countdown 5 menit
                startCountdown(5 * 60)

                setTimeout(function () {
                    step2Element.classList.add('animate__fadeOut')
                    step2Element.classList.remove('show')
                    step3Element.classList.add('show')
                    setTimeout(function () {
                        step3Element.classList.add('animate__fadeOut')
                        step3Element.classList.remove('show')
                        blackOverlay.classList.remove('show')

                    }, 3500)
                }, 4500)
            }, 2500)
        }, 200)
    })

    function startCountdown(duration) {
        var timer = duration,
            minutes,
            seconds

        var countdownInterval = setInterval(function () {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10)

            minutes = minutes < 10 ? '0' + minutes : minutes
            seconds = seconds < 10 ? '0' + seconds : seconds

            counterElement.textContent = minutes + ':' + seconds

            if (--timer < 0) {
                clearInterval(countdownInterval)
                // Countdown selesai, lakukan tindakan selanjutnya
                // Misalnya, tampilkan pesan atau lakukan redirect
            }
        }, 1000)
    }
})
