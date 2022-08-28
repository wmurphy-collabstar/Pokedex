import React from "react"
import PokemonCard from "./components/PokemonCard"
import { useRouter } from "next/router"

export default function PokemonInfo() {

    const router = useRouter();
    const query = router.query;
    const pId = query.id;

    return (
        <PokemonCard ID={pId}/>
    )
}