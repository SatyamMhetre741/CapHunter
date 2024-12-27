document.getElementById("startBtn").addEventListener("click", () => {
    const name = document.getElementById("namebar").value.trim();
    if (name === "") {
        alert("Please enter your name before starting!");
    } else {
        alert(`Welcome, ${name}! Let's start! The game starts as soon as you press the ok below`);
        redirect();
    }
});

function redirect(){
    window.location.href = "Guessgame2.html";
}