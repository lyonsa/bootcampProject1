import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiProvider from 'material-ui/styles/MuiThemeProvider'
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

import App from './app'
import store from './store'
import history from './history'

const root = document.getElementById('root');

console.log(`TYPEOF Provider -> ${typeof Provider}`)
console.log(`TYPEOF ConnectedRouter -> ${typeof ConnectedRouter}`)
console.log(`TYPEOF MuiProvider -> ${typeof MuiProvider}`)
console.log(`TYPEOF App -> ${typeof App}`)

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<MuiProvider muiTheme={getMuiTheme(lightTheme)}>
				<div>
					<App />
				</div>
			</MuiProvider>
		</ConnectedRouter>
	</Provider>,
	root
)

