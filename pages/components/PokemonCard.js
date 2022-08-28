import React from "react"
import Sound from "./Sound"
import BigCard from "./BigCard"
import styles from "../../styles/Pokemon.module.css"

export default function PokemonCard(props){

    const [pInfo, setPInfo] = React.useState()

    const getPokemonI =  async(id) => {
        const response = await fetch(`https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/${id}`)
        const data = await response.json()
        return data
    }

    getPokemonI(props.ID).then(data =>
        setPInfo(
                <>
                    <img className={styles.big} src={data.image}/>
                    <Sound Sound={data.sound}/>
                    <BigCard pokemon={data}/>
                </>))

    return (
        <div className={styles.pokemon}>
            {pInfo}
        </div>)
    
}