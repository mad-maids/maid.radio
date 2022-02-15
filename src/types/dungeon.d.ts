export interface Voice {
  id?: number;
  file?: string;
  chat?: number;
  type?: string;
}

export interface Count {
  type: string;
  count: number;
}

export interface OnlyId {
  id: number;
}
