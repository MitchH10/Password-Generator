// Assignment Code
var generateBtn = document.querySelector("#generate");
//Object to hold our password criteria to be used in constructing the password
var passwordCriteriaObj = {
  len: 0,
  lowercase: false,
  uppercase: false,
  numeric: false,
  specialchar: false
};
//To log the number of passwords created before a successful password is created
var numberOfTries = 0;

//Password contents to be used in constructing the password
const ALPHABETUP = ["A","B","C","D","E","F","G","H","I","J","K","L","M",
"N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
//Getting lowercase alphabet from uppercase array
const ALPHABETLOW = ALPHABETUP.map(ALPHABETUP => ALPHABETUP.toLowerCase());
const DIGITS = [0,1,2,3,4,5,6,7,8,9];
const SPECIALS = ["!","@","#","$","%","&","(",")"];

// Write password to the #password input
function writePassword() {
  promptPassword();
  console.log("\n\n----------------------------New Password------------------------------------");
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//prompt user for password requirements
function promptPassword() {
  promptLength();
  promptLower();
  promptUpper();
  promptNumeric();
  promptSpecial();
}

//Generation of the password
function generatePassword() {
  console.log("New try: ")
  //increment try counter
  numberOfTries++;
  //no criteria selected error phrase
  var noCriteria = "No password criteria selected, please try again."
  //Variables for array manipulation and final output string
  password = "";
  //Call generatePickerArray
  passwordGeneratedArray = generatePickerArray();
  var passwordArray = [];
  goodPassword = true;
  
  //Check for no criteria selected
  if (passwordGeneratedArray.length == 0) {
    numberOfTries = 0;
    return noCriteria
  }

  //Password array generation loop using key array
  //Equal chance for all characters selected in the criteria at each character in the password
  for (i = 0; i < passwordCriteriaObj.len; i++) {
    passwordArray.push(passwordGeneratedArray[Math.floor(Math.random() * passwordGeneratedArray.length)]);
  }
  console.log("Current password array: ", passwordArray);

  //Checking if constructed password array contains the characters we selected in the criteria
  if (passwordCriteriaObj.lowercase) {
    for (let i = 0; i < ALPHABETLOW.length; i++) {
      if (passwordArray.includes(ALPHABETLOW[i])){
        goodPassword = true;
        break;
      } else {
        goodPassword = false;
      }
    }
    if (!goodPassword){
      console.log("Bad password, is missing a lowercase character.");
    }
  }

  if (passwordCriteriaObj.uppercase && goodPassword == true) {
    for (let i = 0; i < ALPHABETUP.length; i++) {
      if (passwordArray.includes(ALPHABETUP[i])){
        goodPassword = true;
        break;
      } else {
        goodPassword = false;
      }
    }
    if (!goodPassword){
      console.log("Bad password, is missing an uppercase character.");
    }
  }

  if (passwordCriteriaObj.numeric && goodPassword == true) {
    for (let i = 0; i < DIGITS.length; i++){
      if (passwordArray.includes(DIGITS[i])) {
        goodPassword = true;
        break;
      } else {
        goodPassword = false;
      }
    }
    if (!goodPassword){
      console.log("Bad password, is missing a number character.");
    }
  }

  if (passwordCriteriaObj.specialchar && goodPassword == true) {
    for (let i = 0; i < SPECIALS.length; i++) {
      if (passwordArray.includes(SPECIALS[i])){
        goodPassword = true;
        break;
      } else {
        goodPassword = false;
      }
    }
    if (!goodPassword){
      console.log("Bad password, is missing a special character.");
    }
  }

  //Handling password if it meets criteria or not
  console.log("Does current password match criteria: " + goodPassword);
  if (goodPassword){
    //Constructing final password string from password array
    password = passwordArray.join("");
    console.log("Numbers of tries for correct password: " + numberOfTries);
    console.log("Correct password: " + password);
  } else {
    //Generating new password if not all selected criteria is met
    generatePassword();
  }

  //Reset try counter
  numberOfTries = 0;
  //Output password
  return password;
}

//Creation of array full of all the characters that match the criteria given
function generatePickerArray () {
  var passwordGenerateArray = [];

  if (passwordCriteriaObj.lowercase) {
    passwordGenerateArray = passwordGenerateArray.concat(ALPHABETLOW);
  }
  if (passwordCriteriaObj.uppercase) {
    passwordGenerateArray = passwordGenerateArray.concat(ALPHABETUP);
  }
  if (passwordCriteriaObj.numeric) {
    passwordGenerateArray = passwordGenerateArray.concat(DIGITS);
  }
  if (passwordCriteriaObj.specialchar) {
    passwordGenerateArray = passwordGenerateArray.concat(SPECIALS);
  }
  //Handling of no criteria selected case
  if (passwordCriteriaObj.lowercase == false && passwordCriteriaObj.uppercase == false && passwordCriteriaObj.numeric == false && passwordCriteriaObj.specialchar == false){
    console.log("No password criteria.");
    return passwordGenerateArray;
  }
  console.log("Generated password key characters to use: ", passwordGenerateArray);
  return passwordGenerateArray;
}

//Prompt user for the length of password and give error message if user enters something incorrect
function promptLength() {
  let answer = window.prompt("What length of password would you like? (8-128 characters)");
  answer = parseInt(answer);

  //If user input is correct set len property of password criteria object
  if (lenCheck()) {
    passwordCriteriaObj.len = answer;
  } else {
    //If input isn't correct then, notify and ask again
    window.alert("Please enter an integer 8-128.");
    promptLength();
  }

  //Check for correct user input
  function lenCheck() {
    if ((answer >= 8) && (answer <= 128)) {
      return true;
    } else {
      return false;
    }
  }
}

//Ask user for lowercase characters, store in password criteria object
function promptLower() {
  let answer = window.confirm("Hit 'Ok' if you would like Lowercase characters in your password, otherwise hit cancel.");

  passwordCriteriaObj.lowercase = answer;
}

//Ask user for lowercase characters, store in password criteria object
function promptUpper() {
  let answer = window.confirm("Hit 'Ok' if you would like Uppercase characters in your password, otherwise hit cancel.");

  passwordCriteriaObj.uppercase = answer;
}

//Ask user for lowercase characters, store in password criteria object
function promptNumeric() {
  let answer = window.confirm("Hit 'Ok' if you would like Numbers in your password, otherwise hit cancel.");

  passwordCriteriaObj.numeric = answer;
}

//Ask user for lowercase characters, store in password criteria object
function promptSpecial() {
  let answer = window.confirm("Hit 'Ok' if you would like Special Characters in your password, otherwise hit cancel.");

  passwordCriteriaObj.specialchar = answer;
}
