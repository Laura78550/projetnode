const axios = require('axios');

module.exports.axios = async ({method, url, data}) => {
    return axios({method, url, data}).then(response => {
        return { response };
    }).catch(error => {
        return { error };
    })
}