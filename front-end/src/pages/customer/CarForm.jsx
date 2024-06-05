import React from 'react'
import Typography from '@mui/material/Typography'
import { useParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputMask from 'react-input-mask'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { ptBR } from 'date-fns/locale/pt-BR'
import { parseISO } from 'date-fns'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import useConfirmDialog from '../../ui/useConfirmDialog'
import useNotification from '../../ui/useNotification'
import useWaiting from '../../ui/useWaiting'
import myfetch from '../../lib/myfetch'
import Car from '../../models/Car'
import { ZodError } from 'zod'
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material'
 
export default function CarForm() {
 
  /*
    Por padrão, todos os campos do nosso formulário terão como
    valor inicial uma string vazia. A exceção é o campo birth_date
    que, devido ao funcionamento do componente DatePicker, deve
    iniciar valendo null.
  */
 
const currentYear = new Date().getFullYear();
 
const formDefaults = {
    brand: '',
    model: '',
    color: '',
    year_manufacture: 1960,
    imported: false,
    plates: '',
    selling_date: '',
    selling_price: ''  
};
 
  const [state, setState] = React.useState({
    car: { ...formDefaults },
    formModified: false,
    inputErrors: {}
  })
  const {
    car,
    formModified,
    inputErrors
  } = state
 
  const params = useParams()
  const navigate = useNavigate()
 
  const { askForConfirmation, ConfirmDialog } = useConfirmDialog()
  const { notify, Notification } = useNotification()
  const { showWaiting, Waiting } = useWaiting()
 
  const states = [
    { value: 'Azul', label: 'Azul' },
    { value: 'Branco', label: 'Branco' },
    { value: 'Verde', label: 'Verde' },
    { value: 'Amarelo', label: 'Amarelo' },
    { value: 'Vermelho', label: 'Vermelho' },
    { value: 'Cinza', label: 'Cinza' },
    { value: 'Prata', label: 'Prata' },
    { value: 'Preto', label: 'Preto' }  
  ]
 
  const plateMaskFormatChars = {
    '$': '[0-9A-Z]',  // letra ou digito
    '9': '[0-9]',    // somente dígitos
    'A': '[A-Z]'    // somente letras
  }
 
  function handleFieldChange(event) {
    const { name, type, checked, value } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;
 
  setState(prevState => ({
      ...prevState,
      car: {
          ...prevState.car,
          [name]: fieldValue
      },
      formModified: true
  }));
}
 
async function handleFormSubmit(event) {
    event.preventDefault()      // Evita que a página seja recarregada
    showWaiting(true)       // Exibe a tela de espera
    try {
      // Invoca a validação dos dados da biblioteca Zod
      // por meio do model Car
      Car.parse(car)
 
      // Se houver parâmetro na rota, significa que estamos modificando
      // um cliente já existente. A requisição será enviada ao back-end
      // usando o método PUT
      if(params.id) await myfetch.put(`/cars/${params.id}`, car)
      // Caso contrário, estamos criando um novo cliente, e enviaremos
      // a requisição com o método POST
      else await myfetch.post('/cars', car)
 
      // Deu certo, vamos exbir a mensagem de feedback que, quando for
      // fechada, vai nos mandar de volta para a listagem de clientes
      notify('Item salvo com sucesso.', 'success', 4000, () => {
        navigate('..', { relative: 'path', replace: true })
      })
    }
    catch(error) {
      console.error(error)
      if(error instanceof ZodError) {
        // Formamos um objeto contendo os erros do Zod e
        // o colocamos na variável de estado inputErrors
        const messages = {}
        for(let i of error.issues) messages[i.path[0]] = i.message
        setState({ ...state, inputErrors: messages })
        notify('Há campos com valores inválidos no formulário', 'error')
      }
      else notify(error.message, 'error')
    }
    finally {
      // Desliga a tela de espera, seja em caso de sucesso, seja em caso de erro
      showWaiting(false)
    }
  }
 
  /*
    useEffect() que é executado apenas uma vez, no carregamento do componente.
    Verifica se a rota tem parâmetro. Caso tenha, significa que estamos vindo
    do componente de listagem por meio do botão de editar, e precisamos chamar
    a função loadData() para buscar no back-end os dados do cliente a ser editado
  */
  React.useEffect(() => {
    if(params.id) loadData()
  }, [])
 
  async function loadData() {
    showWaiting(true)
    try {
      const result = await myfetch.get(`/cars/${params.id}`)
 
      // Converte o formato de data armazenado no banco de dados
      // para o formato reconhecido pelo componente DatePicker
      result.birth_date = parseISO(result.birth_date)
 
      setState({ ...state, car: result })
    }
    catch(error) {
      console.error(error)
      notify(error.message, 'error')
    }
    finally {
      showWaiting(false)
    }
  }
 
  async function handleBackButtonClick() {
    if(formModified &&
       ! await askForConfirmation('Há informações não salvas. Deseja realmente sair?')
    ) return  // Sai da função sem fazer nada
   
    // Navega de volta para a página de listagem
    navigate('..', { relative: 'path', replace: true })
  }
 
  return (
    <>
      <ConfirmDialog />
      <Notification />
      <Waiting />
     
      <Typography variant="h1" gutterBottom>
        { params.id ? `Editar carro #${params.id}` : 'Cadastrar novo carro' }
      </Typography>
 
      <Box className="form-fields">
        <form onSubmit={handleFormSubmit}>
 
          <TextField
            name="brand"
            label="Marca"
            variant="filled"
            required
            fullWidth
            value={car.brand}
            onChange={handleFieldChange}  
            helperText={inputErrors?.brand}
            error={inputErrors?.brand}
          />        
 
          <TextField
            name="model"
            label="Modelo"            
            variant="filled"
            required
            fullWidth
            value={car.model}
            onChange={handleFieldChange}
            helperText={inputErrors?.model}
            error={inputErrors?.model}
          />                    
 
          <TextField
            name="color"
            label="Cor"
            variant="filled"
            required
            fullWidth
            value={car.color}
            onChange={handleFieldChange}
            select
            helperText={inputErrors?.color}
            error={inputErrors?.color}
          >
            {
              states.map(s =>
                <MenuItem key={s.value} value={s.value}>
                  {s.label}
                </MenuItem>
              )
            }
          </TextField>
 
          <TextField
            name="year_manufacture"
            label="Ano de Fabricação"
            variant="filled"
            required
            select
            fullWidth
            value={car.year_manufacture}
            onChange={handleFieldChange}
            helperText={inputErrors?.year_manufacture}
            error={inputErrors?.year_manufacture}
          >
            {Array.from({ length: new Date().getFullYear() - 1960 + 1 }, (_, i) => (
              <MenuItem key={i} value={new Date().getFullYear() - i}>
                {new Date().getFullYear() - i}
              </MenuItem>
            ))}
          </TextField>    
 
          <InputMask
              mask="AAA-9$99"              
              value={car.plates}
              onChange={handleFieldChange}
              formatChars={plateMaskFormatChars}
          >
              {() => (
                  <TextField
                      name="plates"
                      label="Placa"
                      variant="filled"
                      required
                      fullWidth
                      helperText={inputErrors?.plates}
                      error={inputErrors?.plates}
                  />
              )}
          </InputMask>  
         
          <FormControlLabel
            control={
              <Checkbox
                name="imported"
                color="primary"
                variant="filled"
                checked={car.imported}
                  onChange={handleFieldChange}
                 
              />
            }
             label="Carro Importado"
          />
 
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label="Data da Venda"
              value={Car.birth_date}
              onChange={ value => handleFieldChange({
                target: { name: 'selling_date', value }
              })}
              slotProps={{
                textField: {
                  variant: 'filled',
                  fullWidth: true,
                  helperText: inputErrors?.selling_date,
                  error: inputErrors?.selling_date
                }
              }}
            />
          </LocalizationProvider>            
         
          <InputMask
            mask="999999"
            value={car.selling_price}
            onChange={handleFieldChange}
            maskChar=""
          >
            {() => (
              <TextField
                name="selling_price"
                label="Preço de Venda"
                variant="filled"
                required
                fullWidth
                helperText={inputErrors?.selling_price}
                error={!!inputErrors?.selling_price}
              />
            )}
          </InputMask>
 
          <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
            >
              Salvar
            </Button>
            <Button
              variant="outlined"
              onClick={handleBackButtonClick}
            >
              Voltar
            </Button>
          </Box>
 
          {/*<Box sx={{ fontFamily: 'monospace', display: 'flex', width: '100%' }}>
            {JSON.stringify(inputErrors)}
          </Box>*/}
 
        </form>
      </Box>
    </>
  )
}