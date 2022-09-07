import React from "react"
import Header from "./components/Header"
import Card from "./components/Card"
import { useQuery } from "react-query"

// import { useHistory } from 'react-router-dom'

export default function App(){

    const [cardView, setCardView] = React.useState("grid")
    const [allClicked, setAllClicked] = React.useState(true)
    const [favoritesClicked, setFavoritesClicked] = React.useState(false)
    const [searchedValue, setSearchedValue] = React.useState("")
    const [selectedValue, setSelectedValue] = React.useState("Type")
    const [offset, setOffSet] = React.useState(0)
    const [pokemonList, setPokemonList] = React.useState([])

    const getPokemonData =  async(offset) => {
        try {
            const response = await fetch(`https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/?limit=10&offset=${offset}`)
            if (response.ok){
                const data = await response.json()
                setPokemonList(prev => prev.sort((a,b) => (parseInt(a.id) > parseInt(b.id)? 1: -1)))
                const filteredPokemon = pokemonList.filter(word => word.id === data.items[0].id)
                if (filteredPokemon.length > 0){
                    setPokemonList(prevPokemonList => prevPokemonList.slice(0, prevPokemonList.length-(data.items.length)))
                } else {
                    setPokemonList(prevPokemonList => [...prevPokemonList, ...data.items])
                }
            }else {
                throw new Error("Network response was not okay.")
            }
        }catch (error){
            return error
        }
        
    }

    const {
        isLoading,
        isError,
        isSuccess,
        error,
        data,
        status,
        isFetching,
        isPreviousData
    } = useQuery(["pokemon", offset], () => getPokemonData(offset), {keepPreviousData: true, refetchInterval: 0})

    // const [pokemonList, setPokemonList] = React.useState([])
    

    function Favorites(){
        setAllClicked(false)
        setFavoritesClicked(true)
        
    }

    function All (){
        setAllClicked(true)
        setFavoritesClicked(false)
        
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


    // React.useEffect(() => {
    //     setOffSet(0)
    //     if (pokemonList.length === 0){
    //         if (offset === 0){
    //             while (offset < 151){
    //                 getPokemonData(offset)
    //                 setOffSet(prevOffSet => prevOffSet + 10)
    //             }
    //         }
    //     }
    //     pokemonList.sort((a,b) => (parseInt(a.id) > parseInt(b.id)? 1: -1))
    //     console.log(pokemonList)
    // }, [allClicked, favoritesClicked])

    const pokemonCards = pokemonList.map ((pokemon, i) => {
        if (favoritesClicked){
            if (pokemon.isFavorite){
                return <Card key={pokemon.id} object={pokemon} view={cardView} /*heartEl ={heartEl[i]} handleClickHeart={clickHeart}*//>
            }
        }if (allClicked){
            if (searchedValue !== undefined && searchedValue !== "") {
                if (pokemon.name.toLowerCase().includes(searchedValue.toLowerCase())){
                    if (selectedValue !== undefined && selectedValue!=="Type"){
                        if (pokemon.types.includes(selectedValue)){
                            return <Card key={pokemon.id} object={pokemon} view={cardView} /*heartEl = {heartEl[i]} handleClickHeart={clickHeart}*//>
                        }
                    }
                    else {
                        return <Card key={pokemon.id} object={pokemon} view={cardView} /*heartEl = {heartEl[i]} handleClickHeart={clickHeart}*//>
                    }
                }
            }else if (selectedValue !== undefined && selectedValue!=="Type") {
                if (pokemon.types.includes(selectedValue)){
                    if (searchedValue !== undefined && searchedValue !== ""){
                        if (pokemon.name.toLowerCase().includes(searchedValue.toLowerCase())){
                            return <Card key={pokemon.id} object={pokemon} view={cardView} /*heartEl = {heartEl[i]} handleClickHeart={clickHeart}*//>
                        }
                    }
                    else {
                        return <Card key={pokemon.id} object={pokemon} view={cardView} /*heartEl = {heartEl[i]} handleClickHeart={clickHeart}*//>
                    }
                }
            }else {
                return <Card key={pokemon.id} object={pokemon} view={cardView} /*heartEl = {heartEl[i]} handleClickHeart={clickHeart}*//>
            }
        }
    })
    
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
            {(allClicked) && 
            <div className='nav btn-container'>
                <button
                onClick={() => setOffSet(prevOffSet => Math.max(prevOffSet - 10, 0))}
                disabled={offset === 10}
                >Load Less</button>

                <button
                onClick={() => setOffSet(prevOffSet => prevOffSet + 10)}
                disabled={offset === 150}
                >Load More</button>
            </div>}
        </div>
    )
}