document.addEventListener("DOMContentLoaded", function () {
    const roomExitCard = document.getElementById("room-exit");
    const phaseGrid = document.querySelector(".phase-grid");
    const phaseCards = document.querySelectorAll(".phase-card:not(#room-exit)");

    // Получаем поля ввода
    const dateInput = document.querySelector(".date-input");
    const flightNumberInput = document.querySelector('.flight-time-inputs input[placeholder="Номер рейса"]');
    const flightTimeDisplay = document.getElementById('flight-time-display');

    // Элементы для отображения аэропортов
    const departureAirportCode = document.querySelector('.airport:nth-child(1) .airport-code');
    const departureAirportName = document.querySelector('.airport:nth-child(1) .airport-name');
    const arrivalAirportCode = document.querySelector('.airport:nth-child(2) .airport-code');
    const arrivalAirportName = document.querySelector('.airport:nth-child(2) .airport-name');

    // Элемент для сообщения "нет данных"
    const noDataMessage = document.getElementById('no-data-message');

    // Элементы настроек
    const autoTimezoneCheckbox = document.getElementById('auto-timezone');
    const timezoneSelect = document.getElementById('timezone-select');

    // Функция для управления плейсхолдерами
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

    dateInput.addEventListener("input", managePlaceholders);
    flightNumberInput.addEventListener("input", managePlaceholders);

    // Функция для получения информации о рейсе
    async function fetchFlightInfo(flightNumber, date) {
        const url = `https://flights.aeroflot.ru/api/flights/v1.1/ru/board?flightNumber=${flightNumber}&date=${date}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Ошибка при получении данных о рейсе');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Ошибка:', error);
            return null;
        }
    }

    // Функция для отображения информации о рейсе
    function displayFlightInfo(flightData) {
        // Скрываем сообщение "нет данных" по умолчанию
        noDataMessage.style.display = 'none';
        // Сбрасываем значения по умолчанию
        flightTimeDisplay.textContent = ''; // Очищаем содержимое, чтобы отобразился плейсхолдер
        departureAirportCode.textContent = 'SVO';
        departureAirportName.textContent = 'Шереметьево';
        arrivalAirportCode.textContent = 'LED';
        arrivalAirportName.textContent = 'Пулково';

        if (!flightData || !flightData.flights || flightData.flights.length === 0) {
            // Если данных нет, показываем сообщение "нет данных"
            noDataMessage.style.display = 'block';
            return;
        }

        const flight = flightData.flights[0]; // Берем первый рейс из списка
        const departureTime = new Date(flight.departure.scheduled);
        const formattedTime = departureTime.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        // Обновляем отображение времени вылета (только время, без текста "Время вылета")
        flightTimeDisplay.textContent = formattedTime;

        // Обновляем информацию об аэропортах
        departureAirportCode.textContent = flight.departure.airport.iata || 'N/A';
        departureAirportName.textContent = flight.departure.airport.name || 'Неизвестно';
        arrivalAirportCode.textContent = flight.arrival.airport.iata || 'N/A';
        arrivalAirportName.textContent = flight.arrival.airport.name || 'Неизвестно';
    }

    // Обработчик для получения информации о рейсе при изменении полей
    async function handleFlightInfoUpdate() {
        const flightNumber = flightNumberInput.value.trim().toUpperCase();
        const date = dateInput.value;

        if (!flightNumber || !date) {
            noDataMessage.style.display = 'none';
            flightTimeDisplay.textContent = ''; // Очищаем содержимое, чтобы отобразился плейсхолдер
            departureAirportCode.textContent = 'SVO';
            departureAirportName.textContent = 'Шереметьево';
            arrivalAirportCode.textContent = 'LED';
            arrivalAirportName.textContent = 'Пулково';
            return;
        }

        const flightData = await fetchFlightInfo(flightNumber, date);
        displayFlightInfo(flightData);
    }

    // Добавляем обработчики на поля ввода
    dateInput.addEventListener('change', handleFlightInfoUpdate);
    flightNumberInput.addEventListener('input', handleFlightInfoUpdate);

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
            card.style.transition = "width 1s ease, height 1s ease, transform 2s ease";
            requestAnimationFrame(() => {
                card.style.transform = expanded ? "scale(0.9)" : "scale(1)";
            });
        });
        setTimeout(() => {
            phaseCards.forEach(card => {
                card.style.transform = "scale(1)";
            });
        }, 100);
    }

    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const phaseGrid = document.querySelector('.phase-grid');
            const roomExitCard = document.getElementById('room-exit');

            if (this.textContent.trim() === "Из отеля") {
                phaseGrid.classList.add('expanded');
                roomExitCard.classList.remove('hidden');
                roomExitCard.classList.add('appearing');
                setTimeout(() => {
                    roomExitCard.classList.remove('appearing');
                }, 300);
            } else {
                roomExitCard.classList.add('disappearing');
                setTimeout(() => {
                    phaseGrid.classList.remove('expanded');
                    roomExitCard.classList.add('hidden');
                    roomExitCard.classList.remove('disappearing');
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

    // Инициализация времени для всех событий
    const initialRoomExitTime = new Date(new Date().getTime() + 30 * 60 * 1000);
    const initialDepartureTime = new Date(new Date().getTime() + 4 * 60 * 60 * 1000 + 18 * 60 * 1000);
    const initialFlightTime = new Date(new Date().getTime() + 5 * 60 * 60 * 1000);

    // Инициализация состояния радиокнопки "Авто"
    const isAutoTimezone = localStorage.getItem('autoTimezone') === 'true';
    autoTimezoneCheckbox.checked = isAutoTimezone;
    timezoneSelect.disabled = isAutoTimezone;

    // Функция обновления времени
    function updateTime() {
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        };

        let localTime = new Date();
        let moscowTime;
        let localTimezoneOffset = localTime.getTimezoneOffset(); // Смещение устройства по умолчанию

        // Проверяем режим "Авто"
        const isAutoTimezone = localStorage.getItem('autoTimezone') === 'true';
        if (!isAutoTimezone) {
            const selectedTimezone = localStorage.getItem('selectedTimezone');
            const deviceTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            // Если пользователь выбрал часовой пояс вручную, корректируем время
            if (selectedTimezone && selectedTimezone !== deviceTimezone) {
                const timezoneOffsets = {
                    "Europe/Moscow": 3,
                    "Asia/Vladivostok": 10,
                    "Europe/Kaliningrad": 2,
                    "Asia/Yekaterinburg": 5
                };
                const currentOffset = localTime.getTimezoneOffset() / 60; // Смещение устройства
                const targetOffset = timezoneOffsets[selectedTimezone] || 3; // Смещение выбранного часового пояса
                localTime = new Date(localTime.getTime() + (targetOffset - (-currentOffset)) * 60 * 60 * 1000);
                // Обновляем смещение для localTime
                localTimezoneOffset = -targetOffset * 60; // Например, для UTC+2 это -120 минут
            }
        }

        // Рассчитываем московское время
        const utcTime = localTime.getTime() + (localTimezoneOffset * 60 * 1000);
        const moscowOffset = 3 * 60 * 60 * 1000; // 3 часа в миллисекундах (UTC+3)
        moscowTime = new Date(utcTime + moscowOffset);

        // Обновление времени
        document.getElementById('current-time').textContent = localTime.toLocaleTimeString('ru-RU', options);
        document.getElementById('destination-time').textContent = moscowTime.toLocaleTimeString('ru-RU', options);

        // Обратный отсчет до отъезда (первая карточка)
        let timeDiff = initialDepartureTime - localTime;
        if (timeDiff > 0) {
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('departure-countdown').textContent =
                `${hours} ч ${minutes.toString().padStart(2, '0')} мин`;
        } else {
            document.getElementById('departure-countdown').textContent = "00:00";
        }

        // Обратный отсчет до выхода из номера
        timeDiff = initialRoomExitTime - localTime;
        if (timeDiff > 0) {
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('room-exit-countdown-time').textContent =
                `${hours} ч ${minutes.toString().padStart(2, '0')} мин`;
        } else {
            document.getElementById('room-exit-countdown-time').textContent = "00:00";
        }

        // Обратный отсчет до выезда (вторая карточка)
        timeDiff = initialDepartureTime - localTime;
        if (timeDiff > 0) {
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('departure-countdown-time').textContent =
                `${hours} ч ${minutes.toString().padStart(2, '0')} мин`;
        } else {
            document.getElementById('departure-countdown-time').textContent = "00:00";
        }

        // Обратный отсчет до вылета
        timeDiff = initialFlightTime - localTime;
        if (timeDiff > 0) {
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('flight-countdown-time').textContent =
                `${hours} ч ${minutes.toString().padStart(2, '0')} мин`;
        } else {
            document.getElementById('flight-countdown-time').textContent = "00:00";
        }

        // Обновление времени фаз
        document.getElementById('bedtime').textContent =
            new Date(localTime.getTime() + 2 * 60 * 60 * 1000).toLocaleTimeString('ru-RU', options);
        document.getElementById('waketime').textContent =
            new Date(localTime.getTime() + 8 * 60 * 60 * 1000).toLocaleTimeString('ru-RU', options);
        document.getElementById('departuretime').textContent =
            initialDepartureTime.toLocaleTimeString('ru-RU', options);
    }

    setInterval(updateTime, 1000);
    updateTime();

    // Управление сном
    let sleepHours = 8.0;
    const updateSleep = () => {
        document.getElementById('sleep-value').textContent = `${sleepHours.toFixed(1)}ч`;
    };

    document.getElementById('increase-sleep').addEventListener('click', () => {
        if (sleepHours < 10) sleepHours += 0.5, updateSleep();
    });

    document.getElementById('decrease-sleep').addEventListener('click', () => {
        if (sleepHours > 0) sleepHours -= 0.5, updateSleep();
    });

    // Управление модальным окном
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

    // Обработчик для радиокнопки "Авто"
    autoTimezoneCheckbox.addEventListener('change', (e) => {
        const isAuto = e.target.checked;
        localStorage.setItem('autoTimezone', isAuto);
        timezoneSelect.disabled = isAuto;
        if (isAuto) {
            // Если включен режим "Авто", очищаем выбранный часовой пояс
            localStorage.removeItem('selectedTimezone');
        }
        updateTime();
    });

    // Обработчик для выбора часового пояса
    timezoneSelect.addEventListener('change', (e) => {
        localStorage.setItem('selectedTimezone', e.target.value);
        updateTime();
    });
});
