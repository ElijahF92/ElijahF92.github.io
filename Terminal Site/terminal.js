document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('command-input');
    const output = document.getElementById('output');

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const command = input.value.trim();
            processCommand(command);
            input.value = '';
        }
    });

    function initializeTerminal() {
        const terminalElement = document.querySelector('.terminal');
        const messageElement = document.createElement('div');
        messageElement.textContent = "type help to see all commands";
        messageElement.style.color = '#00ff00'; // Match the terminal text color
        terminalElement.insertBefore(messageElement, terminalElement.firstChild);
    }

    initializeTerminal();

    function clearTerminal() {
        const terminalElement = document.querySelector('.terminal');
        terminalElement.innerHTML = ''; // Clear the terminal content
        initializeTerminal();
    }
    

    function processCommand(command) {
        let response = '';
        switch (command.toLowerCase()) {
            case 'about':
                response = 'Born and raised in Hong Kong, Elijah Ferrin is an aspiring software developer who combines his technical skills with a love for creative photography. Currently studying at Hong Kong International School, he is the captain of the track and field team and has founded the Surf & Serve club. Elijah also plays bass in a band, blending his musical interests with his active lifestyle. Outside of school, he serves as the Environmental Programs Coordinator for OceanAction, driven by his commitment to protecting and healing coastlines. In his free time, Elijah enjoys surfing, diving into philosophy, reading, and spending time in nature, where he finds inspiration and tranquility.';
                break;
            case 'skills':
                response = 'I have experience developing apps using Swift in Xcode, programming models for webscraping, games and mathmatics using python, and some processing, HTML, CSS and JavaScript. I am also competent in Potoshop and Lightroom.';
                break;
            case 'contact':
                response = `
                    <a href="https://github.com/ElijahF92" target="_blank">Github: ElijahF92</a><br>
                    <a href="https://www.instagram.com/elijah_ferrin/" target="_blank">Instagram: eferrin92</a><br>
                    <a href="https://www.linkedin.com/in/elijah-ferrin-b229b7287/" target="_blank">LinkedIn: Elijah Ferrin</a>
                `;
                break;
            case 'help':
                response = 'Available commands: about, skills, contact, help, clear';
                break;
            case 'clear':
                output.innerHTML = '';
                return;
            default:
                response = `Command not found: ${command}`;
        }
        output.innerHTML += `<div>${command}</div><div>${response}</div>`;
        output.scrollTop = output.scrollHeight;
    }
});
