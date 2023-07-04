import '../../App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Landing } from '../Landing';
import { Login } from '../Login';
import { Signup } from '../Signup';
import { Welcome } from '../Welcome';
import { ErrorPage } from '../ErrorPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<ErrorPage />}/>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
