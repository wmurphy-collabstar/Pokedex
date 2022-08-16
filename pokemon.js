
const body = document.querySelector(".pokemon")


console.log(typeof sessionStorage.getItem("clickedPokemonHeart"))
console.log(typeof sessionStorage.getItem("clickedPokemonI"))

let clickedPokemonHeart = sessionStorage.getItem("clickedPokemonHeart") === "true"
let pokemon = []
let nameId = []
const clickedPokemonI = parseInt(sessionStorage.getItem("clickedPokemonI"))

console.log(clickedPokemonHeart)
console.log(clickedPokemonI)

async function getPokemon() {
    let response = await fetch("https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/")
    let data = await response.json()
    return data;
}

async function getPokemonI(id) {
    let response
    if (id < 10){
        response = await fetch(`https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/00${id}`)
    } else if (id < 100){
        response = await fetch(`https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/0${id}`)
    } else {
        response = await fetch(`https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/${id}`)
    }
    let data = await response.json()
    return data;
}

async function addToFavorites(id){
    let response = await fetch(`https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/${id}/favorite`,
                    {"method": "POST"})
    return response.json()
}

async function removeFromFavorites(id){
    let response = await fetch(`https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/${id}/unfavorite`,
                    {"method": "POST"})
    return response.json()
}

function makePokemonCard (data, isFavorite) {
    body.className = `pokemon`
    body.innerHTML = ``
    if (isFavorite === true){
        body.innerHTML = `
        <img id="big" src="${data.image}">
        <svg class="sound" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="green">
            <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd" />
        </svg>
        <audio hidden>
            <source src="${data.sound}">
        Your browser does not support the audio element.
        </audio>
        <div class="card-big">
            <div id="info-pokemon">
                <div id="stats-pokemon">
                    <h1>${data.name}</h1>
                    <p>${data.types}</p>
                </div>
                <svg class="heart" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="red">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                </svg>
            </div>
            <div class="bar">
                <div id="cp-bar"></div>
                <p>CP:${data.maxCP}</p>
            </div>
            <div class="bar">
                <div id="hp-bar"></div>
                <p>HP:${data.maxHP}</p>
            </div>
            <div class="pokemon-health">
                <div class="weight">
                    <h4>Weight</h4>
                    <p>${data.weight.minimum} - ${data.weight.maximum}</p>
                </div>
                <div class="height">
                    <h4>Height</h4>
                    <p>${data.height.minimum} - ${data.height.maximum}</p>
                </div>
            </div>
        </div>
    `
    } else {
        body.innerHTML = 
        `
        <img id="big" src="${data.image}">
        <svg class="sound" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="green">
            <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd" />
        </svg>
        <audio hidden>
            <source src="${data.sound}">
        Your browser does not support the audio element.
        </audio>
        <div class="card-big">
            <div id="info-pokemon">
                <div id="stats-pokemon">
                    <h1>${data.name}</h1>
                    <p>${data.types}</p>
                </div>
                <svg class="heart" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </div>
            <div class="bar">
                <div id="cp-bar"></div>
                <p>CP:${data.maxCP}</p>
            </div>
            <div class="bar">
                <div id="hp-bar"></div>
                <p>HP:${data.maxHP}</p>
            </div>
            <div class="pokemon-health">
                <div class="weight">
                    <h4>Weight</h4>
                    <p>${data.weight.minimum} - ${data.weight.maximum}</p>
                </div>
                <div class="height">
                    <h4>Height</h4>
                    <p>${data.height.minimum} - ${data.height.maximum}</p>
                </div>
            </div>
        </div>
    `
    }
}

heartIconfilledDiv = document.createElement("div")
heartIconfilledDiv.innerHTML = 
`
<svg class="heart" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="red">
    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
</svg>
`
heartIconFilled = heartIconfilledDiv.querySelector(".heart")

document.addEventListener("click", function (event) {

    if (event.target.className.baseVal === "heart" || event.target.parentElement.className.baseVal === "heart"){

        console.log("Event fired!")



        // heartIcons[i] === heartIconFilled
        if (event.target.parentElement.children[0].isEqualNode(heartIconFilled.children[0])) {
            // heartIcons[i].removeChild(heartIcons[i].lastElementChild)

            if (event.target.parentElement.className.baseVal === "heart"){
                // const infoDiv = event.target.parentElement.parentElement
                removeFromFavorites(pokemon[clickedPokemonI].id).then(function(data){
                     nameId[clickedPokemonI].splice(2, 1, data.isFavorite)
                     
                })
                console.log("Option 1")
                const info = event.target.parentElement.parentElement
                console.log(info)
                console.log(info.lastElementChild)
                info.removeChild(info.lastElementChild)
                const unfilledHeart = `<svg class="heart" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>`
                // heartIcons[i].innerHTML += unfilledHeart
                info.innerHTML += unfilledHeart
                console.log(info)
                console.log("I'm trying")
            }
            else{
                removeFromFavorites(pokemon[clickedPokemonI].id).then(function(data){
                    nameId[clickedPokemonI].splice(2, 1, data.isFavorite)
                    
                })
                console.log("Option 2")
                const info = event.target.parentElement
                console.log(info)
                console.log(info.lastElementChild)
                info.removeChild(info.lastElementChild)
                const unfilledHeart = `<svg class="heart" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>`
                // heartIcons[i].innerHTML += unfilledHeart
                info.innerHTML += unfilledHeart
                console.log(info)
                console.log("I'm trying")
            }
        }else {
            console.log(event.target.className)
            console.log(event.target.parentElement.children[0].isEqualNode(heartIconFilled.children[0]))
            }
            if (event.target.parentElement.className.baseVal === "heart") {
                addToFavorites(pokemon[clickedPokemonI].id).then(function(data){
                    nameId[clickedPokemonI].splice(2, 1, data.isFavorite)
                    
                })
                    
                // heartIcons[i].removeChild(heartIcons[i].lastElementChild)
                console.log("Option 3")
                info = event.target.parentElement.parentElement
                console.log(info)
                console.log(info.lastElementChild)
                info.removeChild(info.lastElementChild)
                const filledHeart  = `<svg class="heart" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="red">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                </svg>`
                // infoEls[i].innerHTML += filledHeart
                info.innerHTML += filledHeart
                console.log(info)
                heartFilled = true
            }
            else {
                addToFavorites(pokemon[clickedPokemonI].id).then(function(data){
                    nameId[clickedPokemonI].splice(2, 1, data.isFavorite)
                })
                    
                // heartIcons[i].removeChild(heartIcons[i].lastElementChild)
                console.log("Option 4")
                info = event.target.parentElement
                console.log(info)
                console.log(info.lastElementChild)
                info.removeChild(info.lastElementChild)
                const filledHeart  = `<svg class="heart" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="red">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                </svg>`
                // infoEls[i].innerHTML += filledHeart
                info.innerHTML += filledHeart
                console.log(info)
                heartFilled = true
                console.log(event.target.parentElement)
            }
        }
}, false)

getPokemon()
.then(function(data){
    pokemon = data["items"]
    console.log(data["items"])
    console.log(pokemon)
    for (let i = 0; i < pokemon.length; i++){
        nameId.push([pokemon[i].name, pokemon[i].id, pokemon[i].isFavorite])
    }
    console.log(nameId)
})
.catch(err => alert(err))


getPokemonI(clickedPokemonI+1)
.then(function (data) {
    if (typeof nameId[clickedPokemonI][2] != undefined){
        nameId[clickedPokemonI][2] = clickedPokemonHeart
                   
        makePokemonCard(data, nameId[clickedPokemonI][2])
        console.log(clickedPokemonHeart)

        soundBtn = document.querySelector("body").children[1]
        console.log(soundBtn)

        soundBtn.addEventListener("click", function (){
            audio = document.querySelector("audio")
            audio.play()
        })
    }
})
.catch(err => body.innerHTML = `Please go back and try loading it again`)
