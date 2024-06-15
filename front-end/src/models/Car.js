import { z } from 'zod'
 
export default z.object({
 
  brand:
    z.string()
    .max(25, { message: 'O nome da marca deve ter, no máximo, 25 caracteres' }),
 
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
    .min(1000, { message: 'O preço de venda deve ser maior ou igual a 1.000' })
    .max(5000000, { message: 'O preço de venda deve ser menor ou igual a 5.000.000' })
    .nullable(),
  });