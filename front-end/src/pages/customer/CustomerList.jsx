import React from "react"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { DataGrid, GridDeleteForeverIcon } from '@mui/x-data-grid'
import myfetch from "../../lib/myfetch"
import Waiting from "../../ui/Waiting"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import {Link} from "react-router-dom"
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert } from "@mui/material"
 
export default function CustomerList() {
 
  const columns = [
    {
      field: 'id',
      headerName: 'Cód',
      type: 'number',
      width: 80
    },
    {
      field: 'name',
      headerName: 'Nome',
      width: 200    
    },
    {
      field: 'ident_document',
      headerName: 'CPF',
      width: 150    
    },
    {
      field: 'municipality',
      headerName: 'Município/UF',
      width: 200,
      // Colocando dois campos na mesma célula
      valueGetter: (value, row) => row.municipality + '/' + row.state
    },  
    {
      field: 'phone',
      headerName: 'Tel./Celular',
      width: 160,    
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: 250,    
    },
    {
      field: '_edit',
      headerName: 'Editar',
      headerAlign: 'center',
      align: 'center',
      sortable: 'false',
      width: 90,
      renderCell: params => (
        <Link to={`./${params.id}`}>
          <IconButton aria-label="Editar">
            <EditIcon/>
          </IconButton>
        </Link>
      )
    },
    {
      field: '_delete',
      headerName: 'Excluir',
      headerAlign: 'center',
      align: 'center',
      sortable: 'false',
      width: 90,
      renderCell: params => (        
          <IconButton aria-label="Excluir" onClick={() => handleDeleteButtonClick(params.id)}>
            <GridDeleteForeverIcon color="error" />
          </IconButton>        
      )
    },
  ];
 
    const [state, setState] = React.useState({
        customers: [],
        showWaiting: false
    })
    const {
        customers,
        showWaiting
    } = state
 
    /*
        useEffect() com vetor de dependências vazio irá ser executado
        apenas uma vez, durante o carregamento inicial do componente
    */
   React.useEffect(() => {
    fetchData()
   }, [])
 
   async function fetchData() {
     setState({...state, showWaiting: true })
        try{
            const result = await myfetch.get('/customers')
            setState({
                ...state,
                customers: result,
                showWaiting: false
            })
        }
        catch(error) {
            console.error(error)
            setState({
                ...setState,
                showWaiting:false
            })
        }
   }
    async function handleDeleteButtonClick(deleteId) {
      if(confirm('Deseja realmente excluir este item')) {
        // Existe a tabela de espera
        setState({ ...state, showWaiting: true})
        try {
          await myfetch.delete(`/customers/${deleteId}`)

          // Recarrega os dados da grid
          fetchData()

          alert(' Item excluido com sucesso ')

          // Esconde a tela de espera
          setState({ ...state, showWaiting: false })
        } 
        catch(error) {
          alert(error.message)

          //Esconde a tela de espera
          setState({ ...state, showWaiting: false })
        }
      }

    }
    return(
        <>
            <Waiting show={showWaiting} />
            
            <Typography variant="h1" gutterBottom>
                Listagem de Clientes
            </Typography>
 
            <Box sx={{
              display: 'flex',
              justifyContent: 'right',
              mb: 2   // marginBotton
            }}>
              <Link to="./new">
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<AddBoxIcon />}
                >
                  Novo Cliente              
                </Button>
              </Link>
            </Box>
 
            <Paper elevation={10}>            
              <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                  rows={customers}
                  columns={columns}
                  initialState={{
                  pagination: {
                      paginationModel: {
                      pageSize: 5,
                      },
                  },
                  }}
                  pageSizeOptions={[5]}                
              />
              </Box>
          </Paper>
        </>
    )
}