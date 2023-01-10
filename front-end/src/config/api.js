



const BASE_URL = process.env['BASE_URL'] || `http://localhost:5000/api/v1`

const url = (suffix) => BASE_URL + suffix

export default url