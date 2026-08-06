export interface ReceiptLine {
  text: string;
  align?: 'left' | 'center' | 'right';
  bold?: boolean;
}

export interface ReceiptData {
  lines: ReceiptLine[];
  cutPaper?: boolean;
}

export interface IPrinterService {
  printReceipt(data: ReceiptData): Promise<boolean>;
  getAvailablePrinters(): Promise<string[]>;
  isConnected(): Promise<boolean>;
}

export class PrinterService implements IPrinterService {
  async printReceipt(_data: ReceiptData): Promise<boolean> {
    console.warn('[PrinterService] Not yet implemented');
    return false;
  }

  async getAvailablePrinters(): Promise<string[]> {
    return [];
  }

  async isConnected(): Promise<boolean> {
    return false;
  }
}
