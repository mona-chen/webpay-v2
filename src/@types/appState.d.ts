import { ConfigState } from "./config";

export type AppState = {
  config: ConfigState;
  loading: boolean;
  isAuth: boolean;
  isTransferLoading: boolean;
  transferStatus: any;
  ussd_code: any;
  trx_status: string;
  card_transaction_status: any;
  isUssdLoading: boolean;
  showBlusaltModal: boolean;
  ussd_details: any;
  card_ref: null | string;
  card_trx: any[]; // Replace 'any' with the appropriate type if possible
  cardIframeUrl: string;
  raven_pay: any;
  bank: null | string;
  cancelled: boolean;
};
