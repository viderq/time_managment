document.addEventListener("DOMContentLoaded", function () {
    const roomExitCard = document.getElementById("room-exit");
    const phaseGrid = document.querySelector(".phase-grid");
    const phaseCards = document.querySelectorAll(".phase-card:not(#room-exit)");

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

    // Пример вызова (замени на свою логику)
    hotelButton.addEventListener("click", function () {
        toggleRoomExitCard(!roomExitCard.classList.contains("hidden"));
    });

    homeButton.addEventListener("click", function () {
        toggleRoomExitCard(!roomExitCard.classList.contains("hidden"));
    });
});

    // Обработчик для кнопок .mode-btn
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            // Убираем активный класс со всех кнопок и добавляем текущей
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Управление карточкой "Выход из номера"
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

            // Обновляем время "Выход из номера"
            const now = new Date();
            document.getElementById('roomExitTime').textContent =
                new Date(now.getTime() + 30 * 60 * 1000).toLocaleTimeString('ru-RU', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false
                });
        });
    });

    // Инициализация времени выезда
    const initialDepartureTime = new Date();
    initialDepartureTime.setHours(initialDepartureTime.getHours() + 4, initialDepartureTime.getMinutes() + 20);

    function updateTime() {
        const now = new Date();
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        };

        // Обновление времени
        document.getElementById('current-time').textContent = now.toLocaleTimeString('ru-RU', options);
        document.getElementById('destination-time').textContent =
            new Date(now.getTime() + 60 * 60 * 1000).toLocaleTimeString('ru-RU', options);

        // Обратный отсчет до выезда
        const timeDiff = initialDepartureTime - now;
        if (timeDiff > 0) {
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('departure-countdown').textContent =
                `${hours} ч ${minutes.toString().padStart(2, '0')} мин`;
        } else {
            document.getElementById('departure-countdown').textContent = "00:00";
        }

        // Обновление времени фаз
        document.getElementById('bedtime').textContent =
            new Date(now.getTime() + 2 * 60 * 60 * 1000).toLocaleTimeString('ru-RU', options);
        document.getElementById('waketime').textContent =
            new Date(now.getTime() + 8 * 60 * 60 * 1000).toLocaleTimeString('ru-RU', options);
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