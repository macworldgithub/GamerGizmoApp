import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NamedEntity {
  id: number;
  name: string;
}

interface AdDetails {
  title: string;
  description: string;
  brand: string;
  brandId: number | null;
  model: string;
  modelId: number | null;
  condition: string;
  conditionId: number | null;
  location: string;
  locationId: number | null;
}

interface AdState {
  city: NamedEntity | null;
  category: NamedEntity | null;
  details: AdDetails;
  price: string | null;
  imageUri: string | null;
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
  imageUri: null,
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
    setDetails: (state, action: PayloadAction<AdDetails>) => {
      state.details = action.payload;
    },
    setPrice: (state, action: PayloadAction<string>) => {
      state.price = action.payload;
    },
    setImageUri: (state, action: PayloadAction<string>) => {
      state.imageUri = action.payload;
    },
  },
});

export const { setCity, setCategory, setDetails, setPrice, setImageUri } = adSlice.actions;
export default adSlice.reducer;
