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
