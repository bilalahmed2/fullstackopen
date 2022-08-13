import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl).then(request => request.data).catch(e => console.log(e))

const create = (objectPerson) => axios.post(baseUrl, objectPerson).then(response => response.data).catch(e => console.log(e))


export default {getAll, create}