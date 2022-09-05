import React from "react"
import PokemonCard from "./components/PokemonCard"
import { useRouter } from "next/router"

export default function PokemonInfo() {

    const router = useRouter();
    const query = router.query;
    const pId = query.id;
    const heartClassName = query.heartClass
    const [heartsEl, setHeartsEl] = React.useState((heartClassName === "heart empty")?
            <svg onClick={clickHearts} className="heart empty" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>: <svg onClick={clickHearts} className="heart full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>)

    console.log(heartClassName)
    console.log(heartsEl.props.className)
    console.log(pId)

    async function addToFavorites(id){
        try {
            let response = await fetch(`https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/${id}/favorite`,
                        {"method": "POST"})
            if (response.ok){
                return await response.json()
            }else {
                throw new Error("Network response was not ok.")
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
        }catch(error) {
            return error
        }
    }

    function clickHearts(event){
        console.log(event.target.className.baseVal !== "")
        if (event.target.className.baseVal === "heart empty"  || event.currentTarget.className.baseVal === "heart empty"){
            addToFavorites(pId)
            setHeartsEl(<svg onClick={clickHearts} className="heart full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                       </svg>)
            console.log(heartsEl)
        } else {
            removeFromFavorites(pId)
            setHeartsEl(<svg onClick={clickHearts} className="heart empty" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                       </svg>)
            console.log(heartsEl)
        }
    }

    console.log(heartsEl)
    return (
        <PokemonCard ID={pId} heartsEl = {heartsEl}/>
    )
}
        