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
import Customer from '../../models/Customer'
import { ZodError } from 'zod'

export default function CarForm() {
 
    /*
      Por padrão, todos os campos do nosso formulário terão como
      valor inicial uma string vazia. A exceção é o campo birth_date
      que, devido ao funcionamento do componente DatePicker, deve
      iniciar valendo null.
    */
    const formDefaults = {
      model: '',
      color: '',
      year_manufacture: '',
      plates: '',
      selling_date: '',
      selling_price: '',
    }
 
    const [state, setState] = React.useState({
      customer: { ...formDefaults },
      formModified: false,
      inputErrors: {}
    })
    const {
      customer,
      formModified,
      inputErrors
    } = state
 
    const params = useParams()
    const navigate = useNavigate()
 
    const { askForConfirmation, ConfirmDialog } = useConfirmDialog()
    const { notify, Notification } = useNotification()
    const { showWaiting, Waiting } = useWaiting()
 
    const states = [
      { value: 'Am', label: 'Amarelo' },
      { value: 'Az', label: ' Azul ' },
      { value: 'La', label: ' Laranja ' },
      { value: 'Pra', label: ' Prata ' },
      { value: 'Pre', label: ' Preto ' },
      { value: 'Ve', label: 'Verde ' },
      { value: 'RO', label: 'Rosa' }
    ]

    const Ano = [];
    for (let year = 1960; year <= 2024; year++) {
      Ano.push({ value: year.toString(), label: year.toString() });
    }
    
    const phoneMaskFormatChars = {
      '9': '[0-9]',    // somente dígitos
      '%': '[\s0-9]'   // dígitos ou espaço em branco (\s)
    }
 
    function handleFieldChange(event) {
      const customerCopy = { ...customer }
      customerCopy[event.target.name] = event.target.value
      setState({ ...state, customer: customerCopy, formModified: true })
    }
 
    async function handleFormSubmit(event) {
      event.preventDefault()      // Evita que a página seja recarregada
      showWaiting(true)       // Exibe a tela de espera
      try {
        // Invoca a validação dos dados da biblioteca Zod por meio do model Customer
        Customer.parse(customer)
 
        // Se houver parâmetro na rota, significa que estamos modificando
        // um cliente já existente. A requisição será enviada ao back-end
        // usando o método PUT
        if(params.id) await myfetch.put(`/customers/${params.id}`, customer)
        // Caso contrário, estamos criando um novo cliente, e enviaremos
        // a requisição com o método POST
        else await myfetch.post('/customers', customer)
 
        // Deu certo, vamos exbir a mensagem de feedback que, quando for
        // fechada, vai nos mandar de volta para a listagem de clientes
        notify('Item salvo com sucesso.', 'success', 4000, () => {
          navigate('..', { relative: 'path', replace: true })
        })
      }
      catch(error) {
        console.error(error)
 
        if(error instanceof ZodError) {
          // Formamos um objeto contendo os erros do Zod e colocamos na variavel de estado inputErrors
          const messages = {}
          for(let i of error.issues) messages[i.path[0]] = i.message
          setState({ ...state, inputErrors: messages})
          notify('Há campos com valores inválidos no furmulário', 'error')
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
        const result = await myfetch.get(`/customers/${params.id}`)
 
        // Converte o formato de data armazenado no banco de dados
        // para o formato reconhecido pelo componente DatePicker
        result.birth_date = parseISO(result.birth_date)
 
        setState({ ...state, customer: result })
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
          { params.id ? `Editar carro #${params.id}` : 'Cadastrar novo Carro' }
        </Typography>
 
        <Box className="form-fields">
          <form onSubmit={handleFormSubmit}>
 
          <TextField
              name="cor"
              label="Cor"
              variant="filled"
              required
              fullWidth
              value={customer.state}
              onChange={handleFieldChange}
              helperText={inputErrors?.state}
              error={inputErrors?.state}
              select
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
              name="ano"
              label="Ano"
              variant="filled"
              required
              fullWidth
              value={customer.state}
              onChange={handleFieldChange}
              helperText={inputErrors?.state}
              error={inputErrors?.state}
              select
            >
              {
                Ano.map(s =>
                  <MenuItem key={s.value} value={s.value}>
                    {s.label}
                  </MenuItem>
                )
              }
            </TextField> 
            
            <TextField
              name="complements"
              label="Complemento"
              variant="filled"
              fullWidth
              value={customer.complements}
              onChange={handleFieldChange}
              helperText={inputErrors?.complements}
              error={inputErrors?.complements}
            />
 
            <TextField
              name="municipality"
              label="Município"
              variant="filled"
              required
              fullWidth
              value={customer.municipality}
              onChange={handleFieldChange}
              helperText={inputErrors?.municipality}
              error={inputErrors?.municipality}
            />
 
            <TextField
              name="state"
              label="UF"
              variant="filled"
              required
              fullWidth
              value={customer.state}
              onChange={handleFieldChange}
              helperText={inputErrors?.state}
              error={inputErrors?.state}
              select
            >
              {
                states.map(s =>
                  <MenuItem key={s.value} value={s.value}>
                    {s.label}
                  </MenuItem>
                )
              }
            </TextField>    
 
            <InputMask
              mask="(99) %9999-9999"
              formatChars={phoneMaskFormatChars}
              maskChar=" "
              value={customer.phone}
              onChange={handleFieldChange}
            >
              { () => <TextField
                  name="phone"
                  label="Telefone/celular"
                  variant="filled"
                  required
                  fullWidth
                  helperText={inputErrors?.phone}
                  error={inputErrors?.phone}
                />
              }
            </InputMask>
 
            <TextField
              name="email"
              label="E-mail"
              variant="filled"
              required
              fullWidth
              value={customer.email}
              onChange={handleFieldChange}
              helperText={inputErrors?.email}
              error={inputErrors?.email}
            />  
 
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
 
            <Box sx={{ fontFamily: 'monospace', display: 'flex', width: '100%' }}>
              {JSON.stringify(inputErrors)}
            </Box>
 
          </form>
        </Box>
      </>
    )
  }