import { VStack, Text, HStack } from 'native-base'
import React from 'react'
import {TouchableOpacity} from "react-native"
import CheckBox from '@react-native-community/checkbox';
import {colors} from '../../apptheme';
import auth from '@react-native-firebase/auth';
import { useStore } from '../../zustand/store/useStore';
import { addVaccineDataFirebase } from '../utils/user';


const ReportScreen = ()=>{
    const vaccineData = useStore(state => state.vaccineData)
    const setVaccineData = useStore(state => state.updateVaccine)

    const handleChange = (isSelected, id) => {
        const updatedVaccineData = vaccineData.map( data => data.id === id ? {...data, isChecked: isSelected} : data)
        addVaccineDataFirebase(auth().currentUser.uid,updatedVaccineData, setVaccineData )
    }

    return(
        <VStack background={colors.background} flex={'1'} paddingX={3} safeArea>
            {
                vaccineData.map(data => (
                    <HStack paddingY={"3"} borderBottomWidth="1" borderColor={"gray.700"} key={data.id} alignItems="center" >
                        <CheckBox
                            key={data.id}
                            value={data.isChecked}
                            onValueChange={(isSelected) =>  handleChange(isSelected, data.id)}
                            tintColors={{ true : "#5eba7d", false: "white" }}
                        />
                            <TouchableOpacity onPress ={() =>  handleChange(!data.isChecked, data.id)}>
                            <Text color={colors.headeline}>  {data.name}</Text>
                            </TouchableOpacity>
                    </HStack>
                ))
            }

        </VStack>

    )
}
export default ReportScreen