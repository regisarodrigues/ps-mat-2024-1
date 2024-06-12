import { z } from "zod";

const maxSelling_date = new Date()
maxSelling_date.setFullYear(maxSelling_date.getFullYear())

export default z.object({
    brand: 
        z.string()
        .max(25, { message: '25 caracteres no máximo' }),

    model: 
        z.string()
        .max(25, { message: '25 caracteres no máximo' }),

    color: 
        z.string()
        .max(12, { message: '12 caracteres no máximo '}),
    
    year_manufacture: 
        z.number()
        .min(1960, { message: 'O ano de fabricação deve ser igual ou posterior a 1960' })
        .max(new Date().getFullYear(), { message: 'O ano de fabricação não pode ser posterior ao ano atual'}),

    imported: z.boolean(),

    selling_date:
    z.coerce.date()
    .max(maxSelling_date, { message: 'Data de Venda está muito no futuro' })
    .nullable(),
    
    selling_price:
    z.coerce.number()
    .gte(1000)
    .lte(5000000)
    .nullable()
})