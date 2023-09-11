import { Center, Heading, Image } from 'native-base'
import React from 'react'


const SplashScreen = ()=>{
    return(
        <Center height="95%" width="full">
            <Image source = {require('../assets/splash-logo.png')} width="100" height= "100" alt="splash" />
            <Heading>PetCare</Heading>
        </Center>
    )
}
export default SplashScreen