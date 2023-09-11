import React, {useState, useEffect} from 'react';
import { Center, Button,Modal,FormControl,Input, } from "native-base"
import { colors } from '../../apptheme';
import { addPetDetailsFirebase } from '../utils/user';
import { useStore } from '../../zustand/store/useStore';

function PetcareModal({visible = false}) {
    const userUid = useStore(state => state.user.uid)
    const setPetDetails = useStore(state => state.updatePetInfo)
    const [showModal, setShowModal] = useState(false);
    const [info, setInfo] = useState({ name: "", age: ""});

    useEffect(() => {
        setShowModal(visible)
    }, [visible])

    const handleSave = (info) => {
        if(info.name.length && info.age.length){
            addPetDetailsFirebase(userUid,info,setPetDetails).then(res => {
                setShowModal(false)
            })
        }
    }


    return (
        <Center>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content width="90%">
              <Modal.Header>Add Pet Details</Modal.Header>
              <Modal.Body>
                <FormControl>
                  <FormControl.Label>Name</FormControl.Label>
                  <Input value = {info.name} onChangeText = {(name) => setInfo({...info, name})} />
                </FormControl>
                <FormControl mt="3">
                  <FormControl.Label>Age</FormControl.Label>
                  <Input keyboardType="numeric" type='text' value = {info.age} onChangeText = {(age) => setInfo({...info, age})}  />
                </FormControl>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button backgroundColor={colors.primary} onPress={() => handleSave(info)}>
                    Save
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </Center>
    );
}

export default PetcareModal;