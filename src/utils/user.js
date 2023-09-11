import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const createUser = (name, email, password) => {
  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      console.log('User account created & signed in!', user);
      user.user.updateProfile({
        displayName: name
      })
      if(user.uid){
        database().ref('/users/'+ user.uid)
        .set({
          initial: true
        }).then(res => {
          console.log(res, 'updated!');
        })
      }
      return {...user, status: true};
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      return {status: false};
    });
};

export const logoutUser = () => {
  return auth()
    .signOut()
    .then(res => true)
    .catch(err => console.log(err, 'aaaqqwwesdd'));
};

export const getAllData = uid => {
  return database()
    .ref('/users/' + uid)
    .once('value')
    .then(snapShot => {
      console.log('user data: ', snapShot.val(), 'ggggggggggg');
      return {...snapShot.val(), status: true};
    })
    .catch(error => {
      return {status: false};
    });
};

export const addPetDetailsFirebase = (uid, payload, setPetDetails) => {
  return database()
    .ref('/users/' + uid + '/petDetails')
    .set({
      ...payload,
    })
    .then(res => {
      console.log(res, 'updated!');
      setPetDetails(payload)
    })
    .catch(err => {
      console.log(err);
    });
};

export const addAppointmentFirebase = (uid, payload, setAppointmets) => {
  return database()
  .ref('/users/' + uid + '/appointment')
  .set({
    ...payload,
  })
  .then(res => {
    console.log(res, 'updated!');
    setAppointmets(payload)
    console.log(uid, payload,setAppointmets, "-----------------------------")
    })
    .catch(err => {
      console.log(err);
    });
};

export const addVaccineDataFirebase = (uid, payload, setVaccineData) => {
  return database()
    .ref('/users/' + uid + '/vaccineData/')
    .set({
      ...payload,
    })
    .then(res => {
      console.log(res, 'updated!');
      setVaccineData(payload)
    })
    .catch(err => {
      console.log(err);
    });
};

