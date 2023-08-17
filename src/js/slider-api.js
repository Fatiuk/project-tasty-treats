import axios from 'axios';



async function search() {
    const response = await axios.get(
        'https://tasty-treats-backend.p.goit.global/api/recipes/'
    );
    if (response.status != 200) {
        throw new Error(response.status);
    }
    console.log(response.data);
    return response.data;
}

search();
