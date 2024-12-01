import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import CreatePost from "./components/Posts/CreatePost";
import Signup from "./components/Auth/signup/Signup";
import Login from "./components/Auth/login/Login";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
         {/*Layout Route*/}
         <Route path="/*" element={<Layout />}>
           <Route index element={<Login />}/>
           <Route path="login" element={<Login />}/>
           <Route path="signup" element={<Signup />}/>
         </Route>
         {/*Home Route*/}
         <Route path="/home/*" element={<Home />}>
           <Route path="create-post" element={<CreatePost />}/>
         </Route>
      </Routes>
    </div>
  );
}

export default App;
