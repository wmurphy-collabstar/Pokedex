import React from "react"
import styles from "../../styles/Pokemon.module.css"

export default function Info(props){

    return (
        <div className={styles.infopokemon}>
            <div className={styles.statspokemon}>
                <h1>{props.name}</h1>
                <p>{(props.types).map(type =>
                            `${type} `)}</p>
            </div>
            <div>
                {props.heartEl}
            </div>
        </div>
    )
}