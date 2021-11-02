import { Product } from '~/beans/product'
import { PageableLinks } from '~/beans/pageableLinks'
import { PageMetaInfo } from '~/beans/pageMetaInfo'

export interface Pageable {
    data: Product[];
    links: PageableLinks;
    meta: PageMetaInfo;
}
