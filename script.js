//darkmode
document.addEventListener('DOMContentLoaded', function () {
        const themeCheckbox = document.getElementById('checkbox');
        const body = document.body;

        let logo = document.getElementById("logo")

        themeCheckbox.addEventListener('change', function () {
            if (this.checked) {
                body.classList.add('dark-theme');
                logo.src = "logo-d.png";
            } else {
                body.classList.remove('dark-theme');
                logo.src = "logo.png";
            }
        });
    });





// Global variables
let clock = 0;
let queue = [];
let processes_data = [];
let time_quantum;
let actual_time = 0;


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addProcesses() {
    const numeroProcessi = parseInt(document.getElementById("numeroProcessi").value);
    const arrivoMassimo = parseInt(document.getElementById("arrivoMassimo").value);
    const durataMassima = parseInt(document.getElementById("durataMassima").value);
    const prioritaMassima = parseInt(document.getElementById("Priorita").value);

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
    refreshCoda();
    if (algoritmoSelezionato === "round robin") {
        setInterval(roundRobin, clock);
    } else if (algoritmoSelezionato === "FCFS") {
        setInterval(FCFS, clock);
    } else {
        alert("La simulazione è implementata solo per Round Robin e FCFS, al momento.");
    }
}

function refreshCoda() {
    const coda = document.getElementById("Coda");
    coda.innerHTML = queue.map(process => process.name).join(', ');
}
function roundRobin() {
    if (queue.length > 0) {
        const currentProcess = queue.shift();
        if (currentProcess.arrive > actual_time) {
            actual_time = currentProcess.arrive;
        }
        const executionTime = Math.min(time_quantum, currentProcess.duration);

        console.log(`Tempo: ${clock}, Esecuzione di ${currentProcess.name} per ${executionTime} unità di tempo.`);

        currentProcess.duration -= executionTime;
        actual_time += executionTime;
        aggiornaTabella(currentProcess, executionTime);

        if (currentProcess.duration > 0) {
            queue.push(currentProcess); // Rimetti il processo in coda se non è finito
        } else {
            console.log(`${currentProcess.name} completato al tempo ${actual_time}.`);
            // Qui puoi aggiungere la logica per rimuovere il processo dalla visualizzazione
        }
    } else {
        console.log("Simulazione completata.");
        clearInterval(roundRobin); // Ferma l'intervallo
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
        console.log(`Tempo: ${clock}, Esecuzione di ${currentProcess.name} per ${executionTime} unità di tempo.`);
        actual_time += executionTime;
        aggiornaTabella(currentProcess, executionTime);
        console.log(`${currentProcess.name} completato al tempo ${actual_time}.`);
    } else {
        console.log("Simulazione completata.");
        clearInterval(FCFS); // Ferma l'intervallo
    }
    refreshCoda();
}

function aggiornaTabella(process, executionTime) {
    const intestazione = document.getElementById('processi');
    const processii = document.getElementById(process.name);
    for (let i = 0; i < executionTime; i++) {
        intestazione.innerHTML += `
            <th>${process.name}</th>
        `;
        // Da fare: aggiornare la tabella con il processo che sta in esecuzione
    }
    updateLeftPosition();
}

// Initial call to set the position (in case of initial layout)
updateLeftPosition();