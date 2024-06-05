let recognition;
let finalTranscription = ''; // Variável para armazenar a transcrição final

function startRecording() {
    const startRecordBtn = document.getElementById('start-record-btn');
    const stopRecordBtn = document.getElementById('stop-record-btn');
    const langSelect = document.getElementById('lang-select');
    const transcription = document.getElementById('transcription');
    finalTranscription = ''; // Limpar a transcrição final ao iniciar a gravação
    transcription.innerHTML = ''; // Limpar a exibição da transcrição

    // Verificar se o navegador suporta a Web Speech API
    if (!('webkitSpeechRecognition' in window)) {
        alert("Seu navegador não suporta a Web Speech API. Tente usar o Google Chrome.");
        return;
    }

    // console.log("Web Speech API é suportada");

    // Criar uma nova instância do SpeechRecognition
    recognition = new webkitSpeechRecognition();
    recognition.lang = langSelect.value;

    // console.log('Idioma selecionado: ${recognition.lang}');

    recognition.continuous = true; // Continuar reconhecendo mesmo após pausas
    recognition.interimResults = true; // Mostrar resultados intermediários

    // Evento quando a gravação começa
    recognition.onstart = () => {
        // console.log("Gravação iniciada");
        startRecordBtn.disabled = true;
        stopRecordBtn.disabled = false;
        startRecordBtn.textContent = 'Gravando...';
    };

    // Evento quando a gravação termina
    recognition.onend = () => {
        console.log("Gravação terminada");
        startRecordBtn.disabled = false;
        stopRecordBtn.disabled = true;
        startRecordBtn.textContent = 'Iniciar Gravação';
    };

    // Evento para cada resultado reconhecido
    recognition.onresult = (event) => {
        console.log("Resultado recebido", event);
        let interimTranscription = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            
            if (event.results[i].isFinal) {
                finalTranscription += transcript + ' ';
            } else {
                // interimTranscription += transcript;
            }
        }
        transcription.innerHTML = '<p>'+ finalTranscription +'</p>'+
                                    '<p style=color:gray>'+ interimTranscription+'</p>';
    };

    // Evento de erro
    recognition.onerror = (event) => {
        // console.error("Erro de reconhecimento", event);
        alert('Erro de reconhecimento: ' + event.error);
    };

    // Iniciar o reconhecimento de voz
    recognition.start();
    // console.log("Reconhecimento de voz iniciado");
}

function stopRecording() {
    const startRecordBtn = document.getElementById('start-record-btn');
    const stopRecordBtn = document.getElementById('stop-record-btn');

    // Parar o reconhecimento de voz
    if (recognition) {
        recognition.stop();
        console.log("Reconhecimento de voz parado");
    }

    startRecordBtn.disabled = false;
    stopRecordBtn.disabled = true;
    startRecordBtn.textContent = 'Iniciar Gravação';
}
