export enum NameRequestStateE {
  // API states
  APPROVED = 'APPROVED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  CONDITIONAL = 'CONDITIONAL', // NR state
  CONDITION = 'CONDITION', // NR name state
  DRAFT = 'DRAFT',
  EXPIRED = 'EXPIRED',
  HISTORICAL = 'HISTORICAL',
  HOLD = 'HOLD',
  INPROGRESS = 'INPROGRESS',
  REJECTED = 'REJECTED',
  NRO_UPDATING = 'NRO_UPDATING',

  // additional UI states for error handling
  NOT_APPROVED = 'NOT_APPROVED',
  CONSUMED = 'CONSUMED',
  NOT_FOUND = 'NOT_FOUND',
  NEED_CONSENT = 'NEED_CONSENT',
  INVALID = 'INVALID',
}
