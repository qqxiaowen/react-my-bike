import * as fetch from 'axios'
export function handletime(str){
    let time = new Date(str)
    let newtime = time.toLocaleDateString() +" "+ time.toTimeString().substr(0, 8)
    return newtime
}

// module.exports = handletime
const xhr  = fetch.create({
    baseURL: '',
    timeout: 15000,
});
export const axios = {
    get(url,data,config){

    }
}