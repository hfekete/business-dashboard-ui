import { FilingTypes } from '@bcrs-shared-components/enums'
import type { ApiResponseFilingI, FetchDocumentsI, StateFilingI } from '#imports'
import { FilingStatusE, FilingSubTypeE } from '#imports'

export const isFilingType =
  (filing: ApiResponseFilingI, filingType: FilingTypes = undefined, filingSubtype: FilingSubTypeE = undefined) =>
    (filingSubtype && filing.filingSubType === filingSubtype) || (filingType && filing.name === filingType)

export const isStaffFiling = (filing: ApiResponseFilingI) => {
  return isFilingType(filing, FilingTypes.ADMIN_FREEZE) ||
    isFilingType(filing, FilingTypes.COURT_ORDER) ||
    isFilingType(filing, undefined, FilingSubTypeE.DISSOLUTION_ADMINISTRATIVE) ||
    isFilingType(filing, FilingTypes.PUT_BACK_ON) ||
    isFilingType(filing, FilingTypes.REGISTRARS_NOTATION) ||
    isFilingType(filing, FilingTypes.REGISTRARS_ORDER)
}

export const isDissolutionType = (stateFiling: StateFilingI, filingSubtype: FilingSubTypeE) =>
  stateFiling.dissolution?.dissolutionType === filingSubtype

export const isRestorationType = (stateFiling: StateFilingI, filingSubtype: FilingSubTypeE) =>
  stateFiling.restoration?.type === filingSubtype

export const isFilingStatus = (filing: ApiResponseFilingI, filingStatus: FilingStatusE) =>
  filing.status === filingStatus

export const isFutureEffectiveAndPaid = (filing: ApiResponseFilingI) =>
  isFilingStatus(filing, FilingStatusE.PAID) && filing.isFutureEffective

/** Whether this filing is Future Effective Pending (overdue). */
export const isFutureEffectivePending = (filing: ApiResponseFilingI) =>
  isFutureEffectiveAndPaid(filing) && filing.effectiveDate && new Date(filing.effectiveDate) < new Date()

/** Whether this filing is Future Effective (not yet completed). */
export const isFutureEffective = (filing: ApiResponseFilingI) =>
  isFutureEffectiveAndPaid(filing) && filing.effectiveDate && new Date(filing.effectiveDate) > new Date()

/**
 * Fetches the list of documents grouped by types.
 * @param url the full URL to fetch the documents
 * @returns the fetch documents object or throws error
 */
export const fetchDocumentList = async (url: string) => {
  return await useBcrosFetch<{ documents: FetchDocumentsI }>(url, { method: 'GET' })
    .then(({ data, error }) => {
      if (error.value || !data.value) {
        console.warn('fetchDocuments() error - invalid response =', error?.value)
        throw new Error('Failed to retrieve list of available documents for the filing')
      }
      return data?.value
    })
}

/** Is True if this is a bootstrap filing item and should be displayed in the Filing History List. */
export const isBootstrapFiling = computed((): boolean => {
  return false
  // todo: fix in 22551
  // return (
  // isAmalgamationFiling ||
  // isContinuationInFiling ||
  // isIncorporationApplicationFiling ||
  // isRegistrationFiling
  // )
})
