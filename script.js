modifyed();
let logo = document.getElementById("logo");
let pfpE = document.getElementById("Enrico");
let pfpS = document.getElementById("Salvatore");
let button = document.getElementById("checkbox");
if (Cookies.get('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    logo.src = "images/logos/logo-d.png";
    Cookies.set('theme', 'dark');
    pfpE.src = "images/pfps/Enrico Giuffrida-d.png";
    pfpS.src = "images/pfps/Salvo Lombardo-d.png";
    button.onchange = lightmode;
    button.checked = true;
} else {
    document.body.classList.remove('dark-theme');
    logo.src = "images/logos/logo.png";
    Cookies.set('theme', 'light');
    pfpE.src = "images/pfps/Enrico Giuffrida.png";
    pfpS.src = "images/pfps/Salvo Lombardo.png";
    button.onchange = darkmode;
    button.checked = false;
}
function darkmode() {
    document.body.classList.add('dark-theme');
    logo.src = "images/logos/logo-d.png";
    Cookies.set('theme', 'dark');
    pfpE.src = "images/pfps/Enrico Giuffrida-d.png";
    pfpS.src = "images/pfps/Salvo Lombardo-d.png";
    button.onchange = lightmode;
}
function lightmode() {
    document.body.classList.remove('dark-theme');
    logo.src = "images/logos/logo.png";
    Cookies.set('theme', 'light');
    pfpE.src = "images/pfps/Enrico Giuffrida.png";
    pfpS.src = "images/pfps/Salvo Lombardo.png";
    button.onchange = darkmode;
}


function ShowLegend2() {
    var legend2 = document.querySelector('.Legend2');
    if (legend2.style.display === 'none' || legend2.style.display === '') {
        legend2.style.display = 'block';  
    } else {
        legend2.style.display = 'none'; 
    }
}


function ShowLegend1() {
    var legend1 = document.querySelector('.Legend1');
    
    if (legend1.style.display === 'none' || legend1.style.display === '') {
        legend1.style.display = 'block'; 
    } else {
        legend1.style.display = 'none'; 
    }
}




// Global variables
let clock = 0;
let queue = [];
let processes_data = [];
let time_quantum;
let actual_time = 0;
const temp = [];
let intervallo = null;


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addProcesses() {
    let button = document.getElementById("Center-button");
    button.disabled = false;
    const numeroProcessi = parseInt(document.getElementById("numeroProcessi").value);
    const arrivoMassimo = parseInt(document.getElementById("arrivoMassimo").value);
    const durataMassima = parseInt(document.getElementById("durataMassima").value);
    const prioritaMassima = parseInt(document.getElementById("Priorita").value);
    let processes = [];

    clearInterval(intervallo);
    resetValues();

    for (let i = 0; i < numeroProcessi; i++) {
        const arrive = getRandomInt(0, arrivoMassimo);
        const duration = getRandomInt(1, durataMassima);
        const priority = getRandomInt(0, prioritaMassima);

        processes.push({ name: `P${i}`, arrive, duration, priority });
    }

    processes.sort((a, b) => a.arrive - b.arrive);


    processes.forEach((process, index) => {
        process.name = `P${index}`;
    });
    processes_data = [...processes]; // Save the generated processes

    const table = document.querySelector('.Tavoloprocessi');
    table.innerHTML = `
        <tr id="processi">
            <th class="mod-th"></th>
            <th class="Name">Name</th>
            <th class="Arrive">Arrive</th>
            <th class="Duration">Duration</th>
            <th class="Priority">Priority</th>
            <th class="T.T.">T.T.</th>
            <th class="T.W.">T.W.</th>
        </tr>
    `;


    processes.forEach(process => {
        const newRow = `
            <tr id="${process.name}">
                <td class="mod-td">
                    <button class="modify" onclick="modifyProcess('${process.name}')" id="modify${process.name}")>
                        <i name="icons" class="fa-solid fa-pen"></i>
                    </button>
                </td>
                <td>${process.name}</td>
                <td id="arrivo${process.name}">${process.arrive}</td>
                <td id="durata${process.name}">${process.duration}</td>
                <td id="priorita${process.name}">${process.priority}</td>
                <td id="ttt${process.name}"></td>
                <td id="twt${process.name}"></td>
            </tr>
        `;
        table.innerHTML += newRow;
    });

    const styleSheet = document.styleSheets[0]; 

    processes.forEach(process => {
        const rule = `#FormS .container3 tr[id="${process.name}"]:hover .modify { opacity: 1; }`;
        styleSheet.insertRule(rule, styleSheet.cssRules.length);
    });
}

function modifyed() {
    let algoritmoSelezionato = document.getElementById("Tipodialgoritmo").value;
    let preemtive = document.getElementById("check-24 preemtive");
    let preemtiveLabel = document.getElementById("preemtive-label");

    let quantum = document.getElementById("quantodiTempo");
    let quantumLabel = document.getElementById("quantodiTempo-label");

    let prioritaMassima = document.getElementById("Priorita");
    let prioritaLabel = document.getElementById("Priorita-label");

    let preemtiveStyle = document.getElementById("sphere")
    let preemtiveStyle1 = document.getElementById("check")

    if (algoritmoSelezionato === "SRTF") {
        quantumLabel.style.display = "none";
        quantum.style.display = "none";

        prioritaLabel.style.display = "none";
        prioritaMassima.style.display = "none";

        preemtiveLabel.style.display = "block";
        preemtive.style.display = "block";

        preemtiveStyle.style.opacity= "100%";
        preemtiveStyle1.style.opacity= "100%";
        preemtiveStyle.style.transition= " 0.2s linear";
        preemtiveStyle1.style.transition= "opacity 0.2s linear";


    } else if (algoritmoSelezionato === "round robin") {
        preemtiveLabel.style.display = "none";
        preemtive.style.display = "none";
        quantumLabel.style.display = "block";
        quantum.style.display = "block";
        prioritaLabel.style.display = "none";
        prioritaMassima.style.display = "none";

        preemtiveStyle.style.opacity= "0";
        preemtiveStyle1.style.opacity= "0";
        preemtiveStyle.style.transition= "none";
        preemtiveStyle1.style.transition= "none";

    } else if (algoritmoSelezionato === "priorita") {
        preemtiveLabel.style.display = "block";
        preemtive.style.display = "block";
        quantumLabel.style.display = "none";
        quantum.style.display = "none";
        prioritaLabel.style.display = "block";
        prioritaMassima.style.display = "block";

        preemtiveStyle.style.opacity= "100%";
        preemtiveStyle1.style.opacity= "100%";
        preemtiveStyle.style.transition= " 0.2s linear";
        preemtiveStyle1.style.transition= "opacity 0.2s linear";

    } else if (algoritmoSelezionato === "FCFS") {
        preemtiveLabel.style.display = "none";
        preemtive.style.display = "none";
        quantumLabel.style.display = "none";
        quantum.style.display = "none";
        prioritaLabel.style.display = "none";
        prioritaMassima.style.display = "none";

        preemtiveStyle.style.opacity= "0";
        preemtiveStyle1.style.opacity= "0";
        preemtiveStyle.style.transition= "none";
        preemtiveStyle1.style.transition= "none";
    }
}

function modifyProcess(processoo) {
    clearInterval(intervallo);
    for (let i = 0; i < processes_data.length; i++) {
        if (processes_data[i].name === processoo) { 
            let arrivo = processes_data[i].arrive;
            let durata = processes_data[i].duration;
            let priorita = processes_data[i].priority;
            let arrivoInput = document.getElementById(`arrivo${processoo}`);
            let durataInput = document.getElementById(`durata${processoo}`);
            let prioritaInput = document.getElementById(`priorita${processoo}`);
            arrivoInput.innerHTML = `<input type='number' id='arrivoInput${processoo}' class='inputt' value='${arrivo}'>`;
            durataInput.innerHTML = `<input type='number' id='durataInput${processoo}' class='inputt' value='${durata}'>`;
            prioritaInput.innerHTML = `<input type='number' id='prioritaInput${processoo}' class='inputt' value='${priorita}'>`;

            let buttonn = document.getElementById(`modify${processoo}`);

            buttonn.innerHTML = `<i style="font-size: 18px;"class="fa-solid fa-circle-check"></i>`;
            buttonn.onclick = () => saveProcess(processoo, i);

            let button = document.getElementById("Center-button");
            button.onclick = null;

        }
    }
}

function saveProcess(processoo, i) {
    let arrivo = document.getElementById(`arrivoInput${processoo}`).value;
    let durata = document.getElementById(`durataInput${processoo}`).value;
    let priorita = document.getElementById(`prioritaInput${processoo}`).value;
    let buttonn = document.getElementById(`modify${processoo}`);

    if (arrivo >= 0 && durata >= 0 && priorita >= 0) {
        processes_data[i].arrive = arrivo;
        processes_data[i].duration = durata;
        processes_data[i].priority = priorita;
        let arrivoInput = document.getElementById(`arrivo${processoo}`);
        let durataInput = document.getElementById(`durata${processoo}`);
        let prioritaInput = document.getElementById(`priorita${processoo}`);
        arrivoInput.innerHTML = arrivo;
        durataInput.innerHTML = durata;
        prioritaInput.innerHTML = priorita;
        buttonn.innerHTML = `<i class="fa-solid fa-pen"></i>`;
        buttonn.onclick = () => modifyProcess(processoo);
        let button = document.getElementById("Center-button");
        button.onclick = startSimulation;
    } else return;
}

function startSimulation() {
    let button = document.getElementById("Center-button");
    button.innerHTML = `<i class="fa-solid fa-stop"></i>`;
    button.style.backgroundColor = "rgb(255, 82, 82)";
    button.onclick = stopSimulation;
    let table = document.querySelector('.Tavoloprocessi');
    if (table.innerHTML === "") {
        return;
    }
    let algoritmoSelezionato = document.getElementById("Tipodialgoritmo").value;
    time_quantum = parseInt(document.getElementById("quantodiTempo").value);
    clock = document.getElementById("Clockspeed").value;
    queue = [...processes_data];
    let min = 0;
    for (let i = 0; i < queue.length; i++) {
        if (queue[i].arrive < min) {
            min = queue[i].arrive;
        }
        let modify = document.getElementById(`modify${queue[i].name}`);
        modify.style.display = "none";
    }
    while (min > actual_time) {
        actual_time++;
    }
    refreshCoda();
    if (algoritmoSelezionato === "round robin") {
        intervallo = setInterval(roundRobin, clock);
    } else if (algoritmoSelezionato === "FCFS") {
        intervallo = setInterval(FCFS, clock);
    } else if (algoritmoSelezionato === "priorita") {
        intervallo = setInterval(priority, clock);
    } else if (algoritmoSelezionato === "SRTF") {
        intervallo = setInterval(SRTF, clock);
    }
}

function deleteSimulation() {
    clearInterval(intervallo);
    let table = document.querySelector('.Tavoloprocessi');
    table.innerHTML = "";
    resetValues();
    let button = document.getElementById("Center-button");
    button.disabled = true;
    button.style.backgroundColor = "rgba(150, 150, 150, 1)";
}

function stopSimulation() {
    clearInterval(intervallo);
    let button = document.getElementById("Center-button");
    button.onclick = restartSimulation;
    button.innerHTML = `<i class="fa-solid fa-play"></i>`;
    button.style.backgroundColor = "rgba(209, 0, 0, 0.96)";
}

function restartSimulation() {
    let button = document.getElementById("Center-button");
    button.innerHTML = `<i class="fa-solid fa-stop"></i>`;
    button.style.backgroundColor = "rgb(255, 82, 82)";
    button.onclick = stopSimulation;
    let algoritmoSelezionato = document.getElementById("Tipodialgoritmo").value;
    time_quantum = parseInt(document.getElementById("quantodiTempo").value);
    clock = document.getElementById("Clockspeed").value;
    refreshCoda();
    if (algoritmoSelezionato === "round robin") {
        intervallo = setInterval(roundRobin, clock);
    } else if (algoritmoSelezionato === "FCFS") {
        intervallo = setInterval(FCFS, clock);
    } else if (algoritmoSelezionato === "priorita") {
        intervallo = setInterval(priority, clock);
    } else if (algoritmoSelezionato === "SRTF") {
        intervallo = setInterval(SRTF, clock);
    }
}

function resetValues() {
    actual_time = 0;
    queue = [];
    processes_data = [];
    temp.length = 0;
    refreshCoda();
    let button = document.getElementById("Center-button");
    button.onclick = startSimulation;
    button.innerHTML = `<i class="fa-solid fa-play"></i>`;
    button.style.backgroundColor = "rgba(209, 0, 0, 0.96)";
}

function tttw(currentProcess) {
    console.log("Tempo attuale: " + actual_time + " Arrivo: " + currentProcess.arrive + " Durata: " + currentProcess.temp);
    let tt = actual_time - currentProcess.arrive;
    let tw = tt - currentProcess.temp;
    let riga = document.getElementById(`ttt${currentProcess.name}`);
    riga.innerHTML = tt;
    let riga2 = document.getElementById(`twt${currentProcess.name}`);
    riga2.innerHTML = tw;
    console.log("Actual time: " + actual_time + "Arrive: " + currentProcess.arrive + "TT: " + tt + " TW: " + tw);
    tt = 0;
    tw = 0;
}

function refreshCoda() {
    const coda = document.getElementById("Coda");
    const cells = temp.map(process => `<td>${process.name}</td>`).join('');
    const table = `<table><tr>${cells}</tr></table>`;
    coda.innerHTML = coda.innerHTML.split('</span>')[0] + '</span>' + table;
}



function roundRobin() {
    for (let i = 0; i < queue.length; i++) {
        if (queue[i].arrive <= actual_time) {
            console.log("Aggiunto " + queue[i].name + " alla coda temporanea");
            queue[i].temp = queue[i].duration;
            temp.push(queue[i]);
            queue.splice(i, 1);
            i--;
        }
    }
    refreshCoda();
    if (temp.length > 0) {
        const currentProcess = temp.shift();
        const executionTime = Math.min(time_quantum, currentProcess.duration);
        console.log(`Tempo: ${actual_time}, Esecuzione di ${currentProcess.name} per ${executionTime} unità di tempo.`);
        for (let i = 0; i < executionTime; i++) {
            addColumn(currentProcess);
            actual_time++;
        }
        if (currentProcess.duration > 0 && currentProcess.duration > executionTime) {
            currentProcess.duration -= executionTime;
            temp.push(currentProcess);
        } else {
            console.log(`${currentProcess.name} completato al tempo ${actual_time}.`);
            addEnd(currentProcess);
            tttw(currentProcess);
        }
    } else if (queue.length > 0) {
        actual_time++;
    } else {
        console.log("Simulazione completata.");
        clearInterval(intervallo);
        resetValues();
    }
}

function FCFS() {
    for (let i = 0; i < queue.length; i++) {
        if (queue[i].arrive <= actual_time) {
            console.log("Aggiunto " + queue[i].name + " alla coda temporanea");
            queue[i].temp = queue[i].duration;
            temp.push(queue[i]);
            queue.splice(i, 1);
            i--;
        }
    }
    temp.sort((a, b) => a.arrive - b.arrive);
    refreshCoda();
    if (temp.length > 0) {
        const currentProcess = temp.shift();
        const executionTime = currentProcess.duration;
        console.log(`Tempo: ${actual_time}, Esecuzione di ${currentProcess.name} per ${executionTime} unità di tempo.`);
        for (let i = 0; i < executionTime; i++) {
            addColumn(currentProcess);
            actual_time++;
        }
        console.log(`${currentProcess.name} completato al tempo ${actual_time}.`);
        addEnd(currentProcess);
        tttw(currentProcess);
    } else if (queue.length > 0) {
        actual_time++;
    } else {
        console.log("Simulazione completata.");
        clearInterval(intervallo);
        resetValues();
    }
}

function priority() {
    for (let i = 0; i < queue.length; i++) {
        if (queue[i].arrive <= actual_time) {
            console.log("Aggiunto " + queue[i].name + " alla coda temporanea");
            queue[i].temp = queue[i].duration;
            temp.push(queue[i]);
            queue.splice(i, 1);
            i--;
        }
    }
    temp.sort((a, b) => b.priority - a.priority);
    refreshCoda();
    if (temp.length > 0) {
        const currentProcess = temp.shift();
        let executionTime = 0;
        let preemtive = document.getElementById("check-24 preemtive").checked;
        if (preemtive && currentProcess.duration > 0) {
            executionTime = 1;
        } else {
            executionTime = currentProcess.duration;
        }
        console.log(`Tempo: ${actual_time}, Esecuzione di ${currentProcess.name} per ${executionTime} unità di tempo.`);
        for (let i = 0; i < executionTime; i++) {
            addColumn(currentProcess);
            actual_time++;
        }
        if (preemtive && currentProcess.duration > 0) {
            currentProcess.duration -= executionTime;
            temp.push(currentProcess);
        } else {
            console.log(`${currentProcess.name} completato al tempo ${actual_time}.`);
            addEnd(currentProcess);
            tttw(currentProcess);
        }
    } else if (queue.length > 0) {
        actual_time++;
    } else {
        console.log("Simulazione completata.");
        clearInterval(intervallo);
        resetValues();
    }
}

function SRTF() {
    for (let i = 0; i < queue.length; i++) {
        if (queue[i].arrive <= actual_time) {
            console.log("Aggiunto " + queue[i].name + " alla coda temporanea");
            queue[i].temp = queue[i].duration;
            temp.push(queue[i]);
            queue.splice(i, 1);
            i--;
        }
    }
    temp.sort((a, b) => a.duration - b.duration);
    refreshCoda();
    if (temp.length > 0) {
        const currentProcess = temp.shift();
        let preemtive = document.getElementById("check-24 preemtive").checked;
        let executionTime;
        if (preemtive && currentProcess.duration > 0) {
            executionTime = 1;
        } else {
            executionTime = currentProcess.duration;
        }
        console.log(`Tempo: ${actual_time}, Esecuzione di ${currentProcess.name} per ${executionTime} unità di tempo.`);
        for (let i = 0; i < executionTime; i++) {
            addColumn(currentProcess);
            actual_time++;
        }
        if (preemtive && currentProcess.duration > 0) {
            currentProcess.duration -= executionTime;
            temp.push(currentProcess);
        } else {
            console.log(`${currentProcess.name} completato al tempo ${actual_time}.`);
            addEnd(currentProcess);
            tttw(currentProcess);
        }
        } else if (queue.length > 0) {
        actual_time++;
    } else {
        console.log("Simulazione completata.");
        clearInterval(intervallo);
        resetValues();
    }
}
function addColumn(process) {
    const intestazione = document.getElementById('processi');
    intestazione.innerHTML += `
        <th>${actual_time}</th>
    `;
    for (let i = 0; i < processes_data.length; i++) {
        let actualProcess = processes_data[i];
        let actualLine = document.getElementById(actualProcess.name);
        if (actualProcess.name === process.name) {
            actualLine.innerHTML +=
                `<td class="colored-tile" id="${actualProcess.name}-${actual_time}"></td>`
            ;
        } else {
            actualLine.innerHTML += `<td id="${actualProcess.name}-${actual_time}"></td>`;
        }
        if (actualProcess.arrive <= actual_time) {
            addStart(actualProcess);
        }
    }
}

function addStart(process) {
    let riga = document.getElementById(`${process.name}-${process.arrive}`);
    riga.style.borderLeft = "3px solid var(--initialbords-color)";
}

function addEnd(process) {
    let riga = document.getElementById(`${process.name}-${actual_time-1}`);
    riga.innerHTML = "F";
    riga.style.textAlign = "right";
}

