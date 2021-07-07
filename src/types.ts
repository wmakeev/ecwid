/** [CreateStatus](https://api-docs.ecwid.com/reference/products#section-createstatus) response object */
export interface CreateStatus {
  /** ID of the created entity */
  id: number
}

/** [UpdateStatus](https://api-docs.ecwid.com/reference/products#updatestatus) */
export interface UpdateStatus {
  /** The number of updated products (1 or 0 depending on whether the update was successful) */
  updateCount: number
}

/** [Error](https://api-docs.ecwid.com/reference/products#section-errors). In case of error, Ecwid responds with an error HTTP status code and, optionally, JSON-formatted body containing error description */
export interface ResponseError {
  /** Error message */
  errorMessage: string

  /** Error code */
  errorCode: string
}

export interface SearchResult<T> {
  /** The total number of found items (might be more than the number of returned items) */
  total: number

  /** The total number of the items returned in this batch */
  count: number

  /** Offset from the beginning of the returned items list (for paging) */
  offset: number

  /** Maximum number of returned items. Maximum allowed value: 100. Default value: 100 */
  limit: number

  /** Items list */
  items: T[]
}

/** [BatchRequest](https://api-docs.ecwid.com/reference/batch-requests#section-batchrequest) */
export interface BatchRequest {
  /** Set an optional request ID so you can find a specific request easier in the response */
  id?: string

  /** Path to Ecwid REST API endpoint. Example: `/orders?offset=100&customer=johnsmith@example.com&paymentStatus=PAID,AWAITING_PAYMENT`. It is not necessary to provide access token in this field. List of all API endpoints */
  path: string

  /** HTTP method you would like to use. Available methods: `GET`, `POST`, `PUT`, `DELETE` */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'

  /** Optional request body for your requests. Required when creating new entities or updating them. For example: send new order details when creating orders, new product details when creating products and so on */
  body?: object
}

export interface BatchRequestResult {
  ticket: string
}

export interface RequestDetails<T> {
  /** Optional request ID you specified for each API request */
  id: string

  /**
   * - `COMPLETED` – All requests were completed;
   * - `FAILED` – if response HTTP code was not `200 OK`;
   * - `NOT_EXECUTED` – request was not executed, because previous requests failed. See Handling failed requests to learn more details
   */
  status: 'COMPLETED' | 'FAILED' | 'NOT_EXECUTED'

  /** Response body for your requests. `escapedHttpBody` is returned instead if `escapedJson` parameter is `true` in your batch status request. For example: details of orders found, status of a discount coupon update, id of a product created, etc. Check examples for each [endpoint](https://api-docs.ecwid.com/reference-link/rest-api) */
  httpBody: T

  /** Escaped JSON string of response body for each API request in a batch. Returned if `escapedJson` parameter is `true` in your batch status request */
  escapedHttpBody: string

  /** HTTP status code from Ecwid API for a request */
  httpStatusCode: number

  /** HTTP status reason phrase */
  httpStatusLine: string
}

/** [BatchRequestStatus](https://api-docs.ecwid.com/reference/batch-requests#section-batchrequeststatus) */
export interface BatchRequestStatus<T> {
  /** `QUEUED` – no requests were completed yet; `IN_PROGRESS` – there is at least one completed request; `COMPLETED` – All requests were completed */
  status: 'QUEUED' | 'IN_PROGRESS' | 'COMPLETED'

  /** Total number of API requests */
  totalRequests: number

  /** Number of completed API requests */
  completedRequests: number

  /** Details of requests made to Ecwid API */
  responses: RequestDetails<T>[]
}

/** [Translations](https://api-docs.ecwid.com/reference/products#section-translations) */
export interface Translations {
  /** Translations for each available language. If no other translations are provided, the default language translations is returned. See available languages in store language settings */
  [ISO_LANG_CODE: string]: string
}

/** [WholesalePrice](https://api-docs.ecwid.com/reference/products#section-wholesaleprice) */
export interface WholesalePrice {
  /**	Number of product items on this wholesale tier */
  quantity: number

  /** Product price on the tier */
  price: number
}

/** [TaxInfo](https://api-docs.ecwid.com/reference/products#section-taxinfo) */
export interface TaxInfo {
  /** **`READONLY`** Default tax rate (%) for including into product price. Is a sum of all enabled taxes included in product price for the store location. Read only */
  readonly defaultLocationIncludedTaxRate?: number

  /** Array of internal Ecwid tax IDs, as listed in [Store profile](https://api-docs.ecwid.com/reference-link/store-profile). Empty array if no manual taxes are enabled or automatic taxes are enabled */
  enabledManualTaxes: number[]

  /** `true` to apply taxes to this product, `false` otherwise */
  taxable: boolean
}

/** [ProductOptionChoice](https://api-docs.ecwid.com/reference/products#section-productoptionchoice) */
export interface ProductOptionChoice {
  /** Option selection text, e.g. `Green` */
  text?: string

  /** Available translations for product option selection text */
  textTranslated?: Translations

  /** Percent or absolute value of the option's price markup. Positive, negative and zero values are allowed. Default is `0` */
  priceModifier?: number

  /** Option markup calculation type. `PERCENT` or `ABSOLUTE`. Default is `ABSOLUTE`. */
  priceModifierType?: 'PERCENT' | 'ABSOLUTE'
}

/** [ProductOption](https://api-docs.ecwid.com/reference/products#section-productoption) */
export interface ProductOption {
  /** One of `SELECT`, `RADIO`, `CHECKBOX`, `TEXTFIELD`, `TEXTAREA`, `DATE`, `FILES` */
  type:
    | 'SELECT'
    | 'RADIO'
    | 'CHECKBOX'
    | 'TEXTFIELD'
    | 'TEXTAREA'
    | 'DATE'
    | 'FILES'

  /** Product option name, e.g. `Color` */
  name: string

  /** Available translations for product option name */
  nameTranslated?: Translations

  /** `true` if this option is required, `false` otherwise. Default is false */
  required: boolean

  /** All possible option selections for the types `SELECT`, `CHECKBOX` or `RADIO`. *Omit this field for product options with no selection (e.g. text, datepicker or upload file options)* */
  choices?: ProductOptionChoice[]

  /** The number, starting from `0`, of the option's default selection. Only presents if the type is `SELECT` or `RADIO` */
  defaultChoice?: number
}

/** [ShippingSettings](https://api-docs.ecwid.com/reference/products#section-shippingsettings) */
export interface ShippingSettings {
  /**
   * One of: `GLOBAL_METHODS`, `SELECTED_METHODS`, `FLAT_RATE`, `FREE_SHIPPING`.
   *
   * - `GLOBAL_METHODS` – all standard shipping methods set up in store settings;
   * - `SELECTED_METHODS` – Ecwid will use enabledMethods and disabledMethods list to make shipping calculations;
   * - `FLAT_RATE` – sets flat rate for product's shipping, see flatRate field.
   */
  type?: 'GLOBAL_METHODS' | 'SELECTED_METHODS' | 'FLAT_RATE' | 'FREE_SHIPPING'
  /** Additional cost for shipping methods set by merchant (global and selected) */
  methodMarkup?: number

  /**Flat rate cost for shipping this product */
  flatRate?: number

  /** IDs of shipping methods that need to be excluded from calculation when this product is in cart. IDs can be retrieved in [Store profile](https://api-docs.ecwid.com/reference-link/store-profile) */
  disabledMethods?: string[]

  /** IDs of shipping methods which will only be shown when this product is in cart. No other shipping methods will be shown. IDs can be retrieved in [Store profile](https://api-docs.ecwid.com/reference-link/store-profile) */
  enabledMethods?: string[]
}

export type AttributeType =
  | 'CUSTOM'
  | 'UPC'
  | 'BRAND'
  | 'GENDER'
  | 'AGE_GROUP'
  | 'COLOR'
  | 'SIZE'
  | 'PRICE_PER_UNIT'
  | 'UNITS_IN_PRODUCT'

export type AttributeShow = 'NOTSHOW' | 'DESCR' | 'PRICE'

export interface Attribute {
  /** Attribute internal unique ID */
  id: number

  /** Attribute title. Product attribute with an empty name field will also be returned. */
  name: string

  /** Attribute type. There are user-defined attributes, general attributes and special 'price per unit’ attributes. The `type` field contains one of the following: `CUSTOM`, `UPC`, `BRAND`, `GENDER`, `AGE_GROUP`, `COLOR`, `SIZE`, `PRICE_PER_UNIT`, `UNITS_IN_PRODUCT` */
  type: AttributeType

  /** Defines where to display the product attribute value:. Supported values: `NOTSHOW`, `DESCR`, `PRICE` */
  show: AttributeShow
}

/** [AttributeValue](https://api-docs.ecwid.com/reference/products#section-attributevalue) */
export interface AttributeValue {
  /**	Unique attribute ID. See Product Classes for the information on attribute IDs. */
  id?: number

  /** **`READONLY`** Attribute displayed name */
  readonly name?: string

  /** One of `UPC` , `BRAND` . This can be used instead of id to quickly set the basic product attributes values without numeric id: UPC and brand */
  alias?: 'UPC' | 'BRAND'

  /** Attribute value */
  value?: string

  /** **`READONLY`** Attribute type. There are user-defined attributes, general attributes and special 'price per unit’ attributes. The `type` field contains one of the following: `CUSTOM`, `UPC`, `BRAND`, `GENDER`, `AGE_GROUP`, `COLOR`, `SIZE`, `PRICE_PER_UNIT`, `UNITS_IN_PRODUCT` */
  readonly type?: AttributeType

  /** **`READONLY`** Defines where to display the product attribute value:. Supported values: `NOTSHOW`, `DESCR`, `PRICE` */
  readonly show?: 'NOTSHOW' | 'DESCR' | 'PRICE'
}

/** [RelatedCategory](https://api-docs.ecwid.com/reference/products#section-relatedcategory) */
export interface RelatedCategory {
  /** `true` if the "N random related products from a category" option is enabled. `false` otherwise */
  enabled?: boolean

  /** Id of the related category. Zero value means "any category", that is, random products from the whole store. */
  categoryId: number

  /** Number of random products from the given category to be shown as related */
  productCount?: number
}

/** [RelatedProducts](https://api-docs.ecwid.com/reference/products#section-relatedproducts) */
export interface RelatedProducts {
  /** IDs of the related products, sort order is taken into the account */
  productIds: number[]

  /** Describes the "N random related products from a category" option */
  relatedCategory?: RelatedCategory
}

/** [ProductDimensions](https://api-docs.ecwid.com/reference/products#section-productdimensions) */
export interface ProductDimensions {
  /** Length of a product */
  length?: number

  /** Width of a product */
  width?: number

  /**Height of a product */
  height?: number
}

/** [FavoritesStats](https://api-docs.ecwid.com/reference/products#section-favoritesstats) */
export interface FavoritesStats {
  /** The actual number of 'likes' of this product */
  count: number

  /** The displayed number of likes. May differ from the `count` if, for example, the value is more than 1000, than it will show 1K instead of the precise number */
  displayedCount: string
}

/** [ProductMedia](https://api-docs.ecwid.com/reference/products#section-productmedia) */
export interface ProductMedia {
  /** Images of this product and their details */
  images: ProductImage
}

/** [ProductImage](https://api-docs.ecwid.com/reference/products#section-productimage) */
export interface ProductImage {
  /** Internal image ID */
  id: number

  /** The sort weight of the image in the gallery images list. The less the number, the closer the image to the beginning of the gallery */
  orderBy: number

  /** `true` if this is a main product image. `false` if gallery image */
  isMain: boolean

  /** URL of the product thumbnail resized to fit 160x160px */
  image160pxUrl: string

  /** URL of the product thumbnail displayed on the product list pages. Thumbnails size is defined in the store settings. Default size of the biggest dimension is 400px */
  image400pxUrl: string

  /** Product HD thumbnail URL resized to fit 800x800px */
  image800pxUrl: string

  /** URL of the product image resized to fit 1500x1500px */
  image1500pxUrl: string

  /** URL of the image in its original resolution */
  imageOriginalUrl: string
}

/** [CategoriesInfo](https://api-docs.ecwid.com/reference/products#section-categoriesinfo) */
export interface CategoriesInfo {
  /** Category ID */
  id: number

  /** `true` if category is enabled, `false` otherwise */
  enabled: boolean
}

/** [OptionValue](https://api-docs.ecwid.com/reference/products#section-optionvalue) */
export interface OptionValue {
  /** Option name */
  name: string

  /** Available translations for product option name */
  nameTranslated: Translations

  /** Option value */
  value: string

  /** Available translations for product option value */
  valueTranslated: Translations
}

export interface ProductFile {
  /** Internal ID of the file */
  id: number

  /** File name */
  name: string

  /** File description defined by the store administrator */
  description: string

  /** File size, bytes (64-bit integer) */
  size: number

  /** Direct link to the file. Important: to download the file, add your API token to this URL like this: https://app.ecwid.com/api/v3/4870020/products/37208340/files/7215102?token=YOUR-API-TOKEN */
  adminUrl: string
}

export interface Variation {
  /** Variation ID */
  id: number

  /** Variation # number, which is displayed in the variations table in Control panel */
  combinationNumber: number

  /** Set of options that identifies this variation. An array of name-value pairs */
  options: OptionValue[]

  /** Variation SKU. Omitted if the variation inherits the base product's SKU */
  sku: string

  /** URL of the product variation thumbnail displayed on the product list pages. Thumbnails size is defined in the store settings. Default size of biggest dimension is 400px. Omitted if the variation inherits the base product's image. The original uploaded product image is available in the `originalImageUrl` field. */
  thumbnailUrl: string

  /** URL of the product variation image resized to fit 1500x1500px. Omitted if the variation inherits the base product's image. The original uploaded product image is available in the `originalImageUrl` field. */
  imageUrl: string

  /** URL of the product variation thumbnail resized to fit 160x160px. Omitted if the variation inherits the base product's image. The original uploaded product image is available in the `originalImageUrl` field. */
  smallThumbnailUrl: string

  /** Product variation HD thumbnail URL resized to fit 800x800px. Omitted if the variation inherits the base product's image. */
  hdThumbnailUrl: string

  /** URL of the original not resized product variation image. Omitted if the variation inherits the base product's image. */
  originalImageUrl: string

  /** Amount of the variation items in stock. If `sku` is omitted, then `quantity` of the variation is nested from base product. If `sku` is present, the variation has its own quantity value. */
  quantity: number

  /** `true` if the variation has unlimited stock (that is, never runs out) */
  unlimited: boolean

  /** Variation price. Omitted if the variation inherits the base product's price. */
  price: number

  /** Sorted array of the variation's wholesale price tiers (quantity limit and price). Omitted if the variation inherits the base product's tiered price settings. */
  wholesalePrices: WholesalePrice[]

  /** Variation weight in the units defined in store settings. Omitted if the variation inherits the base product's weight. */
  weight: number

  /** The minimum 'warning' amount of the product items in stock for this variation, if set. When the variation in stock amount reaches this level, the store administrator gets an email notification. Omitted if the variation inherits the base product's settings */
  warningLimit: number

  /** Variation's UPC attribute and its value */
  attributes: AttributeValue[]

  /** Variation's sale price displayed strike-out in the customer frontend Omitted if empty */
  compareToPrice: number
}

/** [Product](https://api-docs.ecwid.com/reference/products#section-product) */
export interface Product {
  /** **`READONLY`** Unique integer product identifier */
  readonly id?: number

  /** Product SKU. Items with options can have several SKUs specified in the product variations. If this field is empty, Ecwid will generate new unique SKU automatically. */
  sku?: string

  /** Product title */
  name: string

  /** Available translations for product name */
  nameTranslated?: Translations

  /** Amount of product items in stock. *This field is omitted for the products with unlimited stock.* */
  quantity?: number

  /** Set as true to make Unlimited stock for the product and to not track product inventory. */
  unlimited?: boolean

  /** **`READONLY`** `true` if the product or any of its variations is in stock (quantity is more than zero) or has unlimited quantity. `false` otherwise. */
  readonly inStock?: boolean

  /** Base product price */
  price?: number

  /** **`READONLY`** Product price displayed in a storefront for logged out customer for default location (store location). May differ from the price value when the product has options and variations and the default variation's price is different from the base product price. It also includes taxes */
  readonly defaultDisplayedPrice?: number

  /** **`READONLY`** Formatted display of `defaultDisplayedPrice` in the store's formatting for prices */
  readonly defaultDisplayedPriceFormatted?: string

  /** Sorted array of wholesale price tiers (quantity limit and price pairs) */
  wholesalePrices?: WholesalePrice[]

  /** Product's sale price displayed strike-out in the customer frontend */
  compareToPrice?: number

  /** **`READONLY`** Formatted display of `compareToPrice` in the store's formatting for prices */
  readonly compareToPriceFormatted?: string

  /** **`READONLY`** Sale price discount amount */
  readonly compareToPriceDiscount?: number

  /** **`READONLY`** Sale price formatted discount amount (with store currency) */
  readonly compareToPriceDiscountFormatted?: string

  /** **`READONLY`** Sale price discount percent */
  readonly compareToPriceDiscountPercent?: number

  /** **`READONLY`** Sale price discount percent (with percent sign) */
  readonly compareToPriceDiscountPercentFormatted?: string

  /** Detailed information about product's taxes */
  tax?: TaxInfo

  /** `true` if product requires shipping, `false` otherwise */
  isShippingRequired?: boolean

  /** Product weight in the units defined in store settings. Leave empty for intangible products */
  weight?: number

  /** **`READONLY`** URL of product details page in the storefront. URL will be provided in SEO-friendly format if Ecwid knows the store uses them. */
  readonly url?: string

  /** **`READONLY`** Date and time of the product creation. Example: `2014-07-30 10:32:37 +0000` */
  readonly created?: string

  /** **`READONLY`** Product last update date/time */
  readonly updated?: string

  /** **`READONLY`** The date of product creation in UNIX Timestamp format, e.g `1427268654` */
  readonly createTimestamp?: number

  /** **`READONLY`** Product last update date in UNIX Timestamp format, e.g `1427268654` */
  readonly updateTimestamp?: number

  /**
   * Id of the class (type) that this product belongs to. 0 value means the product is of the default 'General' class.
   *
   * See also: [Product types and attributes in Ecwid](http://help.ecwid.com/customer/portal/articles/1167365-product-types-and-attributes)
   */
  productClassId?: number

  /** `true` to make product enabled, `false` otherwise. Disabled products are not displayed in the store front. */
  enabled?: boolean

  /** List of the product options. */
  options?: ProductOption[]

  /** The minimum 'warning' amount of the product items in stock, if set. When the product quantity reaches this level, the store administrator gets an email notification. */
  warningLimit?: number

  /** Shipping settings of this product */
  shipping?: ShippingSettings

  /** **`READONLY`** Identifier of the default product variation, which is defined by the default values of product options. */
  defaultCombinationId?: number

  /** Product description in HTML */
  description?: string

  /** Available translations for product description */
  descriptionTranslated?: Translations

  /**
   * **`READONLY`**
   *
   * **Private token**: List of the categories, which the product belongs to.
   *
   * **Public token**: List of the enabled categories the product belongs to.
   *
   * **Any access token**: If no categories provided, product is displayed on the store front page, see `showOnFrontpage` field, or all categories of that product are disabled
   */
  readonly media?: ProductMedia

  /**
   * List of the categories, which the product belongs to. If no categories provided, product will be displayed on the store front page, see `showOnFrontpage` field
   *
   * **Private token**: List of the categories, which the product belongs to.
   *
   * **Public token**: List of the enabled categories the product belongs to.
   *
   * **Any access token**: If no categories provided, product is displayed on the store front page, see `showOnFrontpage` field, or all categories of that product are disabled
   */
  categoryIds?: number[]

  /** **`READONLY`** List of the categories the product belongs to with brief details *(for any access token)*. If no categories provided, product belogs to store front page, see `showOnFrontpage` field */
  readonly categories?: CategoriesInfo[]

  /** Page title to be displayed in search results on the web. Recommended length is under 55 characters. Is empty if value wasn't changed by merchant from the product itself */
  seoTitle?: string

  /** Page description to be displayed in search results on the web. Recommended length is under 160 characters. Is empty if value wasn't changed by merchant from the product itself */
  seoDescription?: string

  /** Default category ID of the product. If value is `0`, then product does not have a default category and is not shown anywhere in storefront */
  defaultCategoryId?: number

  /** **`READONLY`** Product favorites stats */
  readonly favorites?: FavoritesStats

  /** Product attributes and their values */
  attributes?: AttributeValue[]

  /** **`READONLY`** Downloadable files (E-goods) attached to the product */
  readonly files?: ProductFile[]

  /** Related or "You may also like" products of the product */
  relatedProducts?: RelatedProducts

  /** **`READONLY`** List of the product variations */
  readonly combinations?: Variation[]

  /** Product dimensions info */
  dimensions?: ProductDimensions

  /** A positive number indicates the position (index) of a product in the store front page – the smaller the number, the higher the product is displayed on a page. If no categories are assigned to product in `categoryIds` field, the `showOnFrontPage` will be `1` */
  showOnFrontpage?: number

  /** **`READONLY`** `true` if this product is a sample one (sample product when Ecwid store is initially created). `false` otherwise. Read only field */
  readonly isSampleProduct?: boolean

  /** **`READONLY`** `true` if a product is a gift card. `false` if it's a regular store product. Read only field */
  readonly isGiftCard?: boolean

  /** `true` if Ecwid can apply discounts to this product at checkout. `false` otherwise */
  discountsAllowed?: boolean

  /** Short product description for categories or search pages. */
  subtitle?: string
}

export interface ImageDetails {
  /** Image URL */
  url: string

  /** Image width */
  width: number

  /** Image height */
  height: number
}

/** [Category](https://api-docs.ecwid.com/reference/categories) */
export interface Category {
  /** Internal unique category ID */
  id: number

  /** ID of the parent category, if any */
  parentId: number

  /** Sort order of the category in the parent category subcategories list */
  orderBy: number

  /** Category HD thumbnail URL resized to fit 800x800px */
  hdThumbnailUrl: string

  /** Category thumbnail URL. The thumbnail size is specified in the store settings. Resized to fit 400x400px by default */
  thumbnailUrl: string

  /** Category image URL. A resized original image to fit 1500x1500px */
  imageUrl: string

  /** Link to the original (not resized) category image */
  originalImageUrl: string

  /** Details of the category image */
  originalImage: ImageDetails

  /** Category name */
  name: string

  /** Thumbnail image data. The thumbnail size is specified in the store settings. Resized to fit 400x400px by default */
  thumbnail: ImageDetails

  /** Available translations for category name */
  nameTranslated: Translations

  /** URL of the category page in the store */
  url: string

  /** Number of products in the category and its subcategories. Important: if new products are assigned or unassigned for this category, the changes to productCount value will apply after several minutes. */
  productCount: number

  /** Number of enabled products in the category (excluding its subcategories) */
  enabledProductCount: number

  /** The category description in HTML */
  description: string

  /** Available translations for category description */
  descriptionTranslated: Translations

  /** `true` if the category is enabled, `false` otherwise. Use `hidden_categories` in request to get disabled categories */
  enabled: boolean

  /** IDs of products assigned to the category as they appear in Ecwid Control Panel > Catalog > Categories. To make this field appear in a response, send `productIds=true` in a request. */
  productIds: Array<number>
}

export interface ProductType {
  /** Product class internal unique ID. Class with ID `0` is the default 'General' type assigned to all products by default */
  id: number

  /** Product type name. Empty for the "General" type */
  name?: string

  /** Google taxonomy associated with this type */
  googleTaxonomy?: string

  /** Product type attributes */
  attributes: Attribute[]
}
