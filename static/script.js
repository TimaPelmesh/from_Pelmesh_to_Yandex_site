document.addEventListener('DOMContentLoaded', function() {
    const professionInput = document.getElementById('profession');
    const regionInput = document.getElementById('region');
    const userInfoTextarea = document.getElementById('user-info');
    const medicalInfoTextarea = document.getElementById('medical-info');
    const generateButton = document.getElementById('generate-button');
    const loader = document.getElementById('loader');
    const roadmap = document.getElementById('roadmap');
    const professionTitle = document.getElementById('profession-title');
    const regionTitle = document.getElementById('region-title');
    const hardSkillsList = document.getElementById('hard-skills');
    const softSkillsList = document.getElementById('soft-skills');
    const learningPlan = document.getElementById('learning-plan');
    const futureInsightsList = document.getElementById('future-insights');
    const personalRecommendations = document.getElementById('personal-recommendations');

    generateButton.addEventListener('click', generateRoadmap);

    // Также добавляем обработку нажатия Enter в полях ввода
    professionInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateRoadmap();
        }
    });

    regionInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateRoadmap();
        }
    });

    // Добавляем обработчик для FAQ-ссылки
    const faqLink = document.querySelector('.nav-link[href="#faq-section"]');
    const faqSection = document.getElementById('faq-section');
    
    if (faqLink && faqSection) {
        // Удаляем обработчик mouseover, оставляем только click
        faqLink.addEventListener('click', function(e) {
            e.preventDefault();
            faqSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Удаляем автоматическую прокрутку к форме
    // const searchForm = document.getElementById('search-form');
    // if (searchForm) {
    //     setTimeout(() => {
    //         searchForm.scrollIntoView({ 
    //             behavior: 'smooth',
    //             block: 'start'
    //         });
    //     }, 1500);
    // }

    // Функция для генерации дорожной карты
    async function generateRoadmap() {
        const profession = professionInput.value.trim();
        const region = regionInput.value.trim();
        const userInfo = userInfoTextarea.value.trim();
        const medicalInfo = medicalInfoTextarea.value.trim();

        if (!profession) {
            alert('Пожалуйста, укажите профессию или вакансию');
            professionInput.focus();
            return;
        }

        if (!region) {
            alert('Пожалуйста, укажите регион (город или страну)');
            regionInput.focus();
            return;
        }

        // Скрываем предыдущие результаты, если они были
        roadmap.classList.add('hidden');
        
        // Показываем индикатор загрузки
        loader.classList.remove('hidden');

        try {
            // Имитируем задержку запроса к API
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Имитация ответа API с использованием заранее подготовленных данных
            const roadmapData = generateMockRoadmapData(profession, region, userInfo, medicalInfo);
            
            // Заполняем данные на странице
            populateRoadmap(roadmapData);
            
            // Показываем результаты
            roadmap.classList.remove('hidden');
            
            // Прокручиваем к результатам
            roadmap.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            alert('Произошла ошибка при анализе данных. Пожалуйста, попробуйте позже.');
        } finally {
            // Скрываем индикатор загрузки
            loader.classList.add('hidden');
        }
    }

    // Функция для генерации демонстрационных данных
    function generateMockRoadmapData(profession, region, userInfo, medicalInfo) {
        // Базовые данные для всех профессий
        const baseData = {
            profession: profession,
            region: region,
            hardSkills: [
                "Анализ данных", 
                "Работа с документацией", 
                "Тайм-менеджмент", 
                "Стрессоустойчивость", 
                "Умение работать с информацией"
            ],
            softSkills: [
                "Коммуникабельность", 
                "Командная работа", 
                "Адаптивность", 
                "Критическое мышление", 
                "Эмоциональный интеллект"
            ],
            futureInsights: [
                "Рост востребованности удаленной работы",
                "Увеличение важности междисциплинарных знаний",
                "Развитие технологий искусственного интеллекта в отрасли",
                "Увеличение скорости изменений в профессиональных требованиях"
            ],
            personalRecommendations: []
        };

        // Персонализированные рекомендации на основе введенной пользователем информации
        if (userInfo) {
            baseData.personalRecommendations.push(
                "На основе вашего опыта рекомендуем сосредоточиться на углублении профессиональных знаний",
                "Рассмотрите возможность изучения смежных областей для расширения вашей экспертизы"
            );
        }
        
        if (medicalInfo) {
            baseData.personalRecommendations.push(
                "Учитывая ваши особенности, рекомендуем рассмотреть возможность гибкого графика работы",
                "Обратите внимание на компании с развитой культурой поддержки сотрудников"
            );
        }

        // Специфические данные для разных профессий
        const professionalData = {};
        
        // Данные для разработчиков
        professionalData["разработчик"] = {
            hardSkills: [
                "Алгоритмы и структуры данных", 
                "Git и системы контроля версий", 
                "Тестирование и отладка", 
                "CI/CD", 
                "Архитектурные паттерны"
            ],
            softSkills: [
                "Решение проблем", 
                "Работа с обратной связью", 
                "Коммуникация с командой", 
                "Презентация идей", 
                "Обучаемость"
            ],
            learningPlan: [
                {
                    title: "Изучение основ программирования",
                    description: "Освоение базовых концепций программирования, алгоритмов и структур данных",
                    duration: "3-6 месяцев"
                },
                {
                    title: "Освоение фреймворков и библиотек",
                    description: "Изучение популярных фреймворков и библиотек, используемых в индустрии",
                    duration: "2-4 месяца"
                },
                {
                    title: "Практика разработки проектов",
                    description: "Создание собственных проектов для портфолио и закрепления навыков",
                    duration: "4-6 месяцев"
                },
                {
                    title: "Участие в open-source проектах",
                    description: "Вклад в существующие проекты с открытым исходным кодом для получения опыта командной работы",
                    duration: "Постоянно"
                }
            ],
            educationalResources: {
                "Изучение основ программирования": [
                    {
                        title: "Яндекс Образование - полезные статьи, хендбук",
                        url: "https://education.yandex.ru",
                        description: "Образовательные материалы по программированию от Яндекса",
                        free: true
                    },
                    {
                        title: "Книга 'Грокаем алгоритмы' Адитья Бхаргава",
                        url: "https://www.amazon.com/",
                        description: "Доступное объяснение алгоритмов с иллюстрациями",
                        free: false
                    }
                ],
                "Освоение фреймворков и библиотек": [
                    {
                        title: "Документация по React.js",
                        url: "https://reactjs.org/",
                        description: "Официальная документация и туториалы по React",
                        free: true
                    },
                    {
                        title: "Курс по Django на YouTube",
                        url: "https://www.youtube.com/",
                        description: "Пошаговое руководство по созданию веб-приложений на Django",
                        free: true
                    }
                ]
            }
        };
        
        // Данные для дизайнеров
        professionalData["дизайнер"] = {
            hardSkills: [
                "Figma/Sketch/Adobe XD", 
                "Принципы UI/UX", 
                "Типографика", 
                "Визуальная иерархия", 
                "Создание прототипов"
            ],
            softSkills: [
                "Креативность", 
                "Прием и внедрение обратной связи", 
                "Презентация работы", 
                "Защита дизайн-решений", 
                "Эмпатия к пользователям"
            ],
            learningPlan: [
                {
                    title: "Основы дизайна и композиции",
                    description: "Изучение фундаментальных принципов дизайна, цветовой теории и композиции",
                    duration: "2-3 месяца"
                },
                {
                    title: "Освоение инструментов дизайна",
                    description: "Изучение профессиональных инструментов дизайна (Figma, Adobe Creative Suite и др.)",
                    duration: "2-3 месяца"
                },
                {
                    title: "Принципы UX/UI дизайна",
                    description: "Изучение пользовательского опыта, создание прототипов и тестирование",
                    duration: "3-4 месяца"
                },
                {
                    title: "Создание портфолио",
                    description: "Разработка проектов для демонстрации своих навыков и привлечения клиентов/работодателей",
                    duration: "2-3 месяца"
                }
            ],
            educationalResources: {
                "Основы дизайна и композиции": [
                    {
                        title: "Курс 'Основы графического дизайна' на Skillshare",
                        url: "https://www.skillshare.com/",
                        description: "Введение в основы дизайна для начинающих",
                        free: false
                    },
                    {
                        title: "Канал 'The Futur' на YouTube",
                        url: "https://www.youtube.com/c/thefutur",
                        description: "Образовательный контент о дизайне и бизнесе",
                        free: true
                    }
                ],
                "Освоение инструментов дизайна": [
                    {
                        title: "Официальные туториалы Figma",
                        url: "https://www.figma.com/resources/learn-design/",
                        description: "Пошаговые руководства по работе в Figma",
                        free: true
                    },
                    {
                        title: "Курс по Adobe Illustrator на Udemy",
                        url: "https://www.udemy.com/",
                        description: "Полное руководство по работе в Adobe Illustrator",
                        free: false
                    }
                ]
            }
        };
        
        // Данные для маркетологов
        professionalData["маркетолог"] = {
            hardSkills: [
                "Аналитика данных", 
                "SEO/SEM", 
                "Контент-маркетинг", 
                "Email-маркетинг", 
                "SMM"
            ],
            softSkills: [
                "Креативность", 
                "Коммуникабельность", 
                "Аналитическое мышление", 
                "Управление проектами", 
                "Ориентация на результат"
            ],
            learningPlan: [
                {
                    title: "Основы маркетинга",
                    description: "Изучение фундаментальных принципов и стратегий маркетинга",
                    duration: "2-3 месяца"
                },
                {
                    title: "Цифровой маркетинг",
                    description: "Освоение инструментов и каналов цифрового маркетинга (SEO, SMM, email и т.д.)",
                    duration: "3-4 месяца"
                },
                {
                    title: "Аналитика и метрики",
                    description: "Изучение методов анализа маркетинговых данных и ключевых метрик",
                    duration: "2-3 месяца"
                },
                {
                    title: "Создание и управление маркетинговыми кампаниями",
                    description: "Разработка и запуск комплексных маркетинговых кампаний",
                    duration: "3-4 месяца"
                }
            ],
            educationalResources: {
                "Основы маркетинга": [
                    {
                        title: "Курс 'Fundamentals of Marketing' на edX",
                        url: "https://www.edx.org/",
                        description: "Базовый курс по маркетингу от ведущих университетов",
                        free: true
                    },
                    {
                        title: "Книга 'Маркетинг от А до Я' Филипа Котлера",
                        url: "https://www.amazon.com/",
                        description: "Классическое пособие по маркетингу",
                        free: false
                    }
                ],
                "Цифровой маркетинг": [
                    {
                        title: "Google Digital Garage",
                        url: "https://learndigital.withgoogle.com/digitalgarage",
                        description: "Бесплатные курсы по цифровому маркетингу от Google",
                        free: true
                    },
                    {
                        title: "HubSpot Academy",
                        url: "https://academy.hubspot.com/",
                        description: "Сертификационные курсы по различным аспектам маркетинга",
                        free: true
                    }
                ]
            }
        };

        // Функция для определения подходящего набора данных по профессии
        function findMatchingProfession(profession) {
            profession = profession.toLowerCase();
            
            if (profession.includes("разработ") || profession.includes("программист") || profession.includes("инженер") || profession.includes("девелопер")) {
                return "разработчик";
            }
            
            if (profession.includes("дизайн") || profession.includes("ui") || profession.includes("ux") || profession.includes("граф")) {
                return "дизайнер";
            }
            
            if (profession.includes("маркет") || profession.includes("smm") || profession.includes("контент") || profession.includes("реклам")) {
                return "маркетолог";
            }
            
            return null;
        }
        
        // Определяем подходящий набор данных
        const matchedProfession = findMatchingProfession(profession);
        
        // Если нашли соответствие, объединяем базовые данные с профессиональными
        if (matchedProfession && professionalData[matchedProfession]) {
            const specificData = professionalData[matchedProfession];
            
            return {
                ...baseData,
                hardSkills: [...specificData.hardSkills, ...baseData.hardSkills].slice(0, 8),
                softSkills: [...specificData.softSkills, ...baseData.softSkills].slice(0, 6),
                learningPlan: specificData.learningPlan,
                educationalResources: specificData.educationalResources
            };
        }
        
        // Если соответствия не нашли, возвращаем базовые данные с общим планом обучения
        return {
            ...baseData,
            learningPlan: [
                {
                    title: "Изучение основ профессии",
                    description: "Освоение базовых знаний и навыков, необходимых в выбранной сфере",
                    duration: "3-6 месяцев"
                },
                {
                    title: "Освоение специализированных инструментов",
                    description: "Изучение профессиональных инструментов и технологий",
                    duration: "2-4 месяца"
                },
                {
                    title: "Получение практического опыта",
                    description: "Работа над реальными проектами для формирования портфолио",
                    duration: "4-6 месяцев"
                },
                {
                    title: "Нетворкинг и профессиональное развитие",
                    description: "Участие в профессиональных сообществах и мероприятиях",
                    duration: "Постоянно"
                }
            ],
            educationalResources: {
                "Основы профессии": [
                    {
                        title: "Яндекс Образование - полезные статьи, хендбук",
                        url: "https://education.yandex.ru",
                        description: "Подборка образовательных материалов от Яндекса",
                        free: true
                    },
                    {
                        title: "Степик - образовательная платформа",
                        url: "https://stepik.org/catalog",
                        description: "Каталог онлайн-курсов от преподавателей и компаний",
                        free: true
                    }
                ]
            }
        };
    }

    function populateRoadmap(data) {
        try {
            // Проверяем, что data - объект и содержит необходимые поля
            if (!data || typeof data !== 'object') {
                console.error('Неверный формат данных:', data);
                alert('Получены некорректные данные от сервера. Пожалуйста, попробуйте позже.');
                return;
            }
            
            // Заполняем заголовок, используем дефолтные значения если данные отсутствуют
            professionTitle.textContent = data.profession || 'указанной профессии';
            regionTitle.textContent = data.region || 'указанном регионе';
            
            // Отображаем персональные рекомендации, если они есть
            if (data.personalRecommendations && Array.isArray(data.personalRecommendations) && data.personalRecommendations.length > 0) {
                personalRecommendations.innerHTML = '';
                data.personalRecommendations.forEach(recommendation => {
                    const recommendationElement = document.createElement('div');
                    recommendationElement.className = 'recommendation-item no-icon';
                    
                    // Удаляем кавычки в начале и конце текста рекомендации
                    let cleanedText = recommendation;
                    if (typeof cleanedText === 'string') {
                        // Удаляем кавычки в начале строки
                        cleanedText = cleanedText.replace(/^["'"«]/, '');
                        // Удаляем кавычки в конце строки
                        cleanedText = cleanedText.replace(/["'"»]$/, '');
                    }
                    
                    recommendationElement.textContent = cleanedText;
                    personalRecommendations.appendChild(recommendationElement);
                });
                
                // Показываем блок с персональными рекомендациями
                document.getElementById('personal-recommendations-section').style.display = 'block';
            } else {
                // Скрываем блок, если рекомендаций нет
                document.getElementById('personal-recommendations-section').style.display = 'none';
            }
            
            // Заполняем профессиональные навыки
            hardSkillsList.innerHTML = '';
            if (data.hardSkills && Array.isArray(data.hardSkills)) {
                data.hardSkills.forEach(skill => {
                    // Обрабатываем случай, когда skill это объект с полем name или строка
                    let skillText = '';
                    if (typeof skill === 'object' && skill !== null) {
                        skillText = skill.name || skill.description || JSON.stringify(skill);
                    } else {
                        skillText = String(skill);
                    }
                    
                    const li = document.createElement('li');
                    li.textContent = skillText;
                    hardSkillsList.appendChild(li);
                });
            } else {
                // Если hardSkills отсутствует или не является массивом, отображаем заглушку
                const li = document.createElement('li');
                li.textContent = 'Информация о навыках недоступна';
                hardSkillsList.appendChild(li);
                console.error('Ошибка в формате hardSkills:', data.hardSkills);
            }
            
            // Заполняем гибкие навыки
            softSkillsList.innerHTML = '';
            if (data.softSkills && Array.isArray(data.softSkills)) {
                data.softSkills.forEach(skill => {
                    // Обрабатываем случай, когда skill это объект с полем name или строка
                    let skillText = '';
                    if (typeof skill === 'object' && skill !== null) {
                        skillText = skill.name || skill.description || JSON.stringify(skill);
                    } else {
                        skillText = String(skill);
                    }
                    
                    const li = document.createElement('li');
                    li.textContent = skillText;
                    softSkillsList.appendChild(li);
                });
            } else {
                // Если softSkills отсутствует или не является массивом, отображаем заглушку
                const li = document.createElement('li');
                li.textContent = 'Информация о навыках недоступна';
                softSkillsList.appendChild(li);
                console.error('Ошибка в формате softSkills:', data.softSkills);
            }
            
            // Заполняем план обучения
            learningPlan.innerHTML = '';
            if (data.learningPlan && Array.isArray(data.learningPlan)) {
                data.learningPlan.forEach((step, index) => {
                    const stepElement = document.createElement('div');
                    stepElement.className = 'learning-step';
                    
                    // Проверяем, является ли элемент объектом с полями
                    if (typeof step === 'object') {
                        const title = step.название || step.title || step.name || `Шаг ${index + 1}`;
                        const description = step.описание || step.description || '';
                        const duration = step.длительность || step.duration || '';
                        const keyResults = step.ключевые_результаты || step.key_results || [];
                        
                        // Создаем HTML для шага
                        let stepHtml = `
                            <strong class="step-title">${title}</strong>
                            <p>${description}</p>
                        `;
                        
                        if (duration) {
                            stepHtml += `<p><strong>Рекомендуемая продолжительность:</strong> ${duration}</p>`;
                        }
                        
                        if (Array.isArray(keyResults) && keyResults.length > 0) {
                            stepHtml += '<div><strong>Ключевые результаты:</strong><ul>';
                            keyResults.forEach(result => {
                                stepHtml += `<li>${result}</li>`;
                            });
                            stepHtml += '</ul></div>';
                        }
                        
                        // Ищем образовательные ресурсы для этого шага
                        if (data.educationalResources && typeof data.educationalResources === 'object') {
                            const stepResources = [];
                            
                            // Проверяем наличие ресурсов для названия шага
                            if (data.educationalResources[title]) {
                                stepResources.push(...data.educationalResources[title]);
                            }
                            
                            // Проверяем, есть ли ресурсы по общей категории
                            if (data.educationalResources["Общие ресурсы по профессии"]) {
                                if (index === 0) { // Показываем общие ресурсы только на первом шаге
                                    stepResources.push(...data.educationalResources["Общие ресурсы по профессии"]);
                                }
                            }
                            
                            // Если для этого шага есть ресурсы, добавляем их
                            if (stepResources.length > 0) {
                                stepHtml += '<div class="resource-section">';
                                stepHtml += '<h4>Полезные ресурсы для обучения</h4>';
                                stepHtml += '<div class="resource-list">';
                                
                                // Удаляем дубликаты ресурсов по URL
                                const uniqueResources = [];
                                const urls = new Set();
                                stepResources.forEach(resource => {
                                    if (resource.url && !urls.has(resource.url)) {
                                        urls.add(resource.url);
                                        uniqueResources.push(resource);
                                    }
                                });
                                
                                // Ограничиваем максимум 3 ресурса на шаг
                                uniqueResources.slice(0, 3).forEach(resource => {
                                    stepHtml += `
                                        <div class="resource-item">
                                            <span class="resource-title">
                                                <a href="${resource.url}" target="_blank" rel="noopener noreferrer">
                                                    ${resource.title}
                                                </a>
                                                ${resource.free ? '<span class="resource-badge free">Бесплатно</span>' : ''}
                                            </span>
                                            <span class="resource-description">${resource.description || ''}</span>
                                        </div>
                                    `;
                                });
                                
                                stepHtml += '</div></div>';
                            }
                        }
                        
                        stepElement.innerHTML = stepHtml;
                    } else if (typeof step === 'string') {
                        // Если шаг - это просто строка, отображаем её
                        stepElement.innerHTML = `<p>${step}</p>`;
                    }
                    
                    learningPlan.appendChild(stepElement);
                });
            } else {
                // Если learningPlan отсутствует или не является массивом, отображаем заглушку
                learningPlan.innerHTML = '<p>Информация о плане обучения недоступна</p>';
                console.error('Ошибка в формате learningPlan:', data.learningPlan);
            }
            
            // Отображаем секцию с образовательными ресурсами после плана обучения
            if (data.educationalResources) {
                // Фильтруем, чтобы показать только категории, которые не были привязаны к шагам плана
                const remainingCategories = Object.keys(data.educationalResources).filter(category => {
                    return category !== "Общие ресурсы по профессии" && 
                           !data.learningPlan.some(step => 
                               typeof step === 'object' && 
                               (step.title === category || step.название === category || step.name === category)
                           );
                });
                
                if (remainingCategories.length > 0) {
                    // Создаем секцию с дополнительными образовательными ресурсами
                    const resourcesSection = document.createElement('div');
                    resourcesSection.className = 'roadmap-section';
                    
                    let resourcesHtml = '<h4>Дополнительные образовательные ресурсы</h4>';
                    
                    // Создаем табы для переключения между категориями
                    resourcesHtml += '<div class="resource-tabs">';
                    remainingCategories.forEach((category, idx) => {
                        resourcesHtml += `<div class="resource-tab ${idx === 0 ? 'active' : ''}" data-category="${category}">${category}</div>`;
                    });
                    resourcesHtml += '</div>';
                    
                    // Создаем контейнеры для каждой категории ресурсов
                    remainingCategories.forEach((category, idx) => {
                        resourcesHtml += `<div class="resource-section" id="resource-${category.replace(/\s+/g, '-')}" style="${idx === 0 ? '' : 'display: none;'}">`;
                        resourcesHtml += '<div class="resource-list">';
                        
                        // Добавляем ресурсы для этой категории
                        const resources = data.educationalResources[category];
                        resources.forEach(resource => {
                            resourcesHtml += `
                                <div class="resource-item">
                                    <span class="resource-title">
                                        <a href="${resource.url}" target="_blank" rel="noopener noreferrer">
                                            ${resource.title}
                                        </a>
                                        ${resource.free ? '<span class="resource-badge free">Бесплатно</span>' : ''}
                                    </span>
                                    <span class="resource-description">${resource.description || ''}</span>
                                </div>
                            `;
                        });
                        
                        resourcesHtml += '</div></div>';
                    });
                    
                    resourcesSection.innerHTML = resourcesHtml;
                    roadmap.appendChild(resourcesSection);
                    
                    // Добавляем обработчики для табов
                    setTimeout(() => {
                        const tabs = document.querySelectorAll('.resource-tab');
                        tabs.forEach(tab => {
                            tab.addEventListener('click', () => {
                                // Скрываем все секции и деактивируем все табы
                                document.querySelectorAll('.resource-section[id^="resource-"]').forEach(section => {
                                    section.style.display = 'none';
                                });
                                tabs.forEach(t => t.classList.remove('active'));
                                
                                // Показываем выбранную секцию и активируем таб
                                const category = tab.getAttribute('data-category');
                                const sectionId = `resource-${category.replace(/\s+/g, '-')}`;
                                document.getElementById(sectionId).style.display = 'block';
                                tab.classList.add('active');
                            });
                        });
                    }, 100);
                }
            }
            
            // Заполняем информацию о тенденциях будущего
            futureInsightsList.innerHTML = '';
            if (data.futureInsights) {
                // Если futureInsights - строка, преобразуем ее в массив
                const insightsArray = typeof data.futureInsights === 'string' 
                    ? [data.futureInsights] 
                    : Array.isArray(data.futureInsights) 
                        ? data.futureInsights 
                        : ['Информация о тенденциях недоступна'];
                
                insightsArray.forEach(insight => {
                    if (insight && typeof insight === 'string') {
                        const li = document.createElement('li');
                        li.textContent = insight;
                        futureInsightsList.appendChild(li);
                    }
                });
                
                // Если futureInsights пуст, добавляем заглушку
                if (futureInsightsList.children.length === 0) {
                    const li = document.createElement('li');
                    li.textContent = 'Информация о тенденциях недоступна';
                    futureInsightsList.appendChild(li);
                }
            } else {
                const li = document.createElement('li');
                li.textContent = 'Информация о тенденциях недоступна';
                futureInsightsList.appendChild(li);
                console.error('Ошибка в формате futureInsights:', data.futureInsights);
            }
        } catch (error) {
            console.error('Ошибка при заполнении дорожной карты:', error);
            alert('Произошла ошибка при отображении данных. Пожалуйста, попробуйте еще раз.');
        }
    }

    // Автоматически активируем эффект блеска кнопки при загрузке страницы
    const addButtonHighlight = () => {
        generateButton.classList.add('highlight');
        setTimeout(() => {
            generateButton.classList.remove('highlight');
        }, 1000);
    };

    // Запускаем эффект подсветки кнопки при загрузке страницы
    setTimeout(addButtonHighlight, 1000);
}); 