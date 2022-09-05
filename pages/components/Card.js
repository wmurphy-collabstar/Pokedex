import React from "react"
import Heart from "./Heart"
import Link from "next/Link"

export default function Card(props){
    const [pId, setPId] = React.useState(props.object.id)
    console.log(props.heartEl.props.className)



    return (
        <div className={`card ${props.view}`} key={props.object.id}>
            <Link className="link"
                  href={{
                        pathname: "/pokemon-info", 
                        query:{id: pId, heartClass: props.heartEl.props.className}
                    }}>
                <img src={props.object.image}/>
            </Link>    
            <div className="info">
                <Link className="link" href={{
                                                pathname: "/pokemon-info", 
                                                query:{id: pId, heartClass: props.heartEl.props.className}
                                            }}>
                    <div className="stats">
                        <p><span className="bold">{props.object.name}</span></p>
                        <p>{props.object.types.map(type =>
                            `${type} `)}</p>
                    </div>
                </Link>
                <Heart id={props.object.id} heartEl = {props.heartEl} handleClick={props.handleClickHeart}/>
            </div>
        </div>
    )
}