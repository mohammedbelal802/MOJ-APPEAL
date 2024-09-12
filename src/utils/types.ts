interface FINGER_PROPS {
  type: string;
  image: string;
}
interface PARAMETERS_PROPS {
  fingers: Array<FINGER_PROPS>;
  id: string;
}

export interface VERIFY_FINGERPRINT_PROPS {
  Action: string;
  Parameters: PARAMETERS_PROPS;
}

export interface SUBMIT_FINGERPRINT_PROPS {
  id: string;
  sessionNumber: string;
  caseNumber: string;
  year: string;
  status: string;
}

export interface AUTHORIZE_PROPS {
  year: string;
  sessionNumber: string;
  caseNumber: string;
}


export interface FILE_PROPS {
  fileSharepointId: string;
  fileName: string;

}

export interface INQUIRY_TABLE_PROPS {
  date: string;
  job:string;
  name:string;
  requestDesc:string;
  requestType: string;
  verificationType: string;
  files: Array<FILE_PROPS>;
}