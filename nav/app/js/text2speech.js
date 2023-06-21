const textarea = document.getElementById('text');
const speakButton = document.getElementById('speak');
const voicesSelect = document.getElementById('voices');
const rateInput = document.getElementById('rate');

let voices = [];

function populateVoices() {
    voices = speechSynthesis.getVoices();
    voices.forEach((voice, i) => {
        let option = document.createElement('option');
        if (voice.lang==="pl-PL") {
            voice.default = true; 
            option.selected = true;
        } else voice.default=false;
        
        option.value = i;
        option.textContent = `${voice.name} (${voice.lang})`;
        voicesSelect.appendChild(option);
        console.log(voice.lang,voice.default)
    });
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);

speakButton.addEventListener('click', () => {
    let text = textarea.value;
    let utterance = new SpeechSynthesisUtterance(text);

    // Get selected voice
    let selectedVoiceIndex = voicesSelect.value;
    utterance.voice = voices[selectedVoiceIndex];

    // Get rate
    utterance.rate = rateInput.value;

    speechSynthesis.speak(utterance);
});
