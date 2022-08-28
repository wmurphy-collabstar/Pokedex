import React from "react"
import Header from "./components/Header"
import Card from "./components/Card"

export default function App(){

    const [cardView, setCardView] = React.useState("grid")
    const [allClicked, setAllClicked] = React.useState(true)
    const [favoritesClicked, setFavoritesClicked] = React.useState(false)
    const [searchedValue, setSearchedValue] = React.useState("")
    const [selectedValue, setSelectedValue] = React.useState("Type")

    const [pokemonList, setPokemonList] = React.useState([])
    

    function Favorites(){
        setAllClicked(false)
        setFavoritesClicked(true)
        console.log("All clicked is: "+ allClicked)
    }

    function All (){
        setAllClicked(true)
        setFavoritesClicked(false)
        console.log("All clicked is: "+ allClicked)
    }

    function listFunction(){
        setCardView("list")
    }

    function gridFunction(){
        setCardView("grid")
    }

    function typedSearch(e){
        setSearchedValue(e.target.value)
    }

    function pickType(e){
        setSelectedValue(e.target.value)
    }


    const getPokemonData =  async() => {
        const response = await fetch("https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/")
        const data = await response.json()
        setPokemonList(data.items)
    }

    getPokemonData().catch(<h1>Please reload the page.</h1>)

    const pokemonCards = pokemonList.map (pokemon => {
        console.log(pokemon.isFavorite)
        if (favoritesClicked){
            if (pokemon.isFavorite){
                return <Card key={pokemon.id} object={pokemon} view={cardView} heart={pokemon.isFavorite}/>
            }
        }if (allClicked){
            if (searchedValue !== undefined && searchedValue !== "") {
                console.log(pokemon.name.toLowerCase().includes(searchedValue.toLowerCase()))
                if (pokemon.name.toLowerCase().includes(searchedValue.toLowerCase())){
                    if (selectedValue !== undefined && selectedValue!=="Type"){
                        if (pokemon.types.includes(selectedValue)){
                            return <Card key={pokemon.id} object={pokemon} view={cardView} heart={pokemon.isFavorite}/>
                        }
                    }
                    else {
                        return <Card key={pokemon.id} object={pokemon} view={cardView} heart={pokemon.isFavorite}/>
                    }
                }
            }else if (selectedValue !== undefined && selectedValue!=="Type") {
                if (pokemon.types.includes(selectedValue)){
                    if (searchedValue !== undefined && searchedValue !== ""){
                        if (pokemon.name.toLowerCase().includes(searchedValue.toLowerCase())){
                            return <Card key={pokemon.id} object={pokemon} view={cardView} heart={pokemon.isFavorite}/>
                        }
                    }
                    else {
                        return <Card key={pokemon.id} object={pokemon} view={cardView} heart={pokemon.isFavorite}/>
                    }
                }
            }else {
                return <Card key={pokemon.id} object={pokemon} view={cardView} heart={pokemon.isFavorite}/>
            }
        }
    })

    // if (allClicked === true){
    //     setPokemonCards(pokemonList.map (pokemon => (
    //         <Card key={pokemon.id} object={pokemon} view={cardView}/>
    //     )))

    // }if (favoritesClicked === true){
    //     setPokemonCards(pokemonCards.filter (e, i => (
    //         pokemonList[i].isFavorite === true
    //     )))

    // }if (searchedValue) {
    //     setPokemonCards(pokemonCards.filter (e, i => (
    //         searchValue in pokemonList[i].name
    //     )))

    // }if (selectedValue !== "Type") {
    //     setPokemonCards(pokemonCards.filter (e, i => (
    //         selectedValue in pokemonList[i].types
    //     )))
    // }
    
    return (
        <div className={"container"}>
            <Header 
            listFunction ={listFunction}
            gridFunction={gridFunction}
            all={All}
            favorites={Favorites}
            typedSearch={typedSearch}
            pickType={pickType}
            />
            <div className="main">
                {pokemonCards}
            </div>
        </div>
    )
}