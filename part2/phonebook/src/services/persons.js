import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl).then(request => request.data).catch(e => console.log(e))

const create = (objectPerson) => axios.post(baseUrl, objectPerson).then(response => response.data).catch(e => console.log(e))

const deleteEntry = (idOfDelete) => axios.delete(`${baseUrl}/${idOfDelete}`).catch(e => console.log(e))

const updateEntry = (persons, changedPerson) => axios.put(`${baseUrl}/${changedPerson.id}`, changedPerson).then(response => response.data).catch(e => console.log(e))

export default {getAll, create, deleteEntry, updateEntry}