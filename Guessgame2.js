let timer = document.querySelector(".timer");
let questionNo = document.querySelector(".queNo");
let question = document.querySelector(".question");
let showscore = document.querySelector(".showscore");
let score = 0;
let timeleft = 10; 
let questioncounter = 0;
let options = Array.from(document.querySelectorAll(".options button"));
let timerinterval;
let countrynumber;
let correctcapital;

const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", 
    "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", 
    "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", 
    "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", 
    "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", 
    "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", 
    "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", 
    "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", 
    "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", 
    "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", 
    "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", 
    "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", 
    "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", 
    "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", 
    "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama", 
    "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", 
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", 
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", 
    "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", 
    "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", 
    "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", 
    "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

function startTimer() {
    clearInterval(timerinterval); 
    timerinterval = setInterval(() => {
        if (timeleft <= 0) {
            clearInterval(timerinterval); 
            alert("Time's up!"); 
            loadQuestion();
        } else {
            timer.innerHTML = `${timeleft--}s`;
        }
    }, 1000); 
}

function giveRandomint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function loadQuestion() {
    questioncounter++; 
    timeleft = 10; 
    questionNo.innerHTML = `Question ${questioncounter} / 10`;
    showscore.innerHTML = `Score: ${score}`;
    
    countrynumber = giveRandomint(0, countries.length - 1);
    let country = countries[countrynumber];
    await setOptions(countrynumber);
    question.innerHTML = `What is the capital of ${country}?`;
    startTimer(); 
}

async function setOptions(countrynumber) {
    try {
        let taken = new Set();
        let correctopt = giveRandomint(1, 4);
        let fetchCorrectState = await fetch(`https://restcountries.com/v3.1/name/${countries[countrynumber]}`);
        if (!fetchCorrectState.ok) throw new Error("Unable to fetch country data.");
        let correctcountry = await fetchCorrectState.json();
        correctcapital = correctcountry[0].capital ? correctcountry[0].capital[0] : "No Capital";
        
        for (let i = 0; i < options.length; i++) {
            if (i + 1 === correctopt) {
                        options[i].innerHTML = correctcapital;
                    } else {
                        let randomindex;
                        do {
                            randomindex = giveRandomint(0, countries.length - 1);
                        } while (taken.has(randomindex) || randomindex === countrynumber);
                        
                        let fetchOptionState = await fetch(`https://restcountries.com/v3.1/name/${countries[randomindex]}`);
                        if (!fetchOptionState.ok) throw new Error("Unable to fetch option data.");
                        let optionCountry = await fetchOptionState.json();
                        let optionCapital = optionCountry[0].capital ? optionCountry[0].capital[0] : "No Capital";
                        options[i].innerHTML = optionCapital;
                        taken.add(randomindex);
                    }
                }
            } catch (error) {
                console.error("Error setting options:", error);
                alert("An error occurred while loading the options. Please try again.");
            }
        }
        
        options.forEach(option => {
            option.addEventListener("click", () => {
                if (option.innerHTML === correctcapital) {
                    score++;
                }
                if (questioncounter === 10) {
                    alert(`Your final score: ${score}`);
                    score = 0;
                    questioncounter = 0;
                }
                loadQuestion();
    });
});
        
document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
});