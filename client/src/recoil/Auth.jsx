import { atom } from 'recoil';

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