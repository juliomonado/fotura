import axios from "axios";

const API_KEY = '47066090-4cceb9550820d188317d56a0f';

const apiUrl = `https://pixabay.com/api/?key=${API_KEY}`;

const formatUrl = (params) => { // {q, page, category, order, lang}
    let url = apiUrl + "&per_page=25"
    if(!params) return url;
    let paramKeys = Object.keys(params);
    paramKeys.map(key => {
        let value = key == 'q' ? encodeURIComponent(params[key]) : params[key];
        url += `&${key}=${value}`;
    });
    //console.log('final url: ', url);
    return url;
}

export const apiCall = async (params) => {
    try{
        const response = await axios.get(formatUrl(params));
        const {data} = response;
        return{success: true, data}
    }catch(err){
        console.log('nos dió error: ', err.message);
        return {success: false, msg: err.message};
    }
}

//&safesearch=true&editors_choice=true