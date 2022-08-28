import React from "react"

export default function Nav(props) {

    const All = props.all
    const Favorites = props.favorites

    const [favoritesTab, setFavoritesTab] = React.useState(<button onClick = {clickFavorites} className="favorites">Favorites</button>)
    const [allTab, setAllTab] = React.useState(<button onClick={clickAll} className="all">All</button>)

    function clickFavorites(){
        setAllTab(<button onClick={clickAll} className="favorites">All</button>)
        setFavoritesTab(<button onClick = {clickFavorites} className="all">Favorites</button>)
        Favorites()
    }

    function clickAll (){
        setAllTab(<button onClick={clickAll} className="all">All</button>)
        setFavoritesTab(<button onClick = {clickFavorites} className="favorites">Favorites</button>)
        All()
    }

    return (

        <div className="nav">
            {allTab}
            {favoritesTab}
        </div>
    )
}