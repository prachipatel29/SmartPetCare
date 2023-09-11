import create from 'zustand';
import {devtools} from 'zustand/middleware';

const appInfoSlice = (set, get) => ({
  user: {
    data: {},
    error: {},
    loading: false,
    userId: '',
    isAuthenticated: false,
  },
  initial: false,
  manageUser: payload =>
    set(prev => ({
      ...prev,
      user: {...payload, isAuthenticated: prev.user.isAuthenticated},
    })),
  setIsAuthenticated: payload =>
    set(prev => ({...prev, user: {...prev.user, isAuthenticated: payload}})),
  setIsInitial: payload =>
    set(prev => ({...prev, initial: payload})),
});


const petInfoSlice = (set, get) => ({
    name: "",
    age: "",
  updatePetInfo: payload =>
    set(prev => ({
      ...payload
    }))
});

const appointmentSlice = (set, get) => ({
  appointments: [],
updateAppointments: payload =>
  set(prev => ({
    appointments: [...payload]
  }))
});

const vaccineDataSlice = (set, get) => ({
  vaccineData : [
    {
      id: 1,
      name: 'Distemper',
      isChecked: false 
    },
    {
      id: 2,
      name: 'DHPP',
      isChecked: false 
    },
    {
      id: 3,
      name: 'Bordetella',
      isChecked: false 
    },
    {
      id: 4,
      name: 'Influenza',
      isChecked: false 
    },
    {
      id: 5,
      name: 'Leptospirosis',
      isChecked: false 
    },
  ],
  updateVaccine : payload =>
  set(prev => ({
    vaccineData: [...payload]
  }))
})


export const useStore = create(
  devtools((set, get) => ({
    ...appInfoSlice(set, get),
    ...petInfoSlice(set, get),
    ...appointmentSlice(set,get),
    ...vaccineDataSlice(set,get)
  })),
);
