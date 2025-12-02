export interface Store {
  id: number;
  name: string;
  slug: string;
  messengerPageId?: string | null;
  products?: Product[];
  categories?: Category[];
  blogPosts?: BlogPost[];
  seoSettings?: SEOSettings[];
  logs?: MessengerRedirectLog[];
  analytics?: Analytics[];
  createdAt: string;
}

export interface Category {
  id: number;
  storeId: number;
  store?: Store;
  name: string;
  imageUrl?: string | null;
  slug: string;
  products?: Product[];
  sort?: number;
}

export interface Product {
  id: number;
  storeId: number;
  store?: Store;
  categoryId?: number | null;
  category?: Category | null;
  name: string;
  slug: string;
  brand: string;
  description?: string | null;
  baseImage?: string | null;
  version?: string | null;
  createdAt: string;
  seoSettings?: SEOSettings[];
  logs?: MessengerRedirectLog[];
  variants?: Variant[];
  features?: ProductFeature[];
  specGroups?: ProductSpecGroup[];
  variant: Variant;
  sort?: number;
}

export interface ProductSpecGroup {
  id: number;
  productId: number;
  product?: Product;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  specs?: ProductSpec[];
}

export interface ProductSpec {
  id: number;
  groupId: number;
  group?: ProductSpecGroup;
  label: string;
  value: string;
}

export interface Variant {
  id: number;
  productId: number;
  product?: Product;
  color: string;
  lens?: string | null;
  price: number;
  stock: number;
  images?: VariantImage[];
  slug?: string | null;
  sort?: number;
}

export interface VariantImage {
  id: number;
  variantId: number;
  variant?: Variant;
  url: string;
  alt?: string | null;
  sort: number;
}

export interface ProductFeature {
  id: number;
  productId: number;
  product?: Product;
  title: string;
  description?: string | null;
  mediaUrl?: string | null;
}

export interface BlogPost {
  id: number;
  storeId: number;
  store?: Store;
  title: string;
  slug: string;
  content: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  publishedAt?: string | null;
  seoSettings?: SEOSettings[];
}

export interface SEOSettings {
  id: number;
  storeId: number;
  store?: Store;
  productId?: number | null;
  product?: Product | null;
  blogPostId?: number | null;
  blogPost?: BlogPost | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string | null;
  schemaMarkup?: unknown | null;
}

export interface MessengerRedirectLog {
  id: number;
  storeId: number;
  store?: Store;
  productId: number;
  product?: Product;
  userAgent?: string | null;
  clickedAt: string;
}

export interface Analytics {
  id: number;
  storeId: number;
  store?: Store;
  eventType: string;
  entityId?: number | null;
  timestamp: string;
}

export interface CreateStoreDTO {
  name: string;
  slug: string;
  messengerPageId?: string | null;
}

export interface UpdateStoreDTO {
  name?: string;
  slug?: string;
  messengerPageId?: string | null;
}

export interface CreateCategoryDTO {
  storeId: number;
  name: string;
  imageUrl?: string | null;
  slug: string;
}

export interface UpdateCategoryDTO {
  name?: string;
  imageUrl?: string | null;
  slug?: string;
}

export interface VariantImageInput {
  url: string;
  alt?: string | null;
  sort?: number;
}

export interface VariantInput {
  color: string;
  lens?: string | null;
  price: number | string;
  stock: number | string;
  slug?: string | null;
  images?: VariantImageInput[];
}

export interface ProductFeatureInput {
  title: string;
  description?: string | null;
  mediaUrl?: string | null;
}

export interface ProductSpecInput {
  label: string;
  value: string;
}

export interface ProductSpecGroupInput {
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  specs?: ProductSpecInput[];
}

export interface CreateProductDTO {
  storeId: number;
  categoryId?: number | null;
  name: string;
  slug: string;
  description?: string | null;
  baseImage?: string | null;
  version?: string | null;
  variants: VariantInput[];
  features?: ProductFeatureInput[];
  specGroups?: ProductSpecGroupInput[];
}

export interface UpdateProductDTO {
  storeId?: number;
  categoryId?: number | null;
  name?: string;
  slug?: string;
  description?: string | null;
  baseImage?: string | null;
  version?: string | null;
  variants?: VariantInput[];
  features?: ProductFeatureInput[];
  specGroups?: ProductSpecGroupInput[];
}

export interface CreateBlogPostDTO {
  storeId: number;
  title: string;
  slug: string;
  content: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  publishedAt?: string | null;
}

export interface UpdateBlogPostDTO {
  title?: string;
  slug?: string;
  content?: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  publishedAt?: string | null;
}

export interface CreateSEOSettingsDTO {
  storeId: number;
  productId?: number | null;
  blogPostId?: number | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string | null;
  schemaMarkup?: unknown | null;
}

export interface UpdateSEOSettingsDTO {
  productId?: number | null;
  blogPostId?: number | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string | null;
  schemaMarkup?: unknown | null;
}

export interface CreateMessengerRedirectLogDTO {
  storeId: number;
  productId: number;
  userAgent?: string | null;
}

export interface CreateAnalyticsDTO {
  storeId: number;
  eventType: "ProductView" | "MessengerClick" | "BlogRead";
  entityId?: number | null;
  timestamp?: string;
}

export type ISODateString = string;
export type ID = number;

export interface ProductCard {
  id: number;
  name: string;
  slug: string;
  baseImage?: string | null;
  version?: string | null;
  category?: { id: number; name: string; slug: string } | null;
  variantsCount?: number;
}

export interface VariantCard {
  id: number;
  slug?: string | null;
  color: string;
  lens?: string | null;
  price: number;
  stock: number;
  thumbUrl?: string | null;
}

export function coerceVariantInput(v: VariantInput): Omit<
  Variant,
  "id" | "productId" | "product" | "images"
> & {
  images?: VariantImageInput[];
} {
  return {
    color: v.color,
    lens: v.lens ?? null,
    price: typeof v.price === "string" ? parseFloat(v.price) : v.price,
    stock:
      typeof v.stock === "string" ? parseInt(v.stock as string, 10) : v.stock,
    slug: v.slug ?? null,
    images: v.images ?? [],
  };
}
