
function startGame() {
    // Dölj startskärmen och startknappen
    document.getElementById("title").style.display = "none";
    document.getElementById("statScreen").style.display = "none";

    // Visa spelgränssnittet
    document.getElementById("sceneContainer").style.display = "flex";

    // Ändra bakgrund för första scenen och visa texten
    changeBackground('story'); // Ändra till första scenens bakgrundsbild

    // Definiera texten för första scenen
    const storyText = `A young man wakes up in a dark cave, alone and disoriented. The only thing he remembers is a mysterious map hidden in his pocket, showing the way to a legendary treasure, the lost ark.`;
    
    // Börja med typningseffekten för första scenen
    typeText(storyText, () => {
        setTimeout(() => showWhisperOptions(), 500); // Visa whisper options efter typning är klar
    });
}

function showScene(scene) {
    const content = document.getElementById("content");
    const options = document.getElementById("options");

    content.innerHTML = ""; // Rensa tidigare innehåll
    options.innerHTML = ""; // Rensa tidigare knappar

    // Byt bakgrund beroende på scen
    changeBackground(scene);

    // Definiera texten baserat på scenen
    let sceneText = "";

    switch (scene) {
        case "story":
            sceneText = `A young man wakes up in a dark cave, alone and disoriented. The only thing he remembers is a mysterious map hidden in his pocket, showing the way to a legendary treasure, the lost ark.`;
            typeText(sceneText, () => {
                setTimeout(() => showWhisperOptions(), 500);
            });
            break;
        case "explore":
            sceneText = `Following the whisper, he discovers an old sage who gives him a clue to the treasure. The Old Sage: "The wilderness is unforgiving. Learn to read the signs, and you'll find your way"`;
            typeText(sceneText, () => {
                content.innerHTML += `
                    <div class="button-container">
                        <button onclick="listenToTheOldMan()">Listen</button>
                        <button onclick="showScene('story')">Continue</button>
                    </div>
                `;
            });
            break;
        case "ignore":
            sceneText = `The character ignores the whisper and on his way he finds a mysterious message on a wall, giving him a clue about the journey ahead.`;
            typeText(sceneText, () => {
                content.innerHTML += `
                    <div class="button-container">
                        <button onclick="exploreText()">Read The Scripture</button>
                        <button onclick="showScene('story')">Continue</button>
                    </div>
                `;
            });
            break;
    }
}

function typeText(text, callback) {
    const storyTextElement = document.getElementById("content");
    storyTextElement.textContent = "";
    storyTextElement.style.display = "block"; // Se till att texten syns

    let letterIndex = 0;
    const typingSpeed = 5; // Typningshastigheten

    function type() {
        if (letterIndex < text.length) {
            storyTextElement.textContent += text[letterIndex];
            letterIndex++;
            setTimeout(type, typingSpeed);
        } else {
            // När texten är färdig, anropa callback för att hantera nästa steg
            if (callback) callback();
        }
    }

    type();
}


function showWhisperOptions() {
    const options = document.getElementById("options");
    options.innerHTML = `
        <p class="whisperText fade-in">...A strange whisper is heard...</p>
        <button onclick="selectPath('explore')" class="fade-in">EXPLORE</button>
        <button onclick="selectPath('ignore')" class="fade-in">IGNORE</button>
    `;

    // Lägg till 'show' klassen med en kort fördröjning för att trigga fade-in effekten
    const buttons = document.querySelectorAll('.fade-in');
    buttons.forEach((button, index) => {
        setTimeout(() => {
            button.classList.add('show');
        }, 200 * (index + 1)); // Kort fördröjning mellan knapparna för extra effekt
    });
}

function selectPath(choice) {
    let confirmation;

    if (choice === "explore") {
        confirmation = confirm("Are you sure you want to explore the whisper?");
    } else if (choice === "ignore") {
        confirmation = confirm("Are you sure you want to ignore the whisper?");
    }

    // Om användaren bekräftar sitt val, visa scenen
    if (confirmation) {
        showPopupMessage("Path chosen!"); // Visa en popup med meddelandet om det valda alternativet

        // Hantera valet och byt scen baserat på det
        switch (choice) {
            case "explore":
                showScene("explore");
                break;
            case "ignore":
                showScene("ignore");
                break;
        }
    } else {
        // Om användaren avbryter, gör ingenting eller visa ett meddelande
        showPopupMessage("Action canceled.");
    }
}


function changeBackground(scene) {
    const body = document.body;

    // Här definierar vi bakgrundsbilder för varje scen
    switch (scene) {
        case "story":
            body.style.backgroundImage = "url('images_audio/youngMan.webp')";
            break;
        case "explore":
            body.style.backgroundImage = "url('images_audio/oldSage.png')";
            break;
        case "ignore":
            body.style.backgroundImage = "url('images_audio/textOnTheWall.webp')";
            break;
        default:
            body.style.backgroundImage = "url('images_audio/cave.webp')";
            break;
    }

    // Lägg till övergång för bakgrundsbilden så att den smidigt ändras
    body.style.transition = "background-image 1s ease-in-out";
}

function showPopupMessage(message) {
    const popup = document.getElementById("popupMessage");
    popup.innerText = message;
    popup.style.display = "block";

    // Popup-animation
    setTimeout(() => {
        popup.style.opacity = "1";
        popup.style.transform = "translate(-50%, -50%) scale(1)";
    }, 10);

    // Dölj popupen efter 3 sekunder
    setTimeout(() => {
        popup.style.opacity = "0";
        popup.style.transform = "translate(-50%, -50%) scale(0.9)";
        setTimeout(() => {
            popup.style.display = "none";
        }, 500);
    }, 3000);
}

function listenToTheOldMan() {
    const audio = new Audio('wiseManSaid.mp3');
    audio.play();
}

function exploreText() {
    const content = document.getElementById("content");
    const options = document.getElementById("options");

    content.innerHTML = `
        <p>[When the shadows dance on the wall like dead butterflies, and the stars form a cross in the north,
            seek beneath the roots of the lonely tree.]</p>
        `;
    options.innerHTML = `
        <button onclick="showScene('ignore')">Back</button>
    `;
}
