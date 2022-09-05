import React from "react"
import Header from "./components/Header"
import Card from "./components/Card"
// import { useHistory } from 'react-router-dom'

export default function App(){

    const [cardView, setCardView] = React.useState("grid")
    const [allClicked, setAllClicked] = React.useState(true)
    const [favoritesClicked, setFavoritesClicked] = React.useState(false)
    const [searchedValue, setSearchedValue] = React.useState("")
    const [selectedValue, setSelectedValue] = React.useState("Type")
   

    const [pokemonList, setPokemonList] = React.useState([])

    const [heartEl, setHeartEl] = React.useState(Array(151).fill(
        <svg onClick={clickHeart} className="heart empty" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                       </svg>))

    const heartFilled = (<svg onClick={clickHeart} className="heart full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" ></path>
                         </svg>)
    const heartEmpty = (<svg onClick={clickHeart} className="heart empty" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>)


    async function addToFavorites(id){
        try {
            let response = await fetch(`https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/${id}/favorite`,
                        {"method": "POST"})
            if (response.ok){
                return await response.json()
            }else {
                throw new Error("Network response was not ok")
            }
        }catch (error){
            return error
        }
    }
    
    // removes a specific pokemon from favorites
    async function removeFromFavorites(id){
        try {
            let response = await fetch(`https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/${id}/unfavorite`,
                        {"method": "POST"})
            if (response.ok){
                return await response.json()
            }else {
                throw new Error("Network response was not ok.")
            }
        } catch (error){
            return error
        }
    }

    function clickHeart(event){
        if (typeof heartEl === "string"){
            // if (heartEl.props.className === "heart full"){
            //     setHeartEl(
            //         <svg onClick={clickHeart} className="heart empty" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red" strokeWidth="2">
            //             <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            //         </svg>)
            //     removeFromFavorites(props.id)
            //     setPokemonList(prev => (prev.map((pokemon, i) => {
            //         if (i === parseInt(id)-1){
            //             console.log("This is it!")
            //             return {...pokemon, isFavorite: false}
            //         }else {
            //             return pokemon
            //         }
            //     })))
            // } else {
            //     setHeartEl(
            //         <svg onClick={clickHeart} className="heart full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red">
            //             <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            //         </svg>)
            //     addToFavorites(props.id)
            //     setPokemonList(prev => (prev.map((pokemon, i) => {
            //         if (i === parseInt(id)-1){
            //             console.log("This is it!")
            //             return {...pokemon, isFavorite: true}
            //         }else {
            //             return pokemon
            //         }
            //     })))
            // }
        }else {
            console.log(event.target)
        console.log(heartFilled.props.className)
        if (event.target.className.baseVal === heartFilled.props.className){
            const id = event.target.parentElement.id
            console.log(event.target.className)
            setHeartEl(prevHeartEl => prevHeartEl.map((data, i) => {
                if (i === parseInt(id-1)){
                    return (<svg onClick={clickHeart} className="heart empty" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                           </svg>)
                }else {
                    return data
                }}))
            removeFromFavorites(id)
            setPokemonList(prev => (prev.map((pokemon, i) => {
                if (i === parseInt(id)-1){
                    console.log("This is it!")
                    return {...pokemon, isFavorite: false}
                }else {
                    return pokemon
                }
            })))
            console.log(heartEl)
        } else if (event.target.className.baseVal === heartEmpty.props.className){
            const id = event.target.parentElement.id
            console.log(event.target.className)
            setHeartEl(prevHeartEl => prevHeartEl.map((data, i) => {
                if (i === parseInt(id-1)){
                    return (<svg onClick={clickHeart} className="heart full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                            </svg>)
                }else {
                    return data
                }}))
            console.log(heartEl)
            addToFavorites(id)
            setPokemonList(prev => (prev.map((pokemon, i) => {
                if (i === parseInt(id)-1){
                    return {...pokemon, isFavorite: true}
                }else {
                    return pokemon
                }
            })))
            console.log(pokemonList)
        } else if (event.target.localName === "path"){
            if (event.currentTarget.className.baseVal === heartFilled.props.className){
                const id = event.currentTarget.parentElement.id
                console.log(event.target.className)
                setHeartEl(prevHeartEl => prevHeartEl.map((data, i) => {
                    if (i === parseInt(id-1)){
                        return (<svg onClick={clickHeart} className="heart empty" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>)
                    }else {
                        return data
                    }}))
                removeFromFavorites(id)
                setPokemonList(prev => (prev.map((pokemon, i) => {
                    if (i === parseInt(id)-1){
                        return {...pokemon, isFavorite: false}
                    }else {
                        return pokemon
                    }
                })))
                console.log(pokemonList)
            } else {
                const id = event.currentTarget.parentElement.id
                console.log(event.target.className)
                setHeartEl(prevHeartEl => prevHeartEl.map((data, i) => {
                    if (i === parseInt(id-1)){
                        return (<svg onClick={clickHeart} className="heart full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                                </svg>)
                    }else {
                        return data
                    }}))
                addToFavorites(id)
                setPokemonList(prev => (prev.map((pokemon, i) => {
                    if (i === parseInt(id)-1){
                        return {...pokemon, isFavorite: true}
                    } else {
                        return pokemon
                    }
                })))
                console.log(pokemonList)
            }
        }
        }
        
        
    }
    

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


    const getPokemonData =  async(offset) => {
        try {
            const response = await fetch(`https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/?limit=10&offset=${offset}`)
            if (response.ok){
                const data = await response.json()
                setPokemonList(prev => prev.sort((a,b) => (parseInt(a.id) > parseInt(b.id)? 1: -1)))
                setPokemonList(prevPokemonList => [...prevPokemonList, ...data.items])
            }else {
                throw new Error("Network response was not okay.")
            }
        }catch (error){
            return error
        }
        
    }

    React.useEffect(() => {
        const zero = 0
        let offset = zero
        if (pokemonList.length === 0){
            if (offset === 0){
                while (offset < 151){
                    getPokemonData(offset)
                    offset += 10
                }
            }
        }
        pokemonList.sort((a,b) => (parseInt(a.id) > parseInt(b.id)? 1: -1))
        console.log(pokemonList)
    }, [])

    const pokemonCards = pokemonList.map ((pokemon, i) => {
        if (favoritesClicked){
            if (heartEl[i].props.className === "heart full"){
                console.log(pokemon)
                console.log(heartEl)
                return <Card key={pokemon.id} object={pokemon} view={cardView} heartEl ={heartEl[i]} handleClickHeart={clickHeart}/>
            }
        }if (allClicked){
            if (searchedValue !== undefined && searchedValue !== "") {
                if (pokemon.name.toLowerCase().includes(searchedValue.toLowerCase())){
                    if (selectedValue !== undefined && selectedValue!=="Type"){
                        if (pokemon.types.includes(selectedValue)){
                            return <Card key={pokemon.id} object={pokemon} view={cardView} heartEl = {heartEl[i]} handleClickHeart={clickHeart}/>
                        }
                    }
                    else {
                        return <Card key={pokemon.id} object={pokemon} view={cardView} heartEl = {heartEl[i]} handleClickHeart={clickHeart}/>
                    }
                }
            }else if (selectedValue !== undefined && selectedValue!=="Type") {
                if (pokemon.types.includes(selectedValue)){
                    if (searchedValue !== undefined && searchedValue !== ""){
                        if (pokemon.name.toLowerCase().includes(searchedValue.toLowerCase())){
                            return <Card key={pokemon.id} object={pokemon} view={cardView} heartEl = {heartEl[i]} handleClickHeart={clickHeart}/>
                        }
                    }
                    else {
                        return <Card key={pokemon.id} object={pokemon} view={cardView} heartEl = {heartEl[i]} handleClickHeart={clickHeart}/>
                    }
                }
            }else {
                return <Card key={pokemon.id} object={pokemon} view={cardView} heartEl = {heartEl[i]} handleClickHeart={clickHeart}/>
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
        </div>
    )
}