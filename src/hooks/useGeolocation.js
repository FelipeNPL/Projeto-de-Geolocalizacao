import { useEffect, useState } from "react"

const useGeolocation = () => {
   //estamos usando o useState para armazenar as coordenadas do usuário, que inicialmente são nulas  
   const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null})
   const [permission, setPermission] = useState('') 
   const [error, setError] = useState('') //estado para armazenar erros


   useEffect(() => {

   let watchId = null //variável para armazenar o ID do watchPosition, permitindo limpar o watch posteriormente
   
   const onSuccess = (position) => {
        setCoordinates({ //se tudo der certo, iremos armazenar as coordenadas no nosso estado local
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }

    const onError = (error) => { 
        const errorMsg = 'Não foi possível obter a posicao geografica!'
        console.log(errorMsg) 
        console.error(error) 
        setError(`handlePermissionChange :: [onError] - ${errorMsg}`) //[origem] :: [funcao]
    }

    //funcao para receber o status da permissao,
    //separamos ela da query para manter legivel
    const handlePermissionChange = (status) => { 
        setPermission(status.state) //pegando o state do objeto status!

        if (status.state === 'denied') { //se a permissao for negada, nao chamamos o watchPosition
            alert('Localizacao nao acessivel.')
        }

        if (status.state === 'granted' || status.state === 'prompt') { //se concedido ou perguntando pela primeira vez
            //FUNCAO #1: WATCHPOSITION
            watchId = navigator.geolocation.watchPosition(onSuccess, onError) //mudamos ela para dentro do condicional!
            //agora, sem permissao, nem chamamos o watchPosition
        }  
    } 

    //tratamento de compatibilidade, verificando se o navegador suporta a API de geolocalizacao e a API de permissoes
    if ('geolocation' in navigator && 'permissions' in navigator) {  //existe propriedade geolocation e permissions no navigator?
        //FUNCAO #2: QUERY
        navigator.permissions.query({ name: 'geolocation' }) //se a query der certo, seguimos pro then
            .then((status) => {
                //agora pegamos os dados para manipular eles.
                handlePermissionChange(status) //funcao que criamos separadamente
                
            }) 
    } else {
        setError('Geolocalizacao ou API de permissoes nao suportada neste navegador.')
    }

    //executando funçao de limpeza quando useEffect for desmontado, para evitar vazamento de memória
    return () => {
        if (watchId) {
            navigator.geolocation.clearWatch(watchId) //limpando o watchPosition usando o ID armazenado
        }
    }
        
   }, [])


   return { coordinates, permission, error }
}

export default useGeolocation
