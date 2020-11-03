import axios from 'axios'

const server_url = 'https://api.is452.cloud/'


export const getAllTransactions = () => {
    return axios
        .get(server_url + 'get_user_transactions?user_wallet_address=5fa01c6137335e93945fcaad')
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getAllInsurance = () => {
    return axios
        .get(server_url + 'get_insurance_by_user?user_wallet_address=' + '5fa01c6137335e93945fcaad')
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getAllFlightInsurances = () => {
    return axios
        .get(server_url + 'get_all_insurances?insurance_type=flight_delay&status=open')
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}



