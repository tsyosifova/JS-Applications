function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const ulElem = document.getElementById('phonebook');
    const personInput = document.getElementById('person');
    const phoneInput = document.getElementById('phone');

    document.getElementById('btnLoad').addEventListener('click', loadPhones);
    document.getElementById('btnCreate').addEventListener('click', createPhone);

    async function loadPhones() {

        try {
            ulElem.replaceChildren();

            const content = await request(url);
           
            for (const curContent of Object.values(content)) {

                const liEl = document.createElement('li');
                ulElem.appendChild(liEl);
                liEl.textContent = `${curContent.person}: ${curContent.phone}`;

                const delBtn = document.createElement('button');
                liEl.appendChild(delBtn);
                delBtn.textContent = 'Delete';

                delBtn.addEventListener('click', async () => {

                    try {
                        let urlDel = `${url}/${curContent._id}`;

                        await request(urlDel, { method: 'DELETE' });
                        liEl.remove();

                    } catch (error) {
                        console.error(error.message);
                    }
                })

            }



        } catch (error) {
            console.error(error.message);
        }

    }

    async function createPhone() {
        const person = personInput.value;
        const phone = phoneInput.value;

        try {
            await request(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ person, phone })
            })

            await loadPhones();

            personInput.value = '';
            phoneInput.value = '';

        } catch (error) {
            console.error(error.message);
        }

    }

    async function request(url, params) {
        const response = await fetch(url, params);

        if (!response.ok) {
            throw new Error("The server is not responding.");
        }

        if (response.status !== 204) {
            return response.json();
        }
    }

}

attachEvents();