import { useEffect, useState } from "react"

const useGeolocation = () => {
   //estamos usando o useState para armazenar as coordenadas do usuário, que inicialmente são nulas  
   const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null})

   //usaremos um useEffect, com um array vazio como segundo argumento,
   //é a forma de dizermos pro react que queremos executar o código dentro 
   //do useEffect apenas uma vez, quando o componente que usa ele
   //for renderizado. Não fica executado novamente a cada renderização. 
   useEffect(() => {

    //navigator é um objeto global do NAVEGAOR (GOOGLE CHROME, FIREFOX, ETC)
    //A prorpiedade geolocation é um objeto que tem métodos para obter a localização do usuário
    //watchPosition é um método que recebe uma função de callback como argumento,
    //e essa função é chamada toda vez que a posição do usuário muda
        navigator.geolocation.watchPosition(onSuccess, onError)
        
   }, [])

   const onSuccess = (position) => {
        setCoordinates({ //se tudo der certo, iremos armazenar as coordenadas no nosso estado local
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }

    const onError = (error) => { //recebe uma funcao que tem acesso ao erro que ocorreu.
        console.error(error) //se der algum erro, iremos logar o erro no console
        console.log('Não foi possível obter a localização do usuário.') 
    }


   return { coordinates }
}

export default useGeolocation
