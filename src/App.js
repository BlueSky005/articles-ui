
import Login from './components/Login';
import LandingPage from './components/Landing';
import WriteArticle from './components/WriteArticle';
import EditArticle from './components/EditArticle';
import SubmittedArticles from './components/SubmittedArticles';
import ViewArticle from './components/ViewArticles';
import Registration from './components/Registration';
import './css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function App () {

  return (
    <div className="App">

      <Router>

        <Switch>
          <Route path="/dashboard" component={LandingPage} />
          <Route path="/editArticle" component={EditArticle} />
          <Route path="/viewArticle" component={ViewArticle} />
          <Route path="/publish" component={WriteArticle} />
          <Route path="/yourArticles" component={SubmittedArticles} />
          <Route path="/register" component={Registration} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Login} />
        </Switch>

      </Router>

      {/* <LandingPage /> */}

      {/* <WriteArticle /> */}

      {/* <SubmittedArticles /> */}

      {/* <ViewArticles /> */}






      {/* <div className="container"> */}

      {/* </div> */}

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}



    </div>
  );
}

export default App;
