//Darkmode
document.addEventListener('DOMContentLoaded', function () {
        const themeCheckbox = document.getElementById('checkbox');
        const body = document.body;

        let logo = document.getElementById("logo")
        let pfpE = document.getElementById("Enrico")
        let pfpS = document.getElementById("Salvatore")


        themeCheckbox.addEventListener('change', function () {
            if (this.checked) {
                body.classList.add('dark-theme');
                logo.src = "images/logos/logo-d.png";
                pfpE.src = "images/pfps/Enrico Giuffrida-d.png";
                pfpS.src = "images/pfps/Salvo Lombardo-d.png";

            } else {
                body.classList.remove('dark-theme');
                logo.src = "images/logos/logo.png";
                pfpE.src = "images/pfps/Enrico Giuffrida.png";
                pfpS.src = "images/pfps/Salvo Lombardo.png";
            }
        });
    });





// Global variables
let clock = 0;
let queue = [];
let processes_data = [];
let time_quantum;
let actual_time = 0;
const temp = [];
let first_time = true;
let intervallo = null;


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addProcesses() {
    const numeroProcessi = parseInt(document.getElementById("numeroProcessi").value);
    const arrivoMassimo = parseInt(document.getElementById("arrivoMassimo").value);
    const durataMassima = parseInt(document.getElementById("durataMassima").value);
    const prioritaMassima = parseInt(document.getElementById("Priorita").value);
    const algoritmoSelezionato = document.getElementById("Tipodialgoritmo").value;

    let processes = [];

    for (let i = 0; i < numeroProcessi; i++) {
        const arrive = getRandomInt(1, arrivoMassimo);
        const duration = getRandomInt(1, durataMassima);
        const priority = getRandomInt(1, prioritaMassima);

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
                <td>${process.name}</td>
                <td>${process.arrive}</td>
                <td>${process.duration}</td>
                <td>${process.priority}</td>
                <td></td>
                <td></td>
            </tr>
        `;
        table.innerHTML += newRow;
    });

    // Recalculate and update the left position
    updateLeftPosition();
}

// Function to update the left position of 'elemento3'
function updateLeftPosition() {
    const elemento1 = document.querySelector('.container');
    const elemento2 = document.querySelector('.Processi');
    const elemento3 = document.querySelector('.Tabella');

    const larghezza1 = elemento1.offsetWidth;
    const larghezza2 = elemento2.offsetWidth;
    const sommaLarghezze = larghezza1 + larghezza2;

    elemento3.style.left = sommaLarghezze + 'px';
}

function startSimulation() {
    let algoritmoSelezionato = document.getElementById("Tipodialgoritmo").value;
    time_quantum = parseInt(document.getElementById("quantodiTempo").value);
    clock = document.getElementById("Clockspeed").value;
    queue = [...processes_data];
    while (queue[0].arrive > actual_time){
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

function stopSimulation() {
    clearInterval(intervallo);
}

function refreshCoda() {
    const coda = document.getElementById("Coda");
    coda.innerHTML = temp.map(process => process.name).join(', ');
}
function roundRobin() {
    if (queue.length > 0) {
        const currentProcess = queue.shift();
        if (currentProcess.arrive > actual_time) {
            actual_time = currentProcess.arrive;
        }
        const executionTime = Math.min(time_quantum, currentProcess.duration);

        console.log(`Tempo: ${actual_time}, Esecuzione di ${currentProcess.name} per ${executionTime} unità di tempo.`);

        currentProcess.duration -= executionTime;
        actual_time += executionTime;
        for (let i = 0; i < executionTime; i++) {
            addColumn(currentProcess);
        }

        if (currentProcess.duration > 0) {
            queue.push(currentProcess); // Rimetti il processo in coda se non è finito
        } else {
            console.log(`${currentProcess.name} completato al tempo ${actual_time}.`);
            // Qui puoi aggiungere la logica per rimuovere il processo dalla visualizzazione
        }
    } else {
        console.log("Simulazione completata.");
        clearInterval(intervallo);
    }
    refreshCoda();
}

function FCFS() {
    if (queue.length > 0) {
        const currentProcess = queue.shift();
        if (currentProcess.arrive > actual_time) {
            actual_time = currentProcess.arrive;
        }
        const executionTime = currentProcess.duration;
        console.log(`Tempo: ${actual_time}, Esecuzione di ${currentProcess.name} per ${executionTime} unità di tempo.`);
        actual_time += executionTime;
        for (let i = 0; i < executionTime; i++) {
            addColumn(currentProcess);
        }
        console.log(`${currentProcess.name} completato al tempo ${actual_time}.`);
    } else {
        console.log("Simulazione completata.");
        clearInterval(intervallo);
    }
    refreshCoda();
}

function priority() {
    for (let i=0; i < queue.length; i++){
        if (queue[i].arrive <= actual_time){
            console.log("Aggiunto " + queue[i].name + " alla coda temporanea");
            temp.push(queue[i]);
            queue.splice(i, 1);
            i--;
        }
    }
    temp.sort((a, b) => b.priority - a.priority);
    refreshCoda();
    if (temp.length > 0) {
        if (first_time) {
            actual_time--;
            first_time = false;
        }
        const currentProcess = temp.shift();
        const executionTime = currentProcess.duration;
        console.log(`Tempo: ${actual_time}, Esecuzione di ${currentProcess.name} per ${executionTime} unità di tempo.`);
        actual_time += executionTime;
        for (let i = 0; i < executionTime; i++) {
            addColumn(currentProcess);
        }
        console.log(`${currentProcess.name} completato al tempo ${actual_time}.`);
    } else if (queue.length > 0) {
        actual_time++;
    }
}

function SRTF() {
    for (let i=0; i < queue.length; i++){
        if (queue[i].arrive <= actual_time){
            console.log("Aggiunto " + queue[i].name + " alla coda temporanea");
            temp.push(queue[i]);
            queue.splice(i, 1);
            i--;
        }
    }
    temp.sort((a, b) => a.duration - b.duration);
    refreshCoda();
    if (temp.length > 0) {
        if (first_time) {
            actual_time--;
            first_time = false;
        }
        const currentProcess = temp.shift();
        const executionTime = currentProcess.duration;
        console.log(`Tempo: ${actual_time}, Esecuzione di ${currentProcess.name} per ${executionTime} unità di tempo.`);
        actual_time += executionTime;
        for (let i = 0; i < executionTime; i++) {
            addColumn(currentProcess);
        }
        console.log(`${currentProcess.name} completato al tempo ${actual_time}.`);
    } else if (queue.length > 0) {
        actual_time++;
    }
}

function addColumn(process) {
    const intestazione = document.getElementById('processi');
    const riga = document.getElementById(`${process.name}`)
    intestazione.innerHTML += `
        <th>${process.name}</th>
    `;
    for (let i = 0; i < processes_data.length; i++) {
        let rigaAttuale = processes_data[i];
        let rigaAttual = document.getElementById(rigaAttuale.name);
        if (rigaAttual.name === process.name) {
            // Non entra mai qui -_-
            rigaAttual.innerHTML += `
                <td>boh</td>
            `;
        } else {
            rigaAttual.innerHTML += `<td></td>`;
        }
    }
    // Da fare: aggiornare la tabella con il processo che sta in esecuzione
    updateLeftPosition();
}

// Initial call to set the position (in case of initial layout)
updateLeftPosition();