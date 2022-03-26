import React, { useState } from 'react';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { GetPantry } from '../src/api/Api'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { MenuItem, Select, TextField } from '@mui/material';


function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="pantry" element={<Pantry />} />
        </Routes>
      </div>
    );
}

function filterRows(rows: object[], nameFilter: string, categoryFilter: string) {
  return rows
}

function Pantry() {
  const [category, setCategory] = useState("all")
  const [name, setName] = useState("")
  const [rows, setRows] = useState<any[]>([])
  GetPantry().then(data => setRows(data))

  const displayRows = filterRows(rows, name, category)
  const columns: GridColDef[] = [
    { field: 'name' },
    { field: 'amount' },
    { field: 'type' },
//     { field: 'expiry_date' },
    { field: "measure" },
//     { field: 'note' },
  ];
  return <div style={{ height: 500, width: '50%' }}>
    <TextField 
      id="outlined-basic"
      variant="outlined" 
      onChange={e => {
        if(e.target.value.length >= 3){
          setName(e.target.value)
        } else {
          setName("")
        }
      }}  
    />
    <Select
      value={category}
      label="Age"
      onChange={e => setCategory(e.target.value)}>
        <MenuItem value="all">Wszystkie</MenuItem>
        <MenuItem value="food">Jedzenie</MenuItem>
        <MenuItem value="cleaning">Środki czystości</MenuItem>
    </Select>
    <DataGrid
        rows={rows.filter(row => row.name.includes(name) && category == "all" || row.category === category)}
        columns={columns}
      />
  </div>
}

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="images/PusheenFridge.PNG" className="App-logo" alt="logo" />
        <p>
          Czy w lodówce jest jedzenie?
        </p>
        <nav>
        <Link to="/pantry">Sprawdź</Link>
      </nav>
      </header>
    </div>
  );
}

export default App;
