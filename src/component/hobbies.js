import axios from 'axios'
const getHobbies = (props) => {
    const API_K = 'A-m5fcyWrczkQw8KSlibb7MNm4UJ04_MwfguCWmKWnY';
    let URL = 'https://api.unsplash.com/search/photos?page=1&query=' + props + '&client_id=' + API_K;
    return axios.get(URL);
}
export default getHobbies;