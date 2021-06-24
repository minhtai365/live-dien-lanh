// import axios from 'axios';
import { createStore } from 'redux';
import { getInfoApi } from '../custom/repositories/api.repository';
const oldState = {
    cates: [],
    cateId: null,
    services: [],
    service: null,
    info: null,
    product: null,
    dt: [],
    dataproducts: [],
    search: '',
    page: 1,
    user: '',
}
const myReducer = (state = oldState, action) => {
    switch (action.type) {
        // case 'GET_ID_CATELOGY':
        //     return Object.assign({}, state, { dt: state.dataproducts.filter(x => x.catelogyid === action.id), search: "" })
        case "GET_DATA_PRODUCTS":
            return { ...state, dataproducts: action.data, dt: action.data, search: '' }
        case "GET_DATA_PRODUCT":
            sessionStorage.setItem('pro_id', action.product._id)
            return { ...state, product: action.product }
        case "GET_DATA_CATE":
            return { ...state, cates: action.cate }
        case "GET_ID_CATE":
            sessionStorage.setItem('cate_id', action.id)
            return { ...state, cateId: action.id }
        case "GET_DATA_SERVICE":
            return { ...state, services: action.service }
        case "GET_SERVICE":
            sessionStorage.setItem('service_id', action.service._id)
            return { ...state, service: action.service }
        case "GET_DATA_SEARCH":
            return { ...state, search: action.data }
        case "GET_DATA_INFO":
            return { ...state, info: action.info }
        case "DATA_FROM_PAGIN":
            return { ...state, page: action.page }
        // case "GET_DATA_SLIDE":
        //     return { ...state, slides: action.slides }
        default:
            return state
    }
}


// const getproduct = () => axios.get('/products').then(res => res.data)
const Store = createStore(myReducer);
export default Store;