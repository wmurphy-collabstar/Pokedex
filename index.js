const allBtn = document.getElementById("all")
const favoritesBtn = document.getElementById("favorites")
const listIcon = document.getElementById("list")
const gridIcon = document.getElementById("grid")
const mainEl = document.querySelector("main")
const infoEls = document.getElementsByClassName("info")


let allBtnClicked = true
let favoritesBtnClicked = false
let listClicked = false
let gridClicked = true
let favoritedCards = []

//List each pokemon's name, id and isFavorite status
let nameId = []
//Index of pokemon clicked on for more information
let clickedPokemonI = 0
sessionStorage.setItem("clickedPokemonI", 0)
//Variable that stores if clicked pokemon is favorited or not
let clickedPokemonHeart = false
sessionStorage.setItem("clickedPokemonHeart", false)
//List each pokemon object
let pokemon = ""

// Gets the list of types of pokemon
async function getTypes() {
    let response = await fetch("https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon-types/")
    let data = await response.json()
    return data;
}

// Gets a specific pokemon by its id
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

// Gets a list of all pokemon
async function getPokemon() {
    let response = await fetch("https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/")
    let data = await response.json()
    return data;
}

// Adds a specific pokemon to favorites
async function addToFavorites(id){
    let response = await fetch(`https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/${id}/favorite`,
                    {"method": "POST"})
    return response.json()
}

// removes a specific pokemon from favorites
async function removeFromFavorites(id){
    let response = await fetch(`https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/${id}/unfavorite`,
                    {"method": "POST"})
    return response.json()
}

// a subfunction that makes a card for a pokemon based on view preference
function makeCard (view, i) {
    card = document.createElement("div")
        card.className = `card ${view}`
        card.innerHTML = `
        <a href="#">
            <img src=${pokemon[i]["image"]}>
        </a>    
        <div class="info">
            <a href="#">
                <div class="stats">
                    <p><span class="bold">${pokemon[i]["name"]}</span></p>
                    <p>${pokemon[i]["types"]}</p>
                </div>
            </a>
            <svg class="heart" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        </div>
        `
}

// Adds types as options to the select bar
getTypes().then(function(data) {
    TypeOptions = document.querySelector("#type")
    for (let i=0; i< data.length; i++){
        TypeOptions.innerHTML += `
        <option value="${data[i]}">${data[i]}</option>
        `
    }
})

// Create an example of a filled heart HTML icon
heartIconfilledDiv = document.createElement("div")
heartIconfilledDiv.innerHTML = 
`
<svg class="heart" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="red">
    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
</svg>
`
heartIconFilled = heartIconfilledDiv.querySelector(".heart")

// List all the pokemon on the main page and adds heart icon functionality
getPokemon().then(function(data){
    pokemon = data["items"]

    //Creates card for every pokemon and stores name, id, and isFavorite value in nameId for each pokemon
    for (let i = 0; i< pokemon.length; i++){
        makeCard("grid", i)
        mainEl.appendChild(card)
        mainEl.style.flexDirection = "row"
        mainEl.style.flexWrap = "wrap"
        nameId.push([pokemon[i].name, pokemon[i].id, pokemon[i].isFavorite])
        console.log(nameId)

        if (i === parseInt(sessionStorage.getItem("clickedPokemonI"))){
            nameId[i].splice(2, 1, sessionStorage.getItem("clickedPokemonHeart") === "true")
        }
    }

    //Event listener that listens for clicking on heart icon
    document.addEventListener("click", function (event) {

        //Checks to see if the item clicked is the heart icon
        if (event.target.className.baseVal === "heart" || event.target.parentElement.className.baseVal === "heart"){

            // Checks if the heart icon is filled
            if (event.target.parentElement.children[0].isEqualNode(heartIconFilled.children[0])) {

                //redundant if statement that would be hard to change, but checks if item is heart
                if (event.target.parentElement.className.baseVal === "heart"){
                    const infoDiv = event.target.parentElement.parentElement
                    // name of pokemon card clicked on
                    pName = infoDiv.firstElementChild.firstElementChild.firstElementChild
                    console.log(pName)

                    //Marks that this pokemon is removed from Favorites
                    for (let i=0; i< nameId.length; i++){
                        if (nameId[i][0] === pName) {
                            pId = nameId[i][1]
                            console.log(pId)
                            removeFromFavorites(pId).then(function(data){
                                nameId[i].splice(2, 1, data.isFavorite)
                            })
                        }
                    }
                    console.log("Option 1")
                    // Replaces filled heart with unfilled heart icon
                    info = event.target.parentElement.parentElement
                    console.log(info)
                    console.log(info.lastElementChild)
                    info.removeChild(info.lastElementChild)
                    const unfilledHeart = `<svg class="heart" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>`
                    info.innerHTML += unfilledHeart
                    console.log(info)
                    console.log("I'm trying")
                    //Removes pokemon card if in Favorites tab
                    if (favoritesBtnClicked){
                        mainEl.removeChild(info.parentElement)
                    }
                }
                else{
                    //Checks if item is heart
                    const infoDiv = event.target.parentElement
                    pName = infoDiv.firstElementChild.firstElementChild.firstElementChild
                    console.log(pName)
                    //Marks that this pokemon is removed from Favorites
                    for (let i=0; i< nameId.length; i++){
                        if (nameId[i][0] === pName) {
                            pId = nameId[i][1]
                            removeFromFavorites(pId).then(function(data){
                                nameId[i].splice(2, 1, data.isFavorite)
                            })
                        }
                    }
                    console.log("Option 2")
                    // Replaces filled heart with unfilled heart icon
                    info = event.target.parentElement
                    console.log(info)
                    console.log(info.lastElementChild)
                    info.removeChild(info.lastElementChild)
                    const unfilledHeart = `<svg class="heart" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>`
                    info.innerHTML += unfilledHeart
                    console.log(info)
                    console.log("I'm trying")
                    //Removes pokemon card if in Favorites tab
                    if (favoritesBtnClicked){
                        mainEl.removeChild(info.parentElement)
                    }
                }
            }else {
                console.log(event.target.className)
                console.log(event.target.parentElement.children[0].isEqualNode(heartIconFilled.children[0]))
                }

                //Checks if item is heart
                if (event.target.parentElement.className.baseVal === "heart") {
                    const infoDiv = event.target.parentElement.parentElement
                    span = infoDiv.firstElementChild.firstElementChild.firstElementChild
                    pName = span.textContent
                    console.log(pName)
                    //Marks that this pokemon is added to Favorites
                    for (let i=0; i< nameId.length; i++){
                        if (nameId[i][0] === pName) {
                            pId = nameId[i][1]
                            addToFavorites(pId).then(function(data){
                                nameId[i].splice(2, 1, data.isFavorite)
                            })
                        }
                    }
                    console.log("Option 3")
                    // Replaces unfilled heart with filled heart icon
                    info = event.target.parentElement.parentElement
                    console.log(info)
                    console.log(info.lastElementChild)
                    info.removeChild(info.lastElementChild)
                    const filledHeart  = `<svg class="heart" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="red">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                    </svg>`
                    info.innerHTML += filledHeart
                    console.log(info)
                }
                else {
                    //Checks if item is heart
                    const infoDiv = event.target.parentElement
                    span = infoDiv.firstElementChild.firstElementChild.firstElementChild
                    pName = span.textContent
                    console.log(pName)

                    //Marks that this pokemon is added to Favorites
                    for (let i=0; i< nameId.length; i++){
                        console.log(i)
                        console.log(nameId[i])
                        console.log(pName)
                        console.log(nameId[i][0] === pName)
                        console.log(nameId)
                        if (nameId[i][0] === pName) {
                            pId = nameId[i][1]
                            addToFavorites(pId).then(function(data){
                                nameId[i].splice(2, 1, data.isFavorite)
                            })
                        }
                    }
                    console.log("Option 4")
                    // Replaces unfilled heart with filled heart icon
                    info = event.target.parentElement
                    console.log(info)
                    console.log(info.lastElementChild)
                    info.removeChild(info.lastElementChild)
                    const filledHeart  = `<svg class="heart" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="red">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                    </svg>`
                    info.innerHTML += filledHeart
                    console.log(info)
                    console.log(event.target.parentElement)
                }
            }
    }, false)    
})

allBtn.addEventListener("click", function () {
    //Changes style when All button is clicked
    if (favoritesBtnClicked === true) {
        allBtn.style.backgroundColor = "green";
        allBtn.style.color = "white"
        favoritesBtn.style.backgroundColor = "white";
        favoritesBtn.style.color = "green"
        favoritesBtnClicked = false
        allBtnClicked = true
        console.log("Did it!")
    }

    // Creates card display for each pokemon, and marks which ones are Favorited
    for (let i = 0; i< pokemon.length; i++){
        card = document.createElement("div")
        if (listClicked === true){
            makeCard("list", i)
        }else {
            makeCard("grid", i)
        }
        for(let i=0; i< favoritedCards.length; i++){
            if (card.querySelector("span").innerHTML === favoritedCards[i].querySelector("span").innerHTML){
                card = favoritedCards[i]
            }
        }

        mainEl.appendChild(card)
        console.log(card)
        mainEl.style.flexDirection = "row"
        mainEl.style.flexWrap = "wrap"
        nameId.push([pokemon[i].name, pokemon[i].id, pokemon[i].isFavorite])
        console.log(nameId)
    }


})

//Runs when the Favorites button is clicked
favoritesBtn.addEventListener("click", function () {
    const hearts = document.querySelectorAll(".heart")
    //Changes style when Favorites button is clicked
    if (allBtnClicked === true) {
        favoritesBtn.style.backgroundColor = "green"
        favoritesBtn.style.color = "white"
        allBtn.style.backgroundColor = "white"
        allBtn.style.color = "green"
        favoritesBtnClicked = true
        allBtnClicked = false
        console.log("Did it too!")
    }

    //Makes sure to only show Favorited cards here
    const cardsF = document.querySelectorAll(".card")
    console.log(cardsF)
    mainEl.innerHTML = ``
    for (let i=0; i< hearts.length; i++){
        if (hearts[i].children[0].isEqualNode(heartIconFilled.children[0])){
            mainEl.appendChild(cardsF[i])
            favoritedCards.push(cardsF[i])

        }
    }
})


//Changes the view from Grid to List - has some issues
listIcon.addEventListener("click", function () {
    let divs = mainEl.querySelectorAll(".card")
    for (let i=0; i<divs.length; i++){
        divs[i].className = "card list"
    }
    mainEl.style.flexDirection = "column"
    mainEl.style.flexWrap = "nowrap"
    listClicked = true
    gridClicked = false
})

//Changes the view from List to Grid - has some issues
gridIcon.addEventListener("click", function () {
    let divs = mainEl.querySelectorAll(".card")
    for (let i=0; i<divs.length; i++){
        divs[i].className = "card grid"
    }
    mainEl.style.flexDirection = "row"
    mainEl.style.flexWrap = "wrap"
    listClicked = false
    gridClicked = true
})

//Listens for typing at the Search bar
document.addEventListener("keyup", function(event){
    input = document.querySelector("input")
    text = input.value
    console.log(text)
    console.log(nameId[0][0])
    mainEl.innerHTML = ``
    //Only listens if not on Favorites tab - didn't add functionality there
    //Also cards lose hearts when searched for
    if (favoritesBtnClicked === false) {
        for (let i=0; i< nameId.length; i++){
            console.log(nameId[i][0])
            if (nameId[i][0].toLowerCase().includes(text.toLowerCase()) && listClicked === true){
                makeCard("list", i)
                mainEl.appendChild(card)
                mainEl.style.flexDirection = "row"
                mainEl.style.flexWrap = "wrap"
    
            } else if (nameId[i][0].toLowerCase().includes(text.toLowerCase())){
                makeCard("grid", i)
                mainEl.appendChild(card)
                mainEl.style.flexDirection = "row"
                mainEl.style.flexWrap = "wrap"
            }
        }
    }
    
})

//Checks for backspace key
document.addEventListener("keydown", function(event){
    if (event.target.className === "Search"){
        console.log("Event key: "+event.key)
    }
})

//Listen for the Type select menu
select = document.querySelector("select")
select.addEventListener("change", function(event){
    pokemonType = event.target.value
    console.log(pokemonType)
    mainEl.innerHTML = ``
    if (pokemonType != ""){
        for (let i=0; i< pokemon.length; i++){
            console.log(nameId[i][0])
            if (pokemon[i].types.includes(pokemonType) && listClicked === true){
                makeCard("list", i)
                mainEl.appendChild(card)
                mainEl.style.flexDirection = "row"
                mainEl.style.flexWrap = "wrap"

            }else if (pokemon[i].types.includes(pokemonType)){
                makeCard("grid", i)
                mainEl.appendChild(card)
                mainEl.style.flexDirection = "row"
                mainEl.style.flexWrap = "wrap"
            }
        }
    } else {
        if (listClicked === true){
            for (let i=0; i< pokemon.length; i++){
                makeCard("list", i)
                mainEl.appendChild(card)
                mainEl.style.flexDirection = "row"
                mainEl.style.flexWrap = "wrap"
    
            }

        }else{
            for (let i=0; i< pokemon.length; i++){
                makeCard("grid", i)
                mainEl.appendChild(card)
                mainEl.style.flexDirection = "row"
                mainEl.style.flexWrap = "wrap"
    
            }
        }
    }
    
})


//Listens for clicking on pokemon for more information
document.addEventListener("click", function(event){
    console.log(event.target)
    console.log(event.target.nodeName)
    console.log(event.target.textContent)
    console.log(event.target.nodeName === "P")
    //Conditions for when the more info page shows up
    if (event.target.nodeName === "SPAN" || event.target.nodeName === "IMG" || event.target.nodeName === "P" || event.target.nodeName === "DIV"){
        for (let i = 0; i < pokemon.length; i++){
            console.log(event.target.tagName)
            console.log(pokemon[i].name)
            //For each if statement, directs to pokemon.html where the more info pokemon card is created
            if (event.target.textContent === pokemon[i].name) {
                getPokemonI(pokemon[i].number).then(function (data) {
                    console.log(nameId[i])
                    clickedPokemonHeart = nameId[i][2]
                    sessionStorage.setItem("clickedPokemonHeart", clickedPokemonHeart)
                    clickedPokemonI = i
                    sessionStorage.setItem("clickedPokemonI", i)
                    window.location.href = "pokemon.html"
                    // makePokemonCard(data, i, clickedPokemonHeart)
                    // console.log(pokemon[i].isFavorite)
                })
            }if (event.target.nodeName === "P"){
                console.log("i'M HERE")
                console.log(event.target.parentElement.firstElementChild.firstElementChild.textContent === pokemon[i].name)
                if (event.target.parentElement.firstElementChild.firstElementChild.textContent == pokemon[i].name){
                    getPokemonI(pokemon[i].number).then(function (data) {
                        console.log(nameId[i])
                        clickedPokemonHeart = nameId[i][2]
                        sessionStorage.setItem("clickedPokemonHeart", clickedPokemonHeart)
                        clickedPokemonI = i
                        sessionStorage.setItem("clickedPokemonI", i)
                        window.location.href = "pokemon.html"
                        // console.log(pokemon[i].isFavorite)
                        // makePokemonCard(data, i, clickedPokemonHeart)
                    })
                }
            }if (typeof event.target.src != undefined){
                if (event.target.src === pokemon[i].image){
                    console.log("Got HERE")
                    console.log(event.target.src)
                    getPokemonI(pokemon[i].number).then(function (data) {
                        console.log(nameId[i])
                        clickedPokemonHeart = nameId[i][2]
                        sessionStorage.setItem("clickedPokemonHeart", clickedPokemonHeart)
                        clickedPokemonI = i
                        sessionStorage.setItem("clickedPokemonI", i)
                        window.location.href = "pokemon.html"
                        // makePokemonCard(data, i, clickedPokemonHeart)
                        // console.log(pokemon[i].isFavorite)
                    })
                }
            }if (event.target.className === "stats"){
                console.log("I'm here too")
                if (event.target.parentElement.parentElement.firstElementChild.firstElementChild.src == pokemon[i].image){
                    getPokemonI(pokemon[i].number).then(function (data) {
                        console.log(nameId[i])
                        clickedPokemonHeart = nameId[i][2]
                        sessionStorage.setItem("clickedPokemonHeart", clickedPokemonHeart)
                        clickedPokemonI = i
                        sessionStorage.setItem("clickedPokemonI", i)
                        window.location.href = "pokemon.html"
                        // makePokemonCard(data, i, clickedPokemonHeart)
                        // console.log(pokemon[i].isFavorite)
                        
                    })
                }
            }if (event.target.className === "info"){
                console.log("Me three")
                if (event.target.parentElement.firstElementChild.firstElementChild.src == pokemon[i].image){
                    console.log(event.target.parentElement.firstElementChild.firstElementChild)
                    getPokemonI(pokemon[i].number).then(function (data) {
                        console.log(nameId[i])
                        clickedPokemonHeart = nameId[i][2]
                        sessionStorage.setItem("clickedPokemonHeart", clickedPokemonHeart)
                        clickedPokemonI = i
                        sessionStorage.setItem("clickedPokemonI", i)
                        window.location.href = "pokemon.html"
                        // makePokemonCard(data, i, clickedPokemonHeart)
                        // console.log(pokemon[i].isFavorite)
                    })
                }

            }if (event.target.className === "card grid"){
                console.log("Me four")
                if (event.target.firstElementChild.firstElementChild.src == pokemon[i].image){
                    getPokemonI(pokemon[i].number).then(function (data) {
                        console.log(nameId[i])
                        clickedPokemonHeart = nameId[i][2]
                        sessionStorage.setItem("clickedPokemonHeart", clickedPokemonHeart)
                        clickedPokemonI = i
                        sessionStorage.setItem("clickedPokemonI", i)
                        window.location.href = "pokemon.html"
                        // makePokemonCard(data, i, clickedPokemonHeart)
                        // console.log(pokemon[i].isFavorite)
                    })
                }
            }if (event.target.className === "card list"){
                console.log("me five")
                if (event.target.firstElementChild.firstElementChild.src == pokemon[i].image){
                    getPokemonI(pokemon[i].number).then(function (data) {
                        console.log(nameId[i])
                        clickedPokemonHeart = nameId[i][2]
                        sessionStorage.setItem("clickedPokemonHeart", clickedPokemonHeart)
                        clickedPokemonI = i
                        sessionStorage.setItem("clickedPokemonI", i)
                        window.location.href = "pokemon.html"
                        // makePokemonCard(data, i, clickedPokemonHeart)
                        // console.log(pokemon[i].isFavorite)
                    })
                }
            }
        }
    }
})



