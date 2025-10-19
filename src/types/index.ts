
export type User = {
  name: string;
  lastName: string;
  birthDay: string;
};

export type Plan = {
  name: string;
  price: number;
  description: string[];
  age: number;
};

export type PlansResponse = {
  list: Plan[];
};