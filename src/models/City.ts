import mongoose from 'mongoose'

const CitySchema = new mongoose.Schema({
  uf: {type: String,
    required: [true, 'Favor selecionar a UF da cidade.'],
    maxlength: [2, 'UF não pode ser maior que 2 caracteres.'],
  },
  name: {type: String,
    required: [true, 'Favor preencher o nome da cidade.'],
    maxlength: [100, 'Nome da cidade não pode ser maior que 100 caracteres.'],
  }
})

export default mongoose.models.Pet || mongoose.model('City', CitySchema)
