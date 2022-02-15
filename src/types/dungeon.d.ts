export interface Voice {
  id?: number;
  file?: string;
  chat?: number;
  type?: "audio" | "voice";
}

export interface Count {
  type: string;
  count: number;
}

export interface OnlyId {
  id: number;
}
