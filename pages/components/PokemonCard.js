import React from "react"
import Sound from "./Sound"
import BigCard from "./BigCard"
import styles from "../../styles/Pokemon.module.css"

export default function PokemonCard(props){

    const [pInfo, setPInfo] = React.useState(props.heartsEl)
    console.log(props.heartsEl)

    const getPokemonI =  async(id) => {
        try {
            const response = await fetch(`https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/${id}`)
            if (response.ok){
                const data = await response.json()
                return data
            }else {
                throw new Error("Network response was not ok.")
            }
        }catch (error){
            return error
        }
    }
    React.useEffect(() => {
        getPokemonI(props.ID).then(data =>{
            
            return setPInfo(
                    <>
                        <Sound Sound={data.sound}/>
                        <img className={styles.big} src={data.image}/>
                        <BigCard pokemon={data} heartsEl={props.heartsEl}/>
                    </>)})
    }, [props.heartsEl, props.ID])
    console.log(pInfo)
    return (
        <div className={styles.pokemon}>
            {pInfo}
        </div>)
    
}