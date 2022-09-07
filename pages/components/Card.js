import React from "react"
import Heart from "./Heart"
import Link from "next/Link"

export default function Card(props){
    const [pId, setPId] = React.useState(props.object.id)

    const [heartEl, setHeartEl] = React.useState(props.object.isFavorite?
        <svg onClick={handleClick} className="heart full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
        :<svg onClick={handleClick} className="heart empty" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red" strokeWidth="2">
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

    function handleClick(event){
        const {tagName, className} = event.target
        let typeEl = tagName
        let classNameEl = className
        if (typeEl === "path"){
            typeEl = event.currentTarget.tagName
            classNameEl = event.currentTarget.className
        }
        if (classNameEl.baseVal === "heart full"){
            removeFromFavorites(props.object.id)
            setHeartEl(<svg onClick={handleClick} className="heart empty" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                       </svg>)
        }else {
            addToFavorites(props.object.id)
            setHeartEl(<svg onClick={handleClick} className="heart full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                       </svg>)

        }
    }



    return (
        <div className={`card ${props.view}`} key={props.object.id}>
            <Link className="link"
                  href={{
                        pathname: "/pokemon-info", 
                        query:{id: pId /*heartClass: props.heartEl.props.className*/}
                    }}>
                <img src={props.object.image}/>
            </Link>    
            <div className="info">
                <Link className="link" href={{
                                                pathname: "/pokemon-info", 
                                                query:{id: pId/*, heartClass: props.heartEl.props.className*/}
                                            }}>
                    <div className="stats">
                        <p><span className="bold">{props.object.name}</span></p>
                        <p>{props.object.types.map(type =>
                            `${type} `)}</p>
                    </div>
                </Link>
                <Heart id={props.object.id} heartEl = {heartEl} handleClick={handleClick}/>
            </div>
        </div>
    )
}