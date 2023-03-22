import { useState } from "react";


export function useLocalStorage (key: string, valorInicial: any){
    const [nombreUsuario, setNombreUsuario] = useState(() => {
        try{
            const valor = window.localStorage.getItem(key)
            return valor ? JSON.parse(valor) : valorInicial
        } catch(error){
            return valorInicial
        }
    })

    const setNuevoNombre = (value: any) => {
        try{
            setNombreUsuario(value)
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch(error){

        }
    }

    return [nombreUsuario, setNuevoNombre]
}