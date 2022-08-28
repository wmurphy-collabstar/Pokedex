import React from "react"

export default function Heart(props){

    const [heartEl, setHeartEl] = React.useState(props.heart?
        <svg onClick={clickHeart} className="heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>: <svg onClick={clickHeart} className="heart" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>)

    const [isHeartFilled, setIsHeartFilled] = React.useState(props.heart)


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

    function clickHeart(){
        if (isHeartFilled){
            setHeartEl(
                <svg onClick={clickHeart} className="heart" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>)
            removeFromFavorites(props.id)
            setIsHeartFilled(false)
        } else {
            setHeartEl(
                <svg onClick={clickHeart} className="heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>)
            addToFavorites(props.id)
            setIsHeartFilled(true)
        }
        
    }


    return (
        <div onClick={clickHeart}>
            {heartEl}
        </div>
    )
}
