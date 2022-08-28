import React from "react"
import Heart from "./Heart"
import Link from "next/Link"

export default function Card(props){
    const [pId, setPId] = React.useState(props.object.id)

    return (
        <div className={`card ${props.view}`} key={props.object.id}>
            <Link className="link"
                  href={{
                        pathname: "/pokemon-info", 
                        query:{id: pId, heart: props.object.heart}
                    }}>
                <img src={props.object.image}/>
            </Link>    
            <div className="info">
                <Link className="link" href={{
                                                pathname: "/pokemon-info", 
                                                query:{id: pId}
                                            }}>
                    <div className="stats">
                        <p><span className="bold">{props.object.name}</span></p>
                        <p>{props.object.types.map(type =>
                            `${type} `)}</p>
                    </div>
                </Link>
                <Heart id={props.object.id} heart={props.heart}/>
            </div>
        </div>
    )
}