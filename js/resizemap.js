class ImageResize {
	//Конструктор конфигурации для работы с несколькими картами
	constructor(config) {
		const { width, height, element } = config;
		// Обработка параметров
		this.imageW = width;
		this.imageH = height;
		this.imageMap = document.querySelector(element);

		const mapId = this.imageMap.getAttribute('usemap');
		const mapElem = `map[name="${mapId.substring(1, mapId.length)}"]`;
		// Сохранение всех зон в массив areaArray
		const area = document.querySelector(mapElem).children;
		this.areaArray = Array.from(area);

		// Вызов функции при смене размера окна
		window.addEventListener('resize', this.imgMap);
		setTimeout(this.imgMap, 500);
	}

	imgMap = () => {
		// Новые ширина/высота карты разделенные на 100
		this.wPercent = this.imageMap.offsetWidth / 100;
		this.hPercent = this.imageMap.offsetHeight / 100;
		// Для каждой зоны
		this.areaArray.forEach(this.areaLoop);
	};
	// Обработчик зон
	areaLoop = (area) => {
		// Получение старых координат
		const coordinates = this.getCoordinates(area).split(',');
		// Получение новых координат
		const coordsPercent = coordinates.map(this.mapCoords).join();
		// Установка координат
		area.setAttribute('coords', coordsPercent);
	};
	// Получение координат зоны
	getCoordinates = (elem) => {
		let areaCords = elem.dataset.coords;
		if (!areaCords) {
			areaCords = elem.getAttribute('coords');
			elem.dataset.coords = areaCords;
		}
		return areaCords;
	};
	// Создание новых координат
	mapCoords = (coordinate, index) => {
		const parseCord = parseInt(coordinate, 10);

		return index % 2 === 0
			? this.coordinatesMath(parseCord, this.imageW, this.wPercent)
			: this.coordinatesMath(parseCord, this.imageH, this.hPercent);
	};
	/**
	 * Математическая функция для создания новых координат
	 * @coordinates - Изначальные координаты
	 * @imgVal - Ширина/Высота
	 * @percentVal - Новые ширина/высота карты разделенные на 100
	 */
	coordinatesMath = (coordinates, imgVal, percentVal) =>
		(coordinates / imgVal) * 100 * (percentVal);

}
const resizeImg = new ImageResize({
	width: 2048,
	height: 1133,
	element: '#solarimg'
})