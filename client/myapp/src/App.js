import './App.css';
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Movies from './pages/Movies';
import Subscriptions from './pages/Subscriptions';
import ManageUsers from './pages/ManageUsers';
import Home from './pages/Home';
import EditUser from './pages/EditUser';
import EditMovie from './pages/EditMovie';
import AllMovies from './pages/AllMovies';
import AddMovie from './pages/AddMovie';
import EditMember from './pages/EditMember';
import AllMembers from './pages/AllMembers';
import AddMember from './pages/AddMember';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />}>
          <Route path='movies' element={<Movies />} >
            <Route path='edit' element={<EditMovie />} />
            <Route path='all' element={<AllMovies />} />
            <Route path='add' element={<AddMovie />} />
          </Route>
          <Route path='subscriptions' element={<Subscriptions />} >
            <Route path='edit' element={<EditMember />} />
            <Route path='all' element={<AllMembers />} />
            <Route path='add' element={<AddMember />} />
          </Route>
          <Route path='manageUsers' element={<ManageUsers />}>
            <Route path='edit' element={<EditUser />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
