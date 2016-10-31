(function() {

    var pausa = true;
    var miFuente;
    var AudioContexto = window.AudioContext || window.webkitAudioContext;
    var contextoDeAudio;

    escucharmicro();

    function escucharmicro() {
        if (pausa) {
            contextoDeAudio = new AudioContexto();
             //Cambiar estadomic
            console.log("entra");
            entradaMic({
                audio: true
            }, al_aire);
            pausa = false;
        }
        else {
            miFuente.disconnect();
            contextoDeAudio.close();
            //Estado del botón de entrada de mic
            console.log("sale");
            //Vengo del silencio-> borro texto en marco
            //pulsaElBotonReproducir();
            pausa = true;
        }
    }

    function error() {
        alert('Falló la generación de la cadena de Audio. Safari no soporta getUserMedia aún....');
    }

    function entradaMic(medio, llamada) {
        try {
            navigator.getUserMedia =
                navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia;
            navigator.getUserMedia(medio, llamada, error);
            // Older browsers might not implement mediaDevices at all, so we set an empty object first
            if (navigator.mediaDevices === undefined) {
                navigator.mediaDevices = {};
            }

        }
        catch (e) {
            console.log('Nos aparece algún error en la toma de entrada de micrófono... :' + e);
        }
    }

    function al_aire(entrada) {
        //analyser.fftSize = 2048;
        var fuente = contextoDeAudio.createMediaStreamSource(entrada);
        // crea analizador
        contextoDeAudio.analyser = contextoDeAudio.createAnalyser();
        contextoDeAudio.analyser.fftSize = 2048;
        //cadenaDeAudio(fuente);
        fuente.connect(contextoDeAudio.analyser);
        //aun falta crear dibujar espectro
        //requestAnimationFrame(dibujaEspectro.bind(this));
        miFuente = fuente;
    }

})();
