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

    const table = document.querySelector('.Tavoloprocessi');
    table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Arrive</th>
            <th>Duration</th>
            <th>Priority</th>
            <th>T.T.</th>
            <th>T.W.</th>
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

// Initial call to set the position (in case of initial layout)
updateLeftPosition();