require('./components/app');
require('../CSS/reset.scss');
require('../CSS/styles.scss');
import ReactDOM from 'react-dom';
import React from 'react';
import Main from '../lib/components/app.jsx';

ReactDOM.render(<Main source='https://weatherly-api.herokuapp.com/api/weather/'/>, document.getElementById('application'));
