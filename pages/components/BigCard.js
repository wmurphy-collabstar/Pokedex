import React from "react"
import Info from "./Info"
import Bar from "./Bar"
import Health from "./Health"
import styles from "../../styles/Pokemon.module.css"

export default function BigCard(props){
    console.log(props.heartsEl)

    return (
        <div className={styles.cardbig}>
                <Info name={props.pokemon.name} types={props.pokemon.types} heartsEl={props.heartsEl} id={props.pokemon.id}/>
                <Bar maxCP={props.pokemon.maxCP} maxHP={props.pokemon.maxHP}/>
                <Health minWeight= {props.pokemon.weight.minimum} maxWeight={props.pokemon.weight.maximum}
                        minHeight = {props.pokemon.height.minimum} maxHeight={props.pokemon.height.maximum}/>
            </div>
    )
}