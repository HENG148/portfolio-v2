export interface Bullet {
  text: string;
}

export interface Experience{
  _id: string;
  title: string;
  company: string;
  period: string;
  bullet: Bullet[];
}