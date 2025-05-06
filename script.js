function aggiornaTesto() {
    const nomeDestinatario = document.getElementById('nomeDestinatario').value;
    const saluto = document.querySelector('input[name="saluto"]:checked')?.value || '';
    const argomentoPost = document.getElementById('argomentoPost').value;
    const links = [];

    for (let i = 1; i <= 10; i++) {
        const link = document.getElementById(`link${i}`).value;
        if (link) links.push(link);
    }

    let outputText = `${saluto} ${nomeDestinatario},\n`; // Solo un a capo dopo la virgola
    outputText += `ti confermo che siamo online sui nostri canali social con i post dedicati all'argomento «${argomentoPost}».\n\n`; // Due a capo dopo l'argomento
    outputText += `I link dei post sono i seguenti:\n`;

    links.forEach(link => {
        let canaleSocial = '';
        if (link.startsWith('https://linkedin.com/') || link.startsWith('https://www.linkedin.com/')) {
            canaleSocial = 'Linkedin';
        } else if (link.startsWith('https://x.com/') || link.startsWith('https://twitter.com/')) {
            canaleSocial = 'X (Twitter)';
        } else if (link.startsWith('https://www.facebook.com/')) {
            canaleSocial = 'Facebook';
        } else if (link.startsWith('https://youtu.be/')) {
            canaleSocial = 'Youtube';
        } else if (link.startsWith('https://www.instagram.com/') || link.startsWith('https://instagram.com/')) {
            canaleSocial = 'Instagram';
        }
        outputText += `${canaleSocial}: ${link}\n`;
    });

    outputText += `\nUn saluto,\nFabio.`;

    document.getElementById('outputText').value = outputText;
}

function salvaDati() {
    const nomeDestinatario = document.getElementById('nomeDestinatario').value;
    const saluto = document.querySelector('input[name="saluto"]:checked')?.value || '';
    const argomentoPost = document.getElementById('argomentoPost').value;
    const links = [];

    for (let i = 1; i <= 10; i++) {
        const link = document.getElementById(`link${i}`).value;
        if (link) links.push(link);
    }

    const data = {
        nomeDestinatario,
        saluto,
        argomentoPost,
        links
    };

    localStorage.setItem('emailData', JSON.stringify(data));
    document.getElementById('salvaButton').textContent = 'Salva (Dati salvati!)';
    setTimeout(() => {
        document.getElementById('salvaButton').textContent = 'Salva';
    }, 2000);
}

function cancellaDati() {
    document.getElementById('nomeDestinatario').value = '';
    document.querySelectorAll('input[name="saluto"]').forEach(checkbox => checkbox.checked = false);
    document.getElementById('argomentoPost').value = '';
    for (let i = 1; i <= 10; i++) {
        document.getElementById(`link${i}`).value = '';
    }
    document.getElementById('outputText').value = '';
    document.getElementById('cancellaButton').textContent = 'Cancella (Dati cancellati!)';
    setTimeout(() => {
        document.getElementById('cancellaButton').textContent = 'Cancella';
    }, 2000);
}

function copiaTesto() {
    const outputText = document.getElementById('outputText').value;
    navigator.clipboard.writeText(outputText).then(() => {
        document.getElementById('copiaButton').textContent = 'Copia (Testo copiato!)';
        setTimeout(() => {
            document.getElementById('copiaButton').textContent = 'Copia';
        }, 2000);
    });
}

function inviaEmail() {
    const outputText = document.getElementById('outputText').value;
    const mailtoLink = `mailto:?subject=Post Social&body=${encodeURIComponent(outputText)}`;
    window.location.href = mailtoLink;
}

// Aggiorna il testo in tempo reale
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', aggiornaTesto);
});

// Carica i dati salvati al caricamento della pagina
window.onload = function() {
    const savedData = localStorage.getItem('emailData');
    if (savedData) {
        const data = JSON.parse(savedData);
        document.getElementById('nomeDestinatario').value = data.nomeDestinatario;
        document.querySelector(`input[name="saluto"][value="${data.saluto}"]`).checked = true;
        document.getElementById('argomentoPost').value = data.argomentoPost;
        data.links.forEach((link, index) => {
            document.getElementById(`link${index + 1}`).value = link;
        });
        aggiornaTesto();
    }
};