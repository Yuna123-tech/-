
export enum View {
  MainMenu,
  Drawing,
  Writing,
  Gallery,
}

export interface Plan {
  id: number;
  type: 'drawing' | 'text';
  content: string; // base64 for drawing, text for writing
  title: string;
  createdAt: Date;
}
