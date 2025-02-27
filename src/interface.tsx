export interface Product {
  title: string;
  description: string;
  price: string;
  quantity: string;
  images: File[];
  category: string;
  availability: boolean;
  _id?: string;
  discount: string;
}

export interface AdditionalDetails {
  org_Name?: string;
  industry?: string;
  org_Size?: string;
  logo: string | File;
  banner?: string | File;
  phone: string;
  address: string;
  description?: string;
  role: string;
}

export interface Blog {
  id: string;
  content: string;
  image: string;
  tags: string[];
  title: string;
  likes: string[];
  comments: {
    id: string;
    text: string;
  };
  category:
    | "Electronics"
    | "Clothing & Accessories"
    | "Home & Living"
    | "Beauty & Health"
    | "Sports & Outdoors";
}
