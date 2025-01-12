let coda = [];

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

    processes_data = [...processes]; // Salva i dati dei processi generati

    const table = document.querySelector('.Tavoloprocessi');
    table.innerHTML = `
        <tr>
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
            <tr>
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

let clock = 0;
let queue = [];
let processes_data = [];
let time_quantum;

function startSimulation() {
    const algoritmoSelezionato = document.getElementById("Tipodialgoritmo").value;
    if (algoritmoSelezionato === "round robin") {
        time_quantum = parseInt(document.getElementById("quantodiTempo").value);
        if (isNaN(time_quantum) || time_quantum <= 0) {
            alert("Inserisci un quanto di tempo valido per Round Robin.");
            return;
        }
        clock = 0;
        queue = [...processes_data]; // Copia l'array di processi
        setInterval(simulaRoundRobin, 1000); // Esegui simulaRoundRobin ogni secondo
    } else {
        alert("La simulazione è implementata solo per Round Robin.");
    }
}

function simulaRoundRobin() {
    if (queue.length > 0) {
        const currentProcess = queue.shift();
        const executionTime = Math.min(time_quantum, currentProcess.duration);

        console.log(`Tempo: ${clock}, Esecuzione di ${currentProcess.name} per ${executionTime} unità di tempo.`);

        currentProcess.duration -= executionTime;
        clock += executionTime;

        if (currentProcess.duration > 0) {
            queue.push(currentProcess); // Rimetti il processo in coda se non è finito
        } else {
            console.log(`${currentProcess.name} completato al tempo ${clock}.`);
            // Qui puoi aggiungere la logica per rimuovere il processo dalla visualizzazione
        }
    } else {
        console.log("Simulazione completata.");
        clearInterval(simulaRoundRobin); // Ferma l'intervallo
    }
}

function simula() {
    // simula il processo
}
// Initial call to set the position (in case of initial layout)
updateLeftPosition();