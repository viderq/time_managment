if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker зарегистрирован:', reg))
      .catch(err => console.error('Ошибка регистрации Service Worker:', err));
  });
}


document.addEventListener("DOMContentLoaded", function () {
    const roomExitCard = document.getElementById("room-exit");
    const phaseGrid = document.querySelector(".phase-grid");
    const phaseCards = document.querySelectorAll(".phase-card:not(#room-exit)");

    // Получаем поля ввода
    const dateInput = document.querySelector(".date-input");
    const flightNumberInput = document.querySelector('.flight-number');
    const flightPrefixSelect = document.querySelector('.flight-prefix');
    const flightTimeDisplay = document.getElementById('flight-time-display');

    // Элементы для отображения аэропортов
    const departureAirportCode = document.querySelector('.airport:nth-child(1) .airport-code');
    const departureAirportName = document.querySelector('.airport:nth-child(1) .airport-name');
    const arrivalAirportCode = document.querySelector('.airport:nth-child(2) .airport-code');
    const arrivalAirportName = document.querySelector('.airport:nth-child(2) .airport-name');

    // Элементы настроек
    const autoTimezoneCheckbox = document.getElementById('auto-timezone');
    const timezoneSelect = document.getElementById('timezone-select');

    // Установка значений по умолчанию из localStorage или инициализация
    function loadSavedData() {
        const savedDate = localStorage.getItem('flightDate');
        const savedPrefix = localStorage.getItem('flightPrefix');
        const savedNumber = localStorage.getItem('flightNumber');

        if (savedDate) {
            dateInput.value = savedDate;
        } else {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const formattedDate = tomorrow.toISOString().split('T')[0]; // Формат YYYY-MM-DD
            dateInput.value = formattedDate;
            localStorage.setItem('flightDate', formattedDate);
        }

        if (savedPrefix) {
            flightPrefixSelect.value = savedPrefix;
        } else {
            localStorage.setItem('flightPrefix', flightPrefixSelect.value); // Сохраняем значение по умолчанию (SU)
        }

        if (savedNumber) {
            flightNumberInput.value = savedNumber;
        }

        if (savedDate && savedNumber) {
            handleFlightInfoUpdate();
        }
    }

    loadSavedData();

    dateInput.addEventListener('change', () => {
        localStorage.setItem('flightDate', dateInput.value);
        if (flightNumberInput.value) {
            handleFlightInfoUpdate();
        }
    });

    flightPrefixSelect.addEventListener('change', () => {
        localStorage.setItem('flightPrefix', flightPrefixSelect.value);
        if (dateInput.value && flightNumberInput.value) {
            handleFlightInfoUpdate();
        }
    });

    flightNumberInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length > 5) {
            this.value = this.value.slice(0, 5);
        }
        localStorage.setItem('flightNumber', this.value);
        managePlaceholders();
    });

    flightNumberInput.addEventListener('blur', () => {
        if (dateInput.value) {
            handleFlightInfoUpdate();
        }
    });

    function managePlaceholders() {
        if (!dateInput.value) {
            dateInput.classList.add("placeholder");
        } else {
            dateInput.classList.remove("placeholder");
        }

        if (!flightNumberInput.value) {
            flightNumberInput.classList.add("placeholder");
        } else {
            flightNumberInput.classList.remove("placeholder");
        }
    }

    managePlaceholders();

    function fetchFlightInfo(flightNumber, date) {
        return new Promise((resolve, reject) => {
            console.log("Дата:", date);
            console.log("Номер рейса:", flightNumber);

            const proxyUrl = `https://cocsr.na4u.ru/main.php?flightNumber=${encodeURIComponent(flightNumber)}&date=${encodeURIComponent(date)}`;

            console.log("Сформированный URL:", proxyUrl);

            fetch(proxyUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Ошибка HTTP: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (!data || data.error) {
                        throw new Error(data?.error || "Неизвестная ошибка API");
                    }
                    console.log("Полученные данные:", data);
                    resolve(data);
                })
                .catch(error => {
                    console.error("Ошибка при запросе:", error);
                    flightTimeDisplay.textContent = 'нет данных';
                    flightTimeDisplay.classList.add('no-data');
                    triggerShakeAndVibrate();
                    resolve(null);
                });
        });
    }

    function triggerShakeAndVibrate() {
        const elementsToShake = [departureAirportCode, departureAirportName, arrivalAirportCode, arrivalAirportName];
        elementsToShake.forEach(element => {
            element.classList.add('shake');
            setTimeout(() => element.classList.remove('shake'), 300);
        });

        if ('vibrate' in navigator) {
            navigator.vibrate([100, 50, 100]);
        }
    }

    function displayFlightInfo(flightData) {
        flightTimeDisplay.textContent = 'нет данных';
        flightTimeDisplay.classList.add('no-data');

        const applyFadeAnimation = (element, newText) => {
            element.classList.remove('fade');
            setTimeout(() => {
                element.textContent = newText;
                element.classList.add('fade');
            }, 0);
        };

        if (!flightData || !flightData.data || !flightData.data.routes || flightData.data.routes.length === 0) {
            departureAirportCode.textContent = '---';
            departureAirportName.textContent = '-----';
            arrivalAirportCode.textContent = '---';
            arrivalAirportName.textContent = '-----';
            triggerShakeAndVibrate();
            console.log("Аэропорт прилета: ---");
            console.log("Время вылета: Не указано");
            return;
        }

        const flight = flightData.data.routes[0];
        const departureTimeStr = flight.leg.departure.times.estimatedBlockOff?.local ||
                                flight.leg.departure.times.scheduledDeparture.local;
        const departureTime = new Date(departureTimeStr);
        const formattedTime = departureTime.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        flightTimeDisplay.textContent = formattedTime;
        flightTimeDisplay.classList.remove('no-data');
        applyFadeAnimation(departureAirportCode, flight.leg.departure.scheduled.airportCode || 'N/A');
        applyFadeAnimation(departureAirportName, flight.leg.departure.scheduled.airport || 'Неизвестно');
        applyFadeAnimation(arrivalAirportCode, flight.leg.arrival.scheduled.airportCode || 'N/A');
        applyFadeAnimation(arrivalAirportName, flight.leg.arrival.scheduled.airport || 'Неизвестно');

        console.log("Аэропорт прилета:", flight.leg.arrival.scheduled.airportCode || 'N/A');
        console.log("Время вылета:", formattedTime);
    }

    async function handleFlightInfoUpdate() {
        const prefix = flightPrefixSelect.value;
        const number = flightNumberInput.value.trim();
        const flightNumber = `${prefix}${number}`.toUpperCase();
        const date = dateInput.value;

        if (!number || !date || !number.match(/^\d{1,5}$/)) {
            flightTimeDisplay.textContent = 'нет данных';
            flightTimeDisplay.classList.add('no-data');
            departureAirportCode.textContent = '---';
            departureAirportName.textContent = '-----';
            arrivalAirportCode.textContent = '---';
            arrivalAirportName.textContent = '-----';
            triggerShakeAndVibrate();
            console.log("Аэропорт прилета: ---");
            console.log("Время вылета: Не указано");
            return;
        }

        try {
            const flightData = await fetchFlightInfo(flightNumber, date);
            displayFlightInfo(flightData);
        } catch (error) {
            console.error("Ошибка в handleFlightInfoUpdate:", error);
            flightTimeDisplay.textContent = 'нет данных';
            flightTimeDisplay.classList.add('no-data');
            departureAirportCode.textContent = '---';
            departureAirportName.textContent = '-----';
            arrivalAirportCode.textContent = '---';
            arrivalAirportName.textContent = '-----';
            triggerShakeAndVibrate();
        }
    }

    function toggleRoomExitCard(show) {
        if (show) {
            roomExitCard.classList.remove("hidden");
            roomExitCard.classList.add("appearing");
            setTimeout(() => {
                roomExitCard.classList.remove("appearing");
            }, 300);
        } else {
            roomExitCard.classList.add("disappearing");
            setTimeout(() => {
                roomExitCard.classList.remove("disappearing");
                roomExitCard.classList.add("hidden");
            }, 300);
        }
        adjustPhaseCardSizes(show);
    }

    function adjustPhaseCardSizes(expanded) {
        phaseGrid.classList.toggle("expanded", expanded);
        phaseCards.forEach(card => {
            // Устанавливаем плавный переход только для transform с длительностью 0.6s
            card.style.transition = "transform 0.6s ease-in-out";
            requestAnimationFrame(() => {
                card.style.transform = expanded ? "scale(0.9)" : "scale(1)";
            });
        });
        // Убираем дополнительный setTimeout, так как переход теперь управляется CSS
    }

    // Обработчик переключения режимов с заменой иконки
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const phaseGrid = document.querySelector('.phase-grid');
            const roomExitCard = document.getElementById('room-exit');
            const departureIcon = document.querySelector('#departuretime').parentElement.querySelector('.phase-icon');

            if (this.textContent.trim() === "Из отеля") {
                phaseGrid.classList.add('expanded');
                roomExitCard.classList.remove('hidden');
                roomExitCard.classList.add('appearing');
                setTimeout(() => {
                    roomExitCard.classList.remove('appearing');
                }, 300);

                // Анимация замены иконки на шаттл
                departureIcon.classList.add('icon-disappear');
                setTimeout(() => {
                    departureIcon.classList.remove('fas', 'fa-car');
                    departureIcon.classList.add('fa-solid', 'fa-van-shuttle');
                    departureIcon.classList.remove('icon-disappear');
                    departureIcon.classList.add('icon-appear');
                    setTimeout(() => {
                        departureIcon.classList.remove('icon-appear');
                    }, 300);
                }, 300);
            } else {
                roomExitCard.classList.add('disappearing');
                setTimeout(() => {
                    phaseGrid.classList.remove('expanded');
                    roomExitCard.classList.add('hidden');
                    roomExitCard.classList.remove('disappearing');
                }, 300);

                // Анимация замены иконки на машину
                departureIcon.classList.add('icon-disappear');
                setTimeout(() => {
                    departureIcon.classList.remove('fa-solid', 'fa-van-shuttle');
                    departureIcon.classList.add('fas', 'fa-car');
                    departureIcon.classList.remove('icon-disappear');
                    departureIcon.classList.add('icon-appear');
                    setTimeout(() => {
                        departureIcon.classList.remove('icon-appear');
                    }, 300);
                }, 300);
            }

            const now = new Date();
            document.getElementById('roomExitTime').textContent =
                new Date(now.getTime() + 30 * 60 * 1000).toLocaleTimeString('ru-RU', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false
                });
        });
    });

    const isAutoTimezone = localStorage.getItem('autoTimezone') === 'true';
    if (autoTimezoneCheckbox) {
        autoTimezoneCheckbox.checked = isAutoTimezone;
    }
    if (timezoneSelect) {
        timezoneSelect.disabled = isAutoTimezone;
    }

    const initialRoomExitTime = new Date(new Date().getTime() + 30 * 60 * 1000);
    const initialDepartureTime = new Date(new Date().getTime() + 4 * 60 * 60 * 1000 + 18 * 60 * 1000);
    const initialFlightTime = new Date(new Date().getTime() + 5 * 60 * 60 * 1000);

    let sleepHours = 8.0;

    function updateTime() {
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        };

        let localTime = new Date();
        let moscowTime;
        let localTimezoneOffset = localTime.getTimezoneOffset();

        const isAutoTimezone = localStorage.getItem('autoTimezone') === 'true';
        if (!isAutoTimezone) {
            const selectedTimezone = localStorage.getItem('selectedTimezone');
            const deviceTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            if (selectedTimezone && selectedTimezone !== deviceTimezone) {
                const timezoneOffsets = {
                    "Europe/Moscow": 3,
                    "Asia/Vladivostok": 10,
                    "Europe/Kaliningrad": 2,
                    "Asia/Yekaterinburg": 5
                };
                const currentOffset = localTime.getTimezoneOffset() / 60;
                const targetOffset = timezoneOffsets[selectedTimezone] || 3;
                localTime = new Date(localTime.getTime() + (targetOffset - (-currentOffset)) * 60 * 60 * 1000);
                localTimezoneOffset = -targetOffset * 60;
            }
        }

        const utcTime = localTime.getTime() + (localTimezoneOffset * 60 * 1000);
        const moscowOffset = 3 * 60 * 60 * 1000;
        moscowTime = new Date(utcTime + moscowOffset);

        document.getElementById('current-time').textContent = localTime.toLocaleTimeString('ru-RU', options);
        document.getElementById('destination-time').textContent = moscowTime.toLocaleTimeString('ru-RU', options);

        let timeDiff = initialDepartureTime - localTime;
        if (timeDiff > 0) {
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('departure-countdown').textContent =
                `${hours} ч ${minutes.toString().padStart(2, '0')} мин`;
        } else {
            document.getElementById('departure-countdown').textContent = "00:00";
        }

        timeDiff = initialRoomExitTime - localTime;
        if (timeDiff > 0) {
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('room-exit-countdown-time').textContent =
                `${hours} ч ${minutes.toString().padStart(2, '0')} мин`;
        } else {
            document.getElementById('room-exit-countdown-time').textContent = "00:00";
        }

        timeDiff = initialDepartureTime - localTime;
        if (timeDiff > 0) {
            const hours = Math.floor(timeDiff / (1000 * 70 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('departure-countdown-time').textContent =
                `${hours} ч ${minutes.toString().padStart(2, '0')} мин`;
        } else {
            document.getElementById('departure-countdown-time').textContent = "00:00";
        }

        timeDiff = initialFlightTime - localTime;
        if (timeDiff > 0) {
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('flight-countdown-time').textContent =
                `${hours} ч ${minutes.toString().padStart(2, '0')} мин`;
        } else {
            document.getElementById('flight-countdown-time').textContent = "00:00";
        }

        const bedtime = new Date(localTime.getTime() + 2 * 60 * 60 * 1000);
        document.getElementById('bedtime').textContent = bedtime.toLocaleTimeString('ru-RU', options);

        const waketime = new Date(bedtime.getTime() + sleepHours * 60 * 60 * 1000);
        document.getElementById('waketime').textContent = waketime.toLocaleTimeString('ru-RU', options);

        document.getElementById('departuretime').textContent =
            initialDepartureTime.toLocaleTimeString('ru-RU', options);
    }

    setInterval(updateTime, 1000);
    updateTime();

    const updateSleep = () => {
        const hours = Math.floor(sleepHours);
        const minutes = Math.round((sleepHours - hours) * 60);
        document.getElementById('sleep-value').textContent = `${hours} часов ${minutes} минут`;
    };

    updateSleep();

    document.getElementById('increase-sleep').addEventListener('click', () => {
        if (sleepHours < 10) {
            sleepHours += 0.5;
            updateSleep();
        }
    });

    document.getElementById('decrease-sleep').addEventListener('click', () => {
        if (sleepHours > 0) {
            sleepHours -= 0.5;
            updateSleep();
        }
    });

    const settingsButton = document.getElementById('settings-button');
    const settingsModal = document.getElementById('settings-modal');
    const closeModal = document.getElementById('close-modal');

    settingsButton.addEventListener('click', () => {
        settingsModal.classList.add('active');
    });

    closeModal.addEventListener('click', () => {
        settingsModal.classList.remove('active');
    });

    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.classList.remove('active');
        }
    });

    autoTimezoneCheckbox.addEventListener('change', (e) => {
        const isAuto = e.target.checked;
        localStorage.setItem('autoTimezone', isAuto);
        if (timezoneSelect) {
            timezoneSelect.disabled = isAuto;
        }
        if (isAuto) {
            localStorage.removeItem('selectedTimezone');
        }
        updateTime();
    });

    timezoneSelect.addEventListener('change', (e) => {
        localStorage.setItem('selectedTimezone', e.target.value);
        updateTime();
    });

    function adjustDateInputWidth() {
        const flightTimeInputs = document.querySelector('.flight-time-inputs');
        const dateInput = document.querySelector('.date-input');
        if (flightTimeInputs && dateInput) {
            const flightTimeInputsWidth = flightTimeInputs.getBoundingClientRect().width;
            dateInput.style.width = `${flightTimeInputsWidth}px`;
        }
    }

    window.addEventListener('load', () => {
        setTimeout(adjustDateInputWidth, 100);
    });
    window.addEventListener('resize', adjustDateInputWidth);
});
