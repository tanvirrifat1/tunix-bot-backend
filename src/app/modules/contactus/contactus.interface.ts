export type InquiryStatus = 'New' | 'Contacted' | 'Resolved';
export type IInquiry = {
  name: string;
  phone: string;
  message: string;
  status: InquiryStatus;
};
