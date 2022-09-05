import React from "react"

export default function Heart(props){
    console.log(props.heartEl)


    return (
        <div id={props.id}>
            {props.heartEl}
        </div>
    )
}
