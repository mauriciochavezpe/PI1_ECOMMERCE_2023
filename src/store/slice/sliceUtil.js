import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  departamento_list: [
    "Amazonas",
    "Ancash",
    "Apurimac",
    "Arequipa",
    "Ayacucho",
    "Cajamarca",
    "Callao",
    "Cusco",
    "Huancavelica",
    "Huanuco",
    "Ica",
    "Junin",
    "La Libertad",
    "Lambayeque",
    "Lima",
    "Loreto",
    "Madre de Dios",
    "Moquegua",
    "Pasco",
    "Piura",
    "Puno",
    "San Martin",
    "Tacna",
    "Tumbes",
    "Ucayali",
  ], // Tu array de productos inicial
  tipodocumentos: ["DNI", "CARNET DE EXTRANJERIA", "RUC", "PASAPORTE"],
  status: "success",
  categories:[
    "",
    "Periféricos",
    "Monitores",
    "Laptops",
    "Case (Cajas de PC)",
    "Mouse",
    "Teclados",
    "Procesadores (CPUs)",
    "Placas Base (Motherboards)",
    "Memoria RAM",
    "Almacenamiento",
    "Tarjetas Gráficas (GPUs)",
    "Fuentes de Alimentación (PSUs)",
    "Sistemas de Refrigeración",
    "Tarjetas de Expansión",
    "Accesorios y Cables",
    "Unidades Ópticas",
    "Software",
    "Redes",
    "Impresoras y Escáneres",
    "Componentes y Repuestos",
    "Almacenamiento Externo"
  ],
  marcas:[
    "",
    "Intel",
    "AMD",
    "NVIDIA",
    "ASUS",
    "MSI",
    "Gigabyte",
    "Corsair",
    "G.SKILL",
    "Crucial",
    "Kingston",
    "Western Digital",
    "Seagate",
    "Samsung",
    "Cooler Master",
    "Thermaltake",
    "EVGA",
    "NZXT",
    "Logitech",
    "Razer",
    "HP",
    "Dell",
    "Acer",
    "Lenovo",
    "Apple",
    "Microsoft",
    "BenQ",
    "LG",
    "AOC",
    "Philips",
    "SteelSeries",
    "HyperX",
    "Toshiba",
    "ADATA",
    "Be Quiet!",
    "Noctua",
    "Fractal Design",
    "Rosewill",
    "Asrock",
    "Patriot",
    "Alienware",
    "Sapphire",
    "XFX",
    "Zotac",
    "PNY",
    "ViewSonic",
    "Roccat",
    "Mad Catz",
    "Redragon",
    "Cougar",
    "Thermaltake",
    "Biostar",
    "Lian Li",
    "SilverStone",
    "Enermax"
  ]
};

const utilCommon = createSlice({
  name: "utilCommon",
  initialState,
  reducers: {
    test(state, action) {
      state.status = "success";
    },
  },
  extraReducers: (builder) => {},
});

export const { test } =
  utilCommon.actions;
export default utilCommon.reducer;
