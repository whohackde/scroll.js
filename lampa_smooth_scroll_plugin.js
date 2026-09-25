(function () {
    'use strict';

    // Регистрируем плагин в системе Лампы
    Lampa.Platform.tv(); // Принудительно сообщаем, что мы можем использовать мышь
    console.log('Lampa Smooth Scroll Plugin: Успешно загружен');

    // Функция для обработки прокрутки колесиком мыши
    function handleWheelScroll(e) {
        let target = e.target;

        // Поднимаемся вверх по дереву элементов, чтобы найти контейнер с каруселью
        while (target && target !== document.body) {
            
            // Проверяем, есть ли у элемента контент, выходящий за рамки по горизонтали
            let isScrollableX = target.scrollWidth > target.clientWidth;
            
            // Лампа использует специфичные классы для своих горизонтальных списков
            let isLampaCarousel = target.classList.contains('scroll') || 
                                  target.classList.contains('items-line') ||
                                  target.classList.contains('full-scroll__body') ||
                                  target.classList.contains('layer--wheight');

            // Если нашли горизонтальную карусель Лампы
            if (isScrollableX && isLampaCarousel) {
                // Если пользователь крутит колесико вверх/вниз (deltaY)
                if (e.deltaY !== 0) {
                    e.preventDefault(); // Блокируем стандартные рывки страницы

                    // Плавно скроллим ленту по горизонтали
                    // 300 - это ширина шага прокрутки в пикселях. Можно менять.
                    target.scrollBy({
                        left: e.deltaY > 0 ? 300 : -300, 
                        behavior: 'smooth'
                    });
                    
                    return; // Останавливаем поиск
                }
            }
            target = target.parentElement;
        }
    }

    // Вешаем глобальный слушатель на всё окно Лампы.
    // passive: false обязательно, чтобы работал preventDefault()
    window.addEventListener('wheel', handleWheelScroll, { passive: false });

})();