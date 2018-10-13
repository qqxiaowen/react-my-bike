import * as fetch from 'axios'
export function handletime(str){
    let time = new Date(str)
    let newtime = time.toLocaleDateString() +" "+ time.toTimeString().substr(0, 8)
    return newtime
}

// module.exports = handletime
const xhr  = fetch.create({
    baseURL: 'https://www.easy-mock.com/mock/5bbb8bf854d6771eb592838d',
    timeout: 60000,
});
export const axios = {
    get(url,data,config){
        return new Promise((resolve,reject) => {
            xhr.get(url,{params:data},config).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },

    post(url,data,config){
        return new Promise((resolve,reject) => {
            xhr.get(url,data,config).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
}