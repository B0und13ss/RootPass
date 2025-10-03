const slider = document.getElementById("slider");
const lenEl = document.getElementById("length");
const numParam = document.getElementById("number");
const speParam = document.getElementById("special");
const outPass = document.getElementById("password");
const copyBtn = document.getElementById("copy");
const genBtn = document.getElementById("gen");

const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const special = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];

function getRandomChar(array) {
    let randomNumber = getRandom(0, array.length);
    return array[randomNumber];
}

function getRandom(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function generate() {
    let numCount = parseInt(numParam.value);
    let speCount = parseInt(speParam.value);
    let len = lenEl.textContent;
    let replacedIndx = [];
    console.log(`Password length: ${len}`);
    console.log(`Number count: ${numCount}`);
    console.log(`Specials count: ${speCount}`);
    console.log(`Params sum: ${numCount + speCount}`);
    if (numCount + speCount > len) {
        alert("Password is too short for your parameters");
        return 1;
    }
    let password = [];

    for (let i = 0; i < len; i++) {
        let char = getRandomChar(letters);
        password.push(char);
    }

    for (let i = 0; i < numCount; i++) {
        let randIdx = getRandom(0, password.length);
        console.log(`Random index = ${randIdx}`);
        let randNum = getRandomChar(numbers);
        console.log(`Random number = ${randNum}`);
        if (replacedIndx.includes(randIdx)) {
            i--;
            console.log("DUPLICATE");
            continue;
        }
        replacedIndx.push(randIdx);
        password[randIdx] = randNum;
    }

    for (let i = 0; i < speCount; i++) {
        let randIdx = getRandom(0, password.length);
        console.log(`Random index = ${randIdx}`);
        let randNum = getRandomChar(special);
        console.log(`Random number = ${randNum}`);
        if (replacedIndx.includes(randIdx)) {
            i--;
            console.log("DUPLICATE");
            continue;
        }
        replacedIndx.push(randIdx);
        password[randIdx] = randNum;
    }

    let strPass = password.join('')
    console.log(strPass);
    outPass.textContent = strPass;
}

copyBtn.addEventListener("click", () => {
    const el = document.createElement('textarea');// Create a <textarea> element
  el.value = outPass.textContent;                 // Set its value to the string that you want copied
  el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
  el.style.position = 'absolute';                 
  el.style.left = '-9999px';                      // Move outside the screen to make it invisible
  document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
  const selected =            
    document.getSelection().rangeCount > 0        // Check if there is any content selected previously
      ? document.getSelection().getRangeAt(0)     // Store selection if found
      : false;                                    // Mark as false to know no selection existed before
  el.select();                                    // Select the <textarea> content
  document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
  document.body.removeChild(el);                  // Remove the <textarea> element
  if (selected) {                                 // If a selection existed before copying
    document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
    document.getSelection().addRange(selected);   // Restore the original selection
  }
});

genBtn.addEventListener("click", generate);

slider.addEventListener("mousemove", (e) => {
    let len = slider.value;
    lenEl.textContent = len;
});
