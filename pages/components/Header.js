import React from "react"
import Nav from "./Nav"
import Types from "./Types"
import List from "./List"
import Grid from "./Grid"

export default function Header (props){

    const listFunction = props.listFunction
    const gridFunction = props.gridFunction
    return (
        <header>
            <Nav all={props.all} favorites={props.favorites} />
            <div className="input">
                <input onKeyUp={props.typedSearch} type="search" placeholder="Search" className="search"/>
                <Types handleChange={props.pickType}/>
                {/* <View /> */}
                <div className="view">
                    <List handleClick={props.listFunction}/>
                    <Grid handleClick={props.gridFunction}/>
                </div>
            </div>
        </header>
    )
}