function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.style.backgroundColor = "#ddd";
}

// Abrir a primeira aba por padrão
document.addEventListener("DOMContentLoaded", function() {
    document.getElementsByClassName("tablink")[0].click();

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validateForm(form)) {
                showConfirmationMessage(form);
                form.reset();
            }
        });
    });
});

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        if (!input.value) {
            isValid = false;
            input.style.borderColor = 'red';
            if (!input.nextElementSibling || input.nextElementSibling.className !== 'error') {
                const error = document.createElement('span');
                error.className = 'error';
                error.textContent = 'Campo obrigatório';
                error.style.color = 'red';
                input.parentNode.insertBefore(error, input.nextSibling);
            }
        } else {
            input.style.borderColor = '#ccc';
            if (input.nextElementSibling && input.nextElementSibling.className === 'error') {
                input.nextElementSibling.remove();
            }
        }
    });
    return isValid;
}

function showConfirmationMessage(form) {
    const messageDiv = document.getElementById('mensagem');
    const formType = form.parentElement.querySelector('h2').textContent;
    const numPassageiros = form.querySelector('#num-passageiros').value;
    const precoTotal = calcularPreco(form, numPassageiros);

    messageDiv.textContent = `Reserva de ${formType} realizada com sucesso! Preço total: R$${precoTotal}`;
    messageDiv.style.display = 'block';
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

function updateFlightForm() {
    const tipoVoo = document.getElementById('tipo-voo').value;
    const idaVoltaSection = document.getElementById('ida-volta-section');
    const addDestinoButton = document.querySelector('button[onclick="addDestino()"]');

    if (tipoVoo === 'ida') {
        idaVoltaSection.style.display = 'none';
        addDestinoButton.style.display = 'none';
        document.getElementById('voo-destinos').innerHTML = `
            <div class="voo-destino">
                <label for="origem-voo-1">Origem:</label>
                <input type="text" id="origem-voo-1" name="origem-voo-1">
                <label for="destino-voo-1">Destino:</label>
                <input type="text" id="destino-voo-1" name="destino-voo-1">
                <label for="data-voo-1">Data:</label>
                <input type="date" id="data-voo-1" name="data-voo-1">
            </div>`;
    } else if (tipoVoo === 'ida-volta') {
        idaVoltaSection.style.display = 'block';
        addDestinoButton.style.display = 'none';
        document.getElementById('voo-destinos').innerHTML = `
            <div class="voo-destino">
                <label for="origem-voo-1">Origem:</label>
                <input type="text" id="origem-voo-1" name="origem-voo-1">
                <label for="destino-voo-1">Destino:</label>
                <input type="text" id="destino-voo-1" name="destino-voo-1">
                <label for="data-voo-1">Data:</label>
                <input type="date" id="data-voo-1" name="data-voo-1">
            </div>`;
    } else if (tipoVoo === 'multiplos') {
        idaVoltaSection.style.display = 'none';
        addDestinoButton.style.display = 'block';
        document.getElementById('voo-destinos').innerHTML = `
            <div class="voo-destino">
                <label for="origem-voo-1">Origem:</label>
                <input type="text" id="origem-voo-1" name="origem-voo-1">
                <label for="destino-voo-1">Destino:</label>
                <input type="text" id="destino-voo-1" name="destino-voo-1">
                <label for="data-voo-1">Data:</label>
                <input type="date" id="data-voo-1" name="data-voo-1">
            </div>`;
    }
}

function addDestino() {
    const destinoCount = document.querySelectorAll('.voo-destino').length + 1;
    const newDestino = document.createElement('div');
    newDestino.classList.add('voo-destino');
    newDestino.innerHTML = `
        <label for="origem-voo-${destinoCount}">Origem:</label>
        <input type="text" id="origem-voo-${destinoCount}" name="origem-voo-${destinoCount}">
        <label for="destino-voo-${destinoCount}">Destino:</label>
        <input type="text" id="destino-voo-${destinoCount}" name="destino-voo-${destinoCount}">
        <label for="data-voo-${destinoCount}">Data:</label>
        <input type="date" id="data-voo-${destinoCount}" name="data-voo-${destinoCount}">`;
    document.getElementById('voo-destinos').appendChild(newDestino);
}

function calcularPreco(form, numPassageiros) {
    const tipoVoo = form.querySelector('#tipo-voo').value;
    let precoBase = 0;

    if (tipoVoo === 'ida') {
        precoBase = 200;
    } else if (tipoVoo === 'ida-volta') {
        precoBase = 350;
    } else if (tipoVoo === 'multiplos') {
        const destinos = form.querySelectorAll('.voo-destino').length;
        precoBase = 150 * destinos;
    }

    const precoTotal = precoBase * numPassageiros;
    document.getElementById('preco-total').textContent = `Preço total: R$${precoTotal}`;
    return precoTotal;
}

function voltarMenu() {
    window.location.href = 'index.html'; // Substitua pela URL correta do seu menu principal
}
