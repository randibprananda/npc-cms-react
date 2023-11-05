import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import {
  CreateAdmin,
  CreateAthletes,
  CreateEvent,
  CreateNews,
  CreateSport,
  Dashboard,
  EditAdmin,
  EditAthletes,
  EditEvent,
  EditNews,
  EditSport,
  ListAdmin,
  ListAthletes,
  ListEvent,
  ListNews,
  ListSport,
} from './pages/Admin';
import { Login } from './pages/Auth';
import Maintenance from './pages/Maintenance';
import NotFound from './pages/NotFound';
import HeaderSetting from './pages/Admin/HeaderSetting';
import ImportData from './pages/Admin/ImportData';

const devMode = process.env.REACT_APP_MODE === 'dev';

function App() {
  if (process.env.REACT_APP_MODE === 'maintenance') {
    return <Maintenance />;
  }

  return (
    <div className={devMode ? 'debug-screens' : ''}>
      <ToastContainer />
      <Router>
        <Routes>
          {/* Not Found */}
          <Route
            name='404'
            path='*'
            element={<NotFound />}
          />
          {/* Auth */}
          <Route
            name='Login'
            path='/'
            element={<Login />}></Route>
          {/* Admin */}
          <Route
            name='Dashboard'
            path='/dashboard'
            element={<Dashboard />}></Route>
          <Route
            name='ListSport'
            path='/list-sport'
            element={<ListSport />}></Route>
          <Route
            name='CreateSport'
            path='/create-sport'
            element={<CreateSport />}></Route>
          <Route
            name='EditSport'
            path='/edit-sport'
            element={<EditSport />}></Route>
          <Route
            name='ListEvent'
            path='/list-event'
            element={<ListEvent />}></Route>
          <Route
            name='CreateEvent'
            path='/create-event'
            element={<CreateEvent />}></Route>
          <Route
            name='EditEvent'
            path='/edit-event'
            element={<EditEvent />}></Route>
          <Route
            name='ListNews'
            path='/list-news'
            element={<ListNews />}></Route>
          <Route
            name='CreateNews'
            path='/create-news'
            element={<CreateNews />}></Route>
          <Route
            name='EditNews'
            path='/edit-news'
            element={<EditNews />}></Route>
          <Route
            name='ListAthletes'
            path='/list-athletes'
            element={<ListAthletes />}></Route>
          <Route
            name='CreateAthletes'
            path='/create-athletes'
            element={<CreateAthletes />}></Route>
          <Route
            name='EditAthletes'
            path='/edit-athletes'
            element={<EditAthletes />}></Route>
          <Route
            name='ListAdmin'
            path='/list-admin'
            element={<ListAdmin />}></Route>
          <Route
            name='CreateAdmin'
            path='/create-admin'
            element={<CreateAdmin />}></Route>
          <Route
            name='EditAdmin'
            path='/edit-admin'
            element={<EditAdmin />}></Route>
          <Route
            name='HeaderSetting'
            path='/header-setting'
            element={<HeaderSetting />}></Route>
          <Route
            name='ImportData'
            path='/import-data'
            element={<ImportData />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
