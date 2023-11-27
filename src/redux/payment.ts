/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "@ravenpay/raven-bank-ui";
import api from "../helpers/axios";
import { AppState } from "../@types/appState";

export const getPaymentConfig = createAsyncThunk(
  "/get_payment_config",
  async (payload: string | null, thunkAPI) => {
    try {
      const data = await api.get(`webpay/web/get_payment?trx_ref=${payload}`);

      if (data?.data?.status === "success") {
        await thunkAPI.dispatch(setConfig(data?.data?.data));
      } else {
        toast.error("Something went wrong fetching this payment data");
      }
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const confirmTransfer = createAsyncThunk(
  "/confirm-transfer",
  async (payload: any, thunkAPI: any) => {
    try {
      const data = await api.get(`webpay/web/get_payment?trx_ref=${payload}`);

      if (data?.data?.status === "success") {
        await thunkAPI.dispatch(setTransferStatus(data?.data?.data));
      }
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const initiateCardTransaction = createAsyncThunk(
  "/initiate-card-transaction",
  async (payload: any, thunkAPI: any) => {
    try {
      const data = await api.post(
        "/webpay/web/initiate_card_transaction",
        payload
      );

      if (data?.data?.status === "success") {
        // await thunkAPI.dispatch(setConfig(data?.data?.data));
        await thunkAPI.dispatch(
          setCardRef(data?.data?.data?.payment_reference)
        );
      } else {
        toast.error("Unable to initiate card transaction, please try again");
      }
      return data?.data;
    } catch (error) {
      toast.error("Error initializing payment, please try again later");
      console.log(error);
    }
  }
);

export const initiateCardTransactionTwo = createAsyncThunk(
  "/initiate-card-transaction-two",
  async (payload: any, thunkAPI: any) => {
    try {
      const data = await api.post(
        "/webpay/web/initiate_card_transaction2",
        payload
      );

      if (data?.data?.status === "success") {
        // await thunkAPI.dispatch(setConfig(data?.data?.data));
        await thunkAPI.dispatch(
          setCardRef(data?.data?.data?.payment_reference)
        );
      } else {
        toast.error("Unable to initiate card transaction, please try again");
      }
      return data?.data;
    } catch (error) {
      toast.error("Error initializing payment, please try again later");
      console.log(error);
    }
  }
);

export const processCardToken = createAsyncThunk(
  "/process-card-token",
  async (payload: any, _thunkAPI: any) => {
    try {
      const data = await api.post("/webpay/web/verify_card_token", payload);

      if (data?.data?.status === "success") {
        // await thunkAPI.dispatch(setCardRef(data?.data?.data?.payment_reference))
      } else {
        toast.error(
          "We couldn't process your token, token is expired or invalid"
        );
      }
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const processBlusaltCardToken = createAsyncThunk(
  "/init-blusalt-card-token",
  async (payload: any, _thunkAPI: any) => {
    try {
      const data = await api.post("/webpay/web/complete_auth_capture", payload);

      if (data?.data?.status === "success") {
        // await thunkAPI.dispatch(setCardRef(data?.data?.data?.payment_reference))
      } else {
        toast.error(
          "We couldn't process your token, token is expired or invalid"
        );
      }
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const initiate3dsTransaction = createAsyncThunk(
  "/init_3ds_transaction",
  async (payload: any, thunkAPI: any) => {
    try {
      const data = await api.post(
        "/webpay/web/initiate_card_transaction_3ds",
        payload
      );

      if (data?.data?.status === "success") {
        await thunkAPI.dispatch(
          setCardRef(data?.data?.data?.payment_reference)
        );
      } else {
        toast.error("Unable to initiate card transaction, please try again");
      }
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getBankAccount = createAsyncThunk(
  "/get_bank_account",
  async (payload: any, thunkAPI: any) => {
    try {
      const data = await api.get(
        `/webpay/web/get_bank_account?trx_ref=${payload}`
      );
      // console.log(data, 'transfer')
      if (data?.data?.status === "success") {
        await thunkAPI.dispatch(setAccountNo(data?.data?.data));
      }
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const initiateUssdPayment = createAsyncThunk(
  "/initiate_ussd_payment",
  async (payload: any, thunkAPI: any) => {
    try {
      const data = await api.get(
        `/webpay/web/get_ussd_reference?trx_ref=${payload}`
      );

      if (data?.data?.status === "success") {
        await thunkAPI.dispatch(setUssdDetails(data?.data?.data));
      } else {
        toast.error("An error occurred, please try again");
      }
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUssdCode = createAsyncThunk(
  "/get-ussd-code",
  async (payload: any, thunkAPI: any) => {
    try {
      const data = await api.get(
        `webpay/web/get_ussd_string?trx_ref=${payload.ref}&bank_code=${payload.code}`
      );

      if (data?.data?.status === "success") {
        await thunkAPI.dispatch(setUssd(data?.data?.data));
      }
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const verifyCardTrx = createAsyncThunk(
  "/verify_card_transaction",
  async (payload: any, thunkAPI: any) => {
    try {
      const data = await api.get(
        `/webpay/web/verify_card_transaction?payment_reference=${payload}`
      );

      if (data?.data?.status === "success") {
        await thunkAPI.dispatch(setCardTransactionStatus(data?.data));
      }
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const initRavenPay = createAsyncThunk(
  "/init-raven-pay",
  async (payload: any, thunkAPI: any) => {
    try {
      const data = await api.get(
        `webpay/web/get_pay_with_raven_ref?trx_ref=${payload}`
      );

      if (data?.data?.status === "success") {
        await thunkAPI.dispatch(setRavenPayStatus(data?.data?.data));
      } else {
        toast.error("Something went wrong, please try again");
      }
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState: AppState = {
  config: {},
  loading: false,
  isAuth: false,
  isTransferLoading: false,
  transferStatus: {},
  ussd_code: {},
  trx_status: "i",
  card_transaction_status: {},
  isUssdLoading: false,
  showBlusaltModal: false,
  ussd_details: {},
  card_ref: null,
  card_trx: [],
  cardIframeUrl: "",
  raven_pay: {},
  bank: null,
};

export const payment = createSlice({
  name: "payment",
  initialState,

  reducers: {
    setConfig: (state: any, action: any) => {
      state.config = action.payload;
      state.isAuth = true;
    },

    setAccountNo: (state: any, action: any) => {
      state.bank = action.payload;
      state.isAuth = true;
    },

    setTransferStatus: (state: any, action: any) => {
      state.transferStatus = action.payload;
      state.isAuth = false;
    },

    setCardTransactionStatus: (state: any, action: any) => {
      state.card_transaction_status = action.payload;
      state.isAuth = false;
    },

    setUssdDetails: (state: any, action: any) => {
      state.ussd_details = action.payload;
      state.isAuth = false;
    },

    setUssd: (state: any, action: any) => {
      state.ussd_code = action.payload;
      state.isAuth = false;
    },

    setCardRef: (state: any, action: any) => {
      state.card_ref = action.payload;
      state.isAuth = false;
    },

    setRavenPayStatus: (state: any, action: any) => {
      state.raven_pay = action.payload;
      state.isAuth = false;
    },
    setStatus: (state: any, action: any) => {
      state.trx_status = action.payload;
      state.isAuth = false;
    },
    setShowBlusaltModal: (state: any, action: any) => {
      state.showBlusaltModal = action.payload;
      state.isAuth = false;
    },
    setIframeUrl: (state: any, action: any) => {
      state.cardIframeUrl = action.payload;
      state.isAuth = false;
    },
  },

  extraReducers: (builder) => {
    // Use builder.addCase for each async thunk action
    builder
      .addCase(getPaymentConfig.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPaymentConfig.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getPaymentConfig.rejected, (state) => {
        state.loading = false;
        state.isAuth = false;
      })
      // Repeat the process for other async thunk actions...
      .addCase(confirmTransfer.pending, (state) => {
        state.isTransferLoading = true;
      })
      .addCase(confirmTransfer.fulfilled, (state) => {
        state.isTransferLoading = false;
      })
      .addCase(confirmTransfer.rejected, (state) => {
        state.isTransferLoading = false;
        state.isAuth = false;
      })
      // ... Repeat for other async thunk actions ...
      .addCase(getUssdCode.pending, (state) => {
        state.isUssdLoading = true;
      })
      .addCase(getUssdCode.fulfilled, (state) => {
        state.isUssdLoading = false;
      })
      .addCase(getUssdCode.rejected, (state) => {
        state.isUssdLoading = false;
        state.isAuth = false;
      });
  },
});

export const {
  setConfig,
  setAccountNo,
  setCardRef,
  setRavenPayStatus,
  setCardTransactionStatus,
  setUssdDetails,
  setUssd,
  setShowBlusaltModal,
  setTransferStatus,
  setStatus,
  setIframeUrl,
} = payment.actions;

export default payment.reducer;
