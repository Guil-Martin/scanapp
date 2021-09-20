import React from 'react';
import axios from 'axios'

import { SERVER_URL, API_URL } from '@env';

const server = axios.create({
	baseURL: `${SERVER_URL}`,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		// 'X-CSRFToken': csrftoken
	}
})

const api = axios.create({
	baseURL: `${API_URL}`,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		// 'X-CSRFToken': csrftoken
	}
})

const ServerContext = React.createContext(server)
const ApiContext = React.createContext(api)

export {ServerContext, ApiContext} ;