import { z } from 'zod';
import { cpf } from 'cpf-cnpj-validator';

/*
  O cliente deve ser maior de 18 anos.
  Por isso, para validar a data de nascimento, calculamos a
  data máxima em que o cliente pode ter nascido para ter, pelo
  menos, 18 anos na data de hoje
*/
const maxBirthDate = new Date(); // Hoje
maxBirthDate.setFullYear(maxBirthDate.getFullYear() - 18);

// O cliente pode ter nascido há, no máximo, 120 anos
const minBirthDate = new Date();
minBirthDate.setFullYear(minBirthDate.getFullYear() - 120);

export default z.object({
  name: z
    .string()
    .min(5, { message: 'O nome deve ter, no mínimo, 5 caracteres' })
    .includes(' ', {
      message:
        'O nome deve conter um espaço em branco separando nome e sobrenome',
    }),

  ident_document: z
    .string()
    // Remove os sublinhados se o usuário não preencheu totalmente
    // o CPF
    .transform((val) => val.replace('_', ''))
    .refine((val) => val.length === 14, { message: 'O CPF está incompleto' })
    .refine((val) => cpf.isValid(val), { message: 'CPF inválido' }),

  birth_date:
    // coerce força a conversão para o tipo Date, se o valor recebido for string
    z.coerce
      .date()
      .min(minBirthDate, {
        message: 'Data de nascimento está muito no passado',
      })
      .max(maxBirthDate, { message: 'O cliente deve ser maior de 18 anos' })
      .nullable(), // O campo é opcional

  street_name: z
    .string()
    .max(40, { message: 'O logradouro pode ter, no máximo, 40 caracteres' }),

  house_number: z
    .string()
    .max(10, { message: 'O número pode ter, no máximo, 10 caracteres' }),

  complements: z
    .string()
    .max(20, { message: 'O complemento pode ter, no máximo, 20 caracteres' })
    .nullable(),

  municipality: z
    .string()
    .max(40, { message: 'O município pode ter, no máximo, 40 caracteres ' }),

  state: z
    .string()
    .length(2, { message: 'UF deve ter, exatamente, 2 caracteres' }),

  phone: z
    .string()
    .transform((val) => val.trim())
    // Depois de um transform(), não podemos mais usar length(). Por isso,
    // precisamos usar uma função personalizada com refine() para validar
    // o tamanho do campo
    .refine((val) => val.length === 15, {
      message: 'O número do telefone/celular está incompleto',
    }),

  email: z.string().email({ message: 'E-mail inválido' }),
});
