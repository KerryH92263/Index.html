// Function to play the audio file //

function playSound() {
    // Grab the audio element by its ID 
    const audio = document.getElementById('spaceAudio'); 
    // Attempt to play the audio (returns a Promise in moder browswer)
    audio.play().catch(err => {
        console.error('Playback failed. A user gesture may be required: ', err); 
        alert('If audio did not start, click the page once and press the button again.');

    })
}