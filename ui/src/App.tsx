import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { Api } from '../src/api/Api'
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { StockTable } from './component/StockTable';


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

function Pantry() {
  const [type, setType] = useState("all")
  const [name, setName] = useState("")
  const [rows, setRows] = useState<any[]>([])
  const [editedRow, setEditedRow] = useState(-1)
  const [api, setApi] = useState(new Api())
  const [refresh, setRefresh] = useState(true)
/*
  useEffect(() => {
    api.getPantry().then((data: any) => setRows(data))
  }, [])
*/

  useEffect(() => {
    setRows(api.getPantry())
  }, [])
  const displayRows = rows.filter((row) => row.name.includes(name) && type == "all" || row.type === type)
  return <div style={{ height: 500, width: '50%' }}>
    <Button variant="outlined" onClick = {e => {
      api.addPantry("", "", "", "", "", "")
      setRows(api.getPantry())
      setRefresh(!refresh.valueOf())
    }}>Add</Button>
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
      value={type}
      label="Age"
      onChange={e => setType(e.target.value)}>
        <MenuItem value="all">Wszystkie</MenuItem>
        <MenuItem value="food">Jedzenie</MenuItem>
        <MenuItem value="cleaning">Środki czystości</MenuItem>
    </Select>
    <StockTable rows={displayRows} editedRow={editedRow} onEdit={setEditedRow} api={api} update={setRows} refresh={refresh} setRefresh={setRefresh}/>
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
