import { z } from 'zod'
 
export default z.object({
 
  brand:
    z.string()
    .max(25, { message: 'O nome da marca deve ter, no máximo, 25 caracteres' })
    .includes(' ', { message: 'O nome deve conter um espaço em branco separando nome e sobrenome' }),
 
  model:
    z.string()
    .max(25, { message: 'O modelo deve ter, no máximo, 25 caracteres' }),  
 
  color:
    z.string()
    .max(25, { message: 'A cor deve ter no máximo 25 caracteres' }),
 
  imported: z.boolean(),
 
  plates:
    z.string()
    .max(8, { message: 'A placa deve ter no máximo 25 caracteres' }),
 
  year_manufacture:
    z.number()
    .min(1960, { message: 'O ano de fabricação deve ser igual ou posterior a 1960' })
    .max(new Date().getFullYear(), { message: 'O ano de fabricação não pode ser posterior ao ano atual' }),
 
  selling_date:
    z.date()
    .max(new Date(), { message: 'A data de venda não pode estar no futuro' })
    .nullable(),  // O campo é opcional
 
  selling_price:
    z.coerce.number()
    .gte(1000) // alias .min(5)    
    .lte(5000000) // alias .max(5)
    .nullable()  
})