type VariantImageField = {
  id: string;
  url: string;
  alt: string;
  file?: File;
  sort?: Number;
};
type VariantField = {
  id: string;
  color: string;
  lens: string;
  price: number;
  stock: number;
  images: VariantImageField[];
};
type ProductFeature = {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
};
type ProductSpec = {
  id: string;
  label: string;
  value: string;
};
type ProductSpecGroup = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  specs: ProductSpec[];
};
type ProductForm = {
  name: string;
  description: string;
  slug: string;
  brand: string;
  storeId: number;
  categoryId: number;
  categoryName: string;
  version: string;
  baseImage: string;
  variants: VariantField[];
  features: ProductFeature[];
  specs: ProductSpecGroup[];
};

type StepProps = {
  next: (data: any) => void;
  prev: () => void;
};
