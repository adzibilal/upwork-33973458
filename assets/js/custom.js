document.addEventListener('DOMContentLoaded', function () {
    var refillButton = document.querySelector('.submit-button')
    var blackOverlay = document.querySelector('.black-overlay')
    var doneOverlay = document.querySelector('.done-overlay')
    var step1Element = document.getElementById('step1')
    var step2Element = document.getElementById('step2')
    var step3Element = document.getElementById('step3')
    var counterElement = document.getElementById('counter-payment')
    var amountTotal = document.getElementById('amount-total')
    var successTotal = document.getElementById('success-total')
    var coinItems = document.getElementsByClassName('item-coins')
    var totalPriceElement = document.querySelector('.total-price span')
    var customForm = document.getElementById('custom-form')
    var inpCustom = document.querySelector('.inp-custom')
    var priceCustom = document.getElementById('price-custom')
    var button = document.getElementById('refill-btn')

    for (var i = 0; i < coinItems.length; i++) {
        coinItems[i].addEventListener('click', function () {
            for (var j = 0; j < coinItems.length; j++) {
                coinItems[j].classList.remove('active')
            }

            this.classList.add('active')

            // Hilangkan elemen <p>Custom</p>
            var customText = customForm.querySelector('.amount p')
            customText.style.display = 'block'

            // Tambahkan kelas "show" ke elemen dengan kelas "inp-custom"
            var inpCustom = customForm.querySelector('.inp-custom')
            inpCustom.classList.remove('show')
            inpCustom.value = ''
            // Ubah teks elemen dengan id "price-custom"
            var priceCustom = customForm.querySelector('#price-custom')
            priceCustom.textContent = 'Large amount supported'

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
                step1Element.classList.remove('show')
                step2Element.classList.add('show')
                // Memulai countdown 5 menit
                startCountdown(5 * 60)

                setTimeout(function () {
                    step2Element.classList.remove('show')
                    step3Element.classList.add('show')
                    doneOverlay.classList.add('show')
                    // setTimeout(function () {
                    //     step3Element.classList.remove('show')
                    //     blackOverlay.classList.remove('show')
                    //     // location.reload()
                    // }, 3500)
                }, 4500)
            }, 2500)
        }, 200)
    })

    doneOverlay.addEventListener('click', function () {
        step3Element.classList.remove('show')
        blackOverlay.classList.remove('show')
        doneOverlay.classList.remove('show')
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

    // Tambahkan event listener untuk meng-handle klik pertama kali
    customForm.addEventListener('click', function () {
        // Hilangkan elemen <p>Custom</p>
        var customText = customForm.querySelector('.amount p')
        customText.style.display = 'none'

        // Tambahkan kelas "show" ke elemen dengan kelas "inp-custom"
        var inpCustom = customForm.querySelector('.inp-custom')
        inpCustom.classList.add('show')

        // Ubah teks elemen dengan id "price-custom"
        var priceCustom = customForm.querySelector('#price-custom')
        priceCustom.textContent = '30-2,500,000'

        totalPriceElement.innerHTML = '<b> $ 0 </b>'
    })

    // Tambahkan event listener untuk meng-handle perubahan nilai input
    inpCustom.addEventListener('input', function () {
        var inputValue = parseFloat(inpCustom.value)

        if (isNaN(inputValue) || inputValue < 30) {
            priceCustom.textContent = 'Minimum : 30'
            priceCustom.classList.add('text-red')
            customForm.classList.add('border-red')
            totalPriceElement.innerHTML = '<b> $ 0 </b>'
            // Menonaktifkan tombol
            button.disabled = true
        } else if (isNaN(inputValue) || inputValue > 2500000) {
            priceCustom.textContent = 'Maximum : 2,500,000'
            priceCustom.classList.add('text-red')
            customForm.classList.add('border-red')
            totalPriceElement.innerHTML = '<b> $ 0 </b>'
            // Menonaktifkan tombol
            button.disabled = true
        } else {
            var price = inputValue * 0.0112857142857143
            priceCustom.textContent = '$ ' + price.toFixed(2)
            totalPriceElement.innerHTML = '<b>$ ' + price.toFixed(2) + '</b>'
            amountTotal.innerHTML = '$ ' + price.toFixed(2)
            successTotal.innerHTML = '<b>$' + price.toFixed(2) + '</b>'
            priceCustom.classList.remove('text-red')
            customForm.classList.remove('border-red')
            button.disabled = false
        }
    })
})
