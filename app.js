
//    Cделать таймер обратного отсчёта.
// 1. Таймер должен получать время обратного отсчёта в конструкторе.
// 2. Должен иметь кнопки старт(запускает) и стоп(ставит паузу).
// 3. Должен иметь в конструторе параметр для автоматического запуска(true/false).
// 4. Длина полоски уменьшается с движением таймера.const container = document.querySelector('.container');

class Timer {
    constructor(time, isRunning = false) {
        this.time = time * 60;
        this.currentTime = time * 60;
        this.isRunning = isRunning;
        this.statusBar = false;
        this.setButtonText = this.setButtonText.bind(this);
		this.render();
		if (isRunning){
            this.button.innerText = "Stop";
            this.start();
        }
    }
    //Отрисовываем output
    display() {		
        this.output = document.createElement("div");
        this.output.classList.add("display");
        return this.output;
	}	

    //Отрисовываем progress bar
    Line() {
        this.line = document.createElement("div");
        this.line.classList.add("line");
        return this.line;
    }

    //Отрисовываем button
    Button() {
        this.button = document.createElement("button");
        this.button.classList.add("btn");
        this.button.innerText = "Start";
        this.button.onclick = this.setButtonText;
        return this.button;
    }

    //Отрисовываем элементы на страницу
    render() {
        container.append(this.display());
        container.append(this.Button());
        container.append(this.Line());
    }

    //метод класса запускает таймер
    update() {
        this.timer = setInterval(() => {
            this.currentTime--;
            if (this.status) {
                this.status(this);
            }
            if (this.currentTime <= 0) this.pause();
        }, 1000);
	}

    // метод класса привязывает progress bar к таймеру
    status = (t) => {
        this.output.innerText = t.currentTime;
        const perc = (1 - (t.time - t.currentTime) / t.time) * 100;
        this.line.style.width = perc + '%';
    }

    //метод класса запускает работу таймера при нажатии на кнопку
    start() {
        this.statusBar = true;
        this.update();
    }

    //метод класса завершает работу таймера при нажатии на кнопку
    pause() {
        this.statusBar = false;
        clearInterval(this.timer);
        this.timer = null;
    }

    //метод класса меняет текст на кнопке и запускает таймер
    setButtonText() {
        if (this.statusBar) {
            this.button.innerText = "Start";
            this.pause();
        } else {
            this.button.innerText = "Stop";
            this.start();
        }
    }
}
new Timer(1);
new Timer(3,true);

