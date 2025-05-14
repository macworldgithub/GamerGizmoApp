import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NamedEntity {
  id: number;
  name: string;
}

interface AdDetails {
  title: string;
  description: string;
  stock?: string | number;
  brand: string | null;
  brandId: number | null;
  model: string | null;
  modelId: number | null;
  condition: string;
  conditionId: number | null;
  location: string;
  locationId: number | null;

  itemType?: "components" | "accessories" | ""; 
  componentType?: string; 
  componentTypeId?: number;
  accessoryType?: string; 
}

interface AdState {
  city: NamedEntity | null;
  category: NamedEntity | null;
  details: AdDetails;
  price: string | null;
  imageUris: string[];
}

const initialState: AdState = {
  city: null,
  category: null,
  details: {
    title: '',
    description: '',
    brand: '',
    brandId: null,
    model: '',
    modelId: null,
    condition: '',
    conditionId: null,
    location: '',
    locationId: null,


  },
  price: null,
   imageUris: [],
};

const adSlice = createSlice({
  name: 'ad',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<NamedEntity>) => {
      state.city = action.payload;
    },
    setCategory: (state, action: PayloadAction<NamedEntity>) => {
      state.category = action.payload;
    },
    setDetails: (state, action: PayloadAction<Partial<AdDetails>>) => {
      state.details = {
        ...state.details,
        ...action.payload,
      };
    },
    setPrice: (state, action: PayloadAction<string>) => {
      state.price = action.payload;
    },
    setImageUris: (state, action: PayloadAction<string[]>) => {
      state.imageUris = action.payload;
    },
  },
});

export const { setCity, setCategory, setDetails, setPrice, setImageUris, } = adSlice.actions;
export default adSlice.reducer;
