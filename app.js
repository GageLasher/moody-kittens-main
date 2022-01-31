let kittens = []
let mood = ""
let affection = 5
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let isValid = true
  let typedName = form.elements['kittenName'].value;
  kittens.forEach((v, i) => {
    if (v.name === typedName) {
      isValid = false
      return alert('You already have a kitten named that')
    }
  }) 
  if (isValid === true) {
    let kitten = {name: typedName, mood: "tolerant", affection: 5, id: generateId() }
    kittens.push(kitten)
    saveKittens()
    form.reset()
    drawKittens()
  }  
}



/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
  if (kittensData) {
    kittens = kittensData
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
loadKittens()
let kittenElem = document.getElementById('kittens')
let kittenTemplate = ""
kittens.forEach((kitten, i) => {
    kittenTemplate += `
    <div class="kitten ${kitten.mood}">
    <div class='card'>
  <div> Name: ${kitten.name}</div>
    <img class="kitten" src="https://robohash.org/${kitten.name}?set=set4" alt"">
    <div>Kitten Mood: ${kitten.mood}</div>
    <div>Affection: ${kitten.affection}</div>
    <button onclick="pet('${kitten.id}')"> Pet Kitten </button>
    <button onclick="catnip('${kitten.id}')"> Cat Nip </button>
    </div>
    </div>
    `
    
  })
  loadKittens()
  
  kittenElem.innerHTML = kittenTemplate
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
  
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  
  let cat = findKittenById(id)
  let randomNumber = Math.random()
  if (randomNumber > .5) {cat.affection++;
    setKittenMood(cat)
    saveKittens()
  }
  else{
cat.affection--;
setKittenMood(cat)
saveKittens()
  }
  
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let currentKitten = findKittenById(id)
  currentKitten.mood = "tolerant"
  currentKitten.affection = 5
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  document.getElementById("kittens").classList.remove(kitten.mood)

if(kitten.affection >= 6){kitten.mood = "happy"}
if(kitten.affection <= 5){kitten.mood = "tolerant"}
if(kitten.affection <= 3){kitten.mood = "sad"}
if(kitten.affection <= 0){kitten.mood = "gone"}

  document.getElementById("kittens").classList.add(kitten.mood)
  saveKittens()
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  kittens.splice(0,kittens.length)
  saveKittens()
  
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("deletebtn").innerHTML = '<button onclick="clearKittens()">Delete all Kittens</button>';
  console.log('Good Luck, Take it away')
  drawKittens()
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
