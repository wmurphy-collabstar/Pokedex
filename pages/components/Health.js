import React from "react"
import styles from "../../styles/Pokemon.module.css"

export default function Health(props){
    return (
        <div className={styles.pokemonhealth}>
            <div className={styles.weight}>
                <h4>Weight</h4>
                <p>{props.minWeight} - {props.maxWeight}</p>
            </div>
            <div className={styles.height}>
                <h4>Height</h4>
                <p>{props.minHeight} - {props.maxHeight}</p>
            </div>
        </div>
    )
}