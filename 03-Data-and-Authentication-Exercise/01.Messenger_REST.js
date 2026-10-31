function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/messenger';

    const authorInput = document.querySelector('[name="author"]');
    const contentInput = document.querySelector('[name="content"]');

    const messArea = document.querySelector('#messages');

    document.querySelector('#submit').addEventListener('click', sendMessage);
    document.querySelector('#refresh').addEventListener('click', loadMessages);

    async function sendMessage() {
        const author = authorInput.value;
        const content = contentInput.value;

        try {

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ author, content })
            })


            if (!response.ok) {
                throw new Error("Recording failed.");
            }

            authorInput.value = '';
            contentInput.value = '';

        } catch (error) {
            console.error(error.message);
        }

    }

    async function loadMessages() {
        try {

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("The server is not responding.");
            }

            const data = await response.json();

            messArea.value = Object.values(data)
                .map(mess => `${mess.author}: ${mess.content}`)
                .join('\n');

        } catch (error) {
            console.error(error.message);
        }

    }

}

attachEvents();