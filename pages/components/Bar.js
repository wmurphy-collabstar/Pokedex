import React from "react"
import styles from "../../styles/Pokemon.module.css"

export default function Bar (props){
    return (
        <>
            <div className={styles.bar}>
                <div className={styles.cpbar}></div>
                <p>CP:{props.maxCP}</p>
            </div>
            <div className={styles.bar}>
                <div className={styles.hpbar}></div>
                <p>HP:{props.maxHP}</p>
            </div>
        </>
    )
}