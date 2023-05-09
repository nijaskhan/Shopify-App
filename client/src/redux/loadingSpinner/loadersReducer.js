import { LOADER_TO_TRUE, LOADER_TO_FALSE } from "./loadersType";

const initialState={
    loading: false
}

const loadingReducer=(state=initialState, action)=>{
    switch(action.type){
        case LOADER_TO_FALSE:
            return{
                loading: false
            }
        case LOADER_TO_TRUE:
            return{
                loading: true
            }
        default: return state
    }
}

export default loadingReducer;