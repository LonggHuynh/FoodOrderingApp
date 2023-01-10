

const BASE_URL = process.env['REACT_APP_SERVER_URL'] || `http://localhost:5000/api/v1`

const url = (suffix) => BASE_URL + suffix

export default url