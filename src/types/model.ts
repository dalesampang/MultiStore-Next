// types/models.ts
// Typesafe TypeScript models and DTOs derived from your Prisma schema.
// These are plain TS types/interfaces you can use across your app for strong typing,
// independent of Prisma Client's generated types.

// ---------- Core Entities ----------

export interface Store {
  id: number;
  name: string;
  slug: string;
  messengerPageId?: string | null;
  products?: Product[]; // back relation
  categories?: Category[];
  blogPosts?: BlogPost[];
  seoSettings?: SEOSettings[];
  logs?: MessengerRedirectLog[];
  analytics?: Analytics[];
  createdAt: string; // Date serialized over the wire (ISO)
}

export interface Category {
  id: number;
  storeId: number;
  store?: Store; // relation
  name: string;
  imageUrl?: string | null;
  slug: string;
  products?: Product[];
}

export interface Product {
  id: number;
  storeId: number;
  store?: Store; // relation
  categoryId?: number | null;
  category?: Category | null; // relation
  name: string;
  slug: string;
  brand: string;
  description?: string | null;
  baseImage?: string | null;
  version?: string | null;
  createdAt: string; // ISO date string
  seoSettings?: SEOSettings[];
  logs?: MessengerRedirectLog[];
  variants?: Variant[];
  features?: ProductFeature[];
  specGroups?: ProductSpecGroup[];
  variant: Variant;
}

export interface ProductSpecGroup {
  id: number;
  productId: number;
  product?: Product; // relation
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  specs?: ProductSpec[];
}

export interface ProductSpec {
  id: number;
  groupId: number;
  group?: ProductSpecGroup; // relation
  label: string;
  value: string;
}

export interface Variant {
  id: number;
  productId: number;
  product?: Product; // relation
  color: string;
  lens?: string | null;
  price: number;
  stock: number;
  images?: VariantImage[];
  slug?: string | null;
}

export interface VariantImage {
  id: number;
  variantId: number;
  variant?: Variant; // relation
  url: string;
  alt?: string | null;
  sort: number;
}

export interface ProductFeature {
  id: number;
  productId: number;
  product?: Product; // relation
  title: string;
  description?: string | null;
  mediaUrl?: string | null; // image or video
}

export interface BlogPost {
  id: number;
  storeId: number;
  store?: Store; // relation
  title: string;
  slug: string;
  content: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  publishedAt?: string | null; // ISO
  seoSettings?: SEOSettings[];
}

export interface SEOSettings {
  id: number;
  storeId: number;
  store?: Store; // relation
  productId?: number | null;
  product?: Product | null; // relation
  blogPostId?: number | null;
  blogPost?: BlogPost | null; // relation
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string | null;
  schemaMarkup?: unknown | null; // Json
}

export interface MessengerRedirectLog {
  id: number;
  storeId: number;
  store?: Store; // relation
  productId: number;
  product?: Product; // relation
  userAgent?: string | null;
  clickedAt: string; // ISO
}

export interface Analytics {
  id: number;
  storeId: number;
  store?: Store; // relation
  eventType: string; // "ProductView" | "MessengerClick" | "BlogRead"
  entityId?: number | null;
  timestamp: string; // ISO
}

// ---------- DTOs (Create/Update payloads) ----------
// These mirror the shapes you typically send from the client,
// keeping relations as IDs and nested creates explicit.

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
  sort?: number; // default handled server-side
}

export interface VariantInput {
  color: string;
  lens?: string | null;
  price: number | string; // allow string from forms, parse server-side
  stock: number | string; // allow string from forms
  slug?: string | null;
  images?: VariantImageInput[]; // client sends array; server maps to create
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
  variants?: VariantInput[]; // if updating variants client-side
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
  publishedAt?: string | null; // ISO
}

export interface UpdateBlogPostDTO {
  title?: string;
  slug?: string;
  content?: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  publishedAt?: string | null; // ISO
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
  timestamp?: string; // ISO
}

// ---------- Helpers ----------

export type ISODateString = string;
export type ID = number;

// Narrowed view models for list pages / cards
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
  thumbUrl?: string | null; // e.g., first image url
}

// Utility to coerce incoming form values into canonical numeric types
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
