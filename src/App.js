import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import './reset.css';
import './App.css';
import { api } from './api/api'

function App() {
  const [value, setValue] = useState("");
  const [data, setData] = useState({});

  const handleChange = (e) => {
    setValue(e.target.value);
    return;
  };

  function verification(cep) {
    if (Object.keys(cep.data).length === 1 ) {
      alert("Verifique o campo preenchido e tente novamente!");
    }
  }

  async function searchCep() {
    if (value === "") {
      alert("Preencha o campo com algum CEP válido!");
      return;
    }
    try {
      const cep = await api.get(`${value}`);
      setData(cep.data);
      verification(cep);
      setValue("");
    } catch {
      alert("Por favor verifique o CEP digitado e tente novamente!");
      setValue("");
    }
  }

  return (
    <Grid 
      container 
      justify='center'
      alignItems='center'
      direction='column'
      sx={{minHeight: '100vh', padding:'50px', backgroundColor: '#F0FFF0'}}
      >
      <Box
        sx={{
          borderRadius: '10px',
          flexDirection: 'column',
          textAlign: 'center',
          padding: '10px',
        }}
      >
        <Typography sx={{margin: '10px', fontSize: '24px', fontWeight: 'bold'}}>Buscar CEP</Typography>  
        <Typography sx={{margin: '10px', fontSize: '16px'}}>Digite o CEP que deseja encontrar</Typography>  
        <div>
          <TextField
            id="outlined"
            label="Cep"
            placeholder="00000000"
            value={value}
            onChange={handleChange}
            sx={{margin: '5px'}}
          />
        </div>  
        <Button onClick={searchCep} sx={{color:'#FFFF', margin: '10px', backgroundColor:'#696969'}}>
          <SearchIcon/>Buscar
        </Button>
      </Box>
      <Box>
        {Object.keys(data).length > 1 && (
        <>
          <TextField
              id="outlined"
              label="Cep"
              sx={{margin: '8px'}}
              value={data.code}/>
          <TextField
                id="outlined"
                label="Endereço"
                sx={{margin: '8px'}}
                value={data.address}/>
          <TextField
                id="outlined"
                label="Bairro"
                sx={{margin: '8px'}}
                value={data.district}/>
          <TextField
                id="outlined"
                label="Cidade"
                sx={{margin: '8px'}}
                value={data.city}/>
          <TextField
                id="outlined"
                label="UF"
                sx={{margin: '8px'}}
                value={data.state}/>
        </>        
      )}
      </Box>
    </Grid>
  );
}

export default App;

