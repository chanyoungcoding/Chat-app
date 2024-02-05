import { atom } from 'recoil';

const userDataEffect = (user) => {
  const userData = localStorage.getItem(user);
  return JSON.parse(userData)
}

export const userData = atom({
  key: 'userData',
  default: [userDataEffect("user")]
})

export const userInformationState = atom({
  key: 'userInformationState',
  default: {
    email: "",
    password: ""
  }
})

export const registerInformationState = atom({
  key: 'registerInformationState',
  default: {
    name: "",
    email: "",
    password: ""
  }
})