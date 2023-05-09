import { LOADER_TO_TRUE, LOADER_TO_FALSE } from "./loadersType"

export const changeLoaderFalse=(payload)=>{
    return {
        type: LOADER_TO_FALSE,
        payload
    }
}

export const changeLoaderTrue=(payload)=>{
    return{
        type: LOADER_TO_TRUE,
        payload
    }
}