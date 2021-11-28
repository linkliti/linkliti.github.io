(function () {
	'use strict'; // Не позволять ошибкам работать

	// Cписок вопросов
	var allQuestions = [{
		question: "Имеет ли Меркурий естественные спутники",
		options: ["Имеет", "Не имеет", "Имеет только астероидное поле"],
		answer: 1
	}, {
		question: "Какая планета в солнечной система самая горячая",
		options: ["Марс", "Солнце", "Юпитер", "Венера", "Сатурн"],
		answer: 3
	}, {
		question: "Какая планета самая ближайшая от Земли",
		options: ["Венера", "Меркурий", "Марс", "Юпитер"],
		answer: 2
	}, {
		question: "Сколько длится год на Юпитере по сравнению с Земным годом",
		options: ["12 лет", "8 лет", "24 лет", "15 лет"],
		answer: 0
	}, {
		question: "Какая по очередности Венера от солнца",
		options: ["3", "4", "2", "5"],
		answer: 2
	}, {
		question: "Самая маленькая планета в солнечной системе",
		options: ["Меркурий", "Уран", "Марс", "Нептун"],
		answer: 0
	}, {
		question: "Диаметр планеты Земля",
		options: ["18 тыс км", "10 тыс км", "13 тыс км", "15 тыс км"],
		answer: 2
	}, {
		question: "Год открытие планеты Уран",
		options: ["1684", "1728", "1793", "1781"],
		answer: 3
	}, {
		question: "Какую планету обнаружили последней",
		options: ["Сатурн", "Плутон", "Уран", "Нептун"],
		answer: 0
	}, {
		question: "Самая холодная планета солнечной системы",
		options: ["Нептун", "Уран", "Сатурн", "Марс"],
		answer: 1
	}, {
		question: "Солнце это",
		options: ["Планета", "Звезда", "Спутник", "Астероид", "Квазар", "Центр галактики", "Черная дыра"],
		answer: 1
	}, {
		question: "Форма планеты Земля",
		options: ["Шар", "Геоид", "Плоскость"],
		answer: 1
	}

	];

	// Функция перемешивания массива вопросов
	function shuffle(array) {
		let currentIndex = array.length, randomIndex; // Рассматриваемый индекс
		// Проход по массиву
		while (currentIndex != 0) {
			// Берем случайный индекс...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			// ... и заменяем его с рассматриваемым
			[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
		}
		return array; // Возврат нового массива
	}

	allQuestions = shuffle(allQuestions); // Перемешивание вопросов
	var quesCounter = 0; // Счетчик вопросов
	var selectOptions = []; // Массив ответов
	var quizSpace = $('#quiz'); // Область вопросов
	// var quizSpace = document.querySelector('#quiz');

	nextQuestion(); // Запуск (появление первого вопроса)

	// Кнопка следующего вопроса
	$('#next').click(function () {
		chooseOption();
		// Не выбран ответ
		if (isNaN(selectOptions[quesCounter])) {
			alert('Пожалуйста, выберите ответ');
		}
		else {
			// Увеличиваем счетчик вопросов и переходим к следующему
			quesCounter++;
			nextQuestion();
		}
	});

	// Кнопка предыдущего вопроса
	$('#prev').click(function () {
		chooseOption(); // Показ выбранного ответа в прошлом вопросе
		quesCounter--; // Уменьшаем счетчик вопросов
		nextQuestion(); // Обновление окна вопросов
	});

	// Создание окна с вопросом
	function createElement(index) {
		// Блок вопроса
		var elem = $('<div>', { id: 'question' });
		// Номер вопроса
		var header = $('<h2>Вопрос № ' + (index + 1) + ' из ' + allQuestions.length + ':</h2>');
		elem.append(header); // Добавляем в блок

		// Вопрос
		var question = $('<p>').append(allQuestions[index].question);
		elem.append(question); // Добавляем в блок

		// Варианты ответов
		var radio = selectButtons(index);
		elem.append(radio); // Добавляем в блок

		return elem;
	}

	// Создания списка вариантов ответа для блока
	function selectButtons(index) {
		var selectItems = $('<ul>');
		var item;
		var input = '';
		for (var i = 0; i < allQuestions[index].options.length; i++) {
			item = $('<li>');
			input = '<input type="radio" class="check" name="answer" value=' + i + ' />';
			input += allQuestions[index].options[i];
			item.append(input);
			selectItems.append(item);
		}
		return selectItems;
	}

	// Обновление массива выбранных ответов
	function chooseOption() {
		selectOptions[quesCounter] = + $('input[name="answer"]:checked').val();
	}

	// Смена вопроса
	function nextQuestion() {
		// Отображение всех переходов исчезновением
		quizSpace.fadeOut(function () {
			// Удалить блок со старым вопросом 
			$('#question').remove();
			// Пока есть вопросы
			if (quesCounter < allQuestions.length) {

				// Создание блока вопроса и его появление
				var nextQuestion = createElement(quesCounter);
				quizSpace.append(nextQuestion).fadeIn();

				if (!(isNaN(selectOptions[quesCounter]))) {
					$('input[value=' + selectOptions[quesCounter] + ']').prop('checked', true);
				}
				// Показ кнопки назад как только был совершен переход на второй вопрос
				if (quesCounter == 1) {
					$('#prev').show();
				}
				// Не показывать кнопку Назад на первом вопросе
				else if (quesCounter == 0) {
					$('#prev').hide();
					$('#next').show();
				}
			}
			// Вопросы закончились
			else {
				// Появление результата
				var scoreRslt = displayResult();
				quizSpace.append(scoreRslt).fadeIn();

				// Скрыть кнопки переходов
				$('#next').hide();
				$('#prev').hide();
			}
		});
	}

	// Отображение результата
	function displayResult() {
		var score = $('<p>', { id: 'question' });
		var correct = 0;
		for (var i = 0; i < selectOptions.length; i++) {
			if (selectOptions[i] == allQuestions[i].answer) {
				correct++;
			}
		}
		score.append('Вы набрали ' + correct + ' из ' + allQuestions.length + ' правильных ответов');
		$('#form').fadeIn(); // Показ формы для отправки результата
		return score;
	}
})();