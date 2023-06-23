import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import FormPage from './components/form-page';
import Result from './components/result-page';
import './App.css';


function App() {

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path={'/form'} element={<FormPage />} />
        <Route path={'/result'} element={<Result />} />
      </Routes>
    </Router >
  );
}

export default App;
