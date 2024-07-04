import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// a basic layout
const Layout: React.FC = () => (
  <div className="py-4"><Outlet /></div>
)

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home/>}/>
      </Route>
    </Routes>
  );
}

export default App;
