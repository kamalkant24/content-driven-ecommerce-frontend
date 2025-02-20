export interface Product {
  title: string;
  description: string;
  price: string;
  quantity: string;
  images: File[];
  category: string;
  availability: boolean;
  _id?: string;
}

export interface AdditionalDetails {
  org_Name?: string;
  industry?: string;
  org_Size?: string;
  profile_img: string | File;
  org_Banner?: string | File;
  phone: string;
  address: string;
  org_Description?: string;
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
}
