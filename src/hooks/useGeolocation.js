import { useEffect, useState } from "react"

const useGeolocation = () => {
   //estamos usando o useState para armazenar as coordenadas do usuário, que inicialmente são nulas  
   const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null})
   const [permission, setPermission] = useState('') //status da permissao para entender qual é a permissao em certo navegador dentro da api do geolocation
   //com isso o desenvolvedor pode fazer um tratamento diferente dependendo do status da permissao
   //encapsulando a manipulacao da api do geolocation dentro to nosso hook!

   useEffect(() => {

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

    //funcao para receber o status da permissao,
    //separamos ela da query para manter legivel
    const handlePermissionChange = (status) => { 
        setPermission(status.state) //pegando o state do objeto status!

        if (status.state === 'denied') { //se a permissao for negada, nao chamamos o watchPosition
            alert('Localizacao nao acessivel.')
        }

        if (status.state === 'granted' || status.state === 'prompt') { //se concedido ou perguntando pela primeira vez
            //FUNCAO #1: WATCHPOSITION
            navigator.geolocation.watchPosition(onSuccess, onError) //mudamos ela para dentro do condicional!
            //agora, sem permissao, nem chamamos o watchPosition
        }  
        
    } 

        //FUNCAO #2: QUERY
        navigator.permissions.query({ name: 'geolocation' }) //se a query der certo, seguimos pro then
            .then((status) => {
                //agora pegamos os dados para manipular eles.
                handlePermissionChange(status) //funcao que criamos separadamente
                
            }) 
   }, [])


   return { coordinates, permission }
}

export default useGeolocation
