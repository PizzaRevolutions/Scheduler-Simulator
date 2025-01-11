# Scheduler Simulator

This project is a simple web-based CPU scheduling algorithm simulator. It allows you to experiment with different scheduling algorithms and visualize how processes are managed.

## Features

*   **Process Creation:** Define the number of processes to simulate, along with parameters like maximum arrival time, maximum duration, and maximum priority.
*   **Scheduling Algorithms:** Choose from various CPU scheduling algorithms (Round Robin, FCFS, Priority and SRTF).
*   **Process Queue Visualization:**  View a table of generated processes with their arrival time, duration, and priority.
*   **Simulation Control:** Start and stop the simulation to observe the scheduling process in action.
*   **Performance Metrics:** The simulator calculates and displays the Turnaround Time (T.T.) and Waiting Time (T.W.) for each process.

## How to Use

1. **Input Parameters:**  Specify the desired parameters for the simulation, such as the number of processes, maximum arrival and duration, quantum, clock speed, and maximum priority.
2. **Select Algorithm:** Choose the desired scheduling algorithm from the dropdown menu.
3. **Create Processes:** Click the "Create processes" button to generate a set of simulated processes based on your input parameters.
4. **Start Simulation:** Press the "Start simulation" button to begin the scheduling simulation. The simulator will process the queue based on the selected algorithm.
5. **Observe Results:**  Watch the calculated Turnaround Time and Waiting Time for each process as the simulation progresses.
6. **Stop Simulation:** Click the "Stop simulation" button to halt the simulation.

## Potential Future Enhancements

*   Implementation of more scheduling algorithms (FCFS, SJF, Priority Scheduling, etc.).
*   Visual representation of the scheduling timeline (Gantt chart).
*   More detailed simulation statistics and analysis.
*   User interface improvements and customization options.
