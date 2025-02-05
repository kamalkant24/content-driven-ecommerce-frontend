export interface Product {
    title: string;
    description: string;
    price: string;
    quantity: string;
    images: File[];
    category: string,
    availability:boolean
    _id?:string
}