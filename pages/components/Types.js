import React from "react"

export default function Types (props){
    
    const [typesList, setTypesList] = React.useState([])

    async function getTypes() {
        let response = await fetch("https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon-types/")
        let data = await response.json()
        setTypesList(data)
    }

    getTypes()

    const types = typesList.map(type => (
        <option key={type} value={type}>{type}</option>
    ))

    return (
        <>
            <label htmlFor="type"></label>
            <select onChange={props.handleChange}className="type" placeholder="Type">
                <option value="Type">Type</option>
                {types}
            </select>
        </>
    )
}