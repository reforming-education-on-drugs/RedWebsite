import ReactGA from 'react-ga';

ReactGA.initialize('UA-105365789-1');
ReactGA.pageview(window.location.pathname + window.location.search);