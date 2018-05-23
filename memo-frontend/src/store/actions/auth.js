import { 
    CHANGE_INPUT,
    INITIALIZE_AUTH_INPUTS
 } from 'store/modules/ActionTypes';
 import axios from 'axios';

 export function changeInput({name, value}) {
     return {
         type: CHANGE_INPUT,
         name,
         value
     };
 }

 export function initializeAuthInputs() {
     return {
         type: INITIALIZE_AUTH_INPUTS
     };
 }


