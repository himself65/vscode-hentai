import Axios from 'axios'

export const fetchUrl = 'https://api.pixivic.com/illusts'

export type TInfoItem = {
  id: string,
  title: string,
  type: 'illust' | string,
  caption: string,
  user: {
    id: string,
    name: string,
    account: string,
    profile_image_urls: string
  },
  tags: { name: string }[]
  tools: string[],
  create_date: string,
  page_count: number,
  width: number,
  height: number,
  sanity_level: number,
  meta_single_page: {
    original_image_url: string,
    large_image_url: string
  },
  meta_pages: {
    image_urls: {
      original: string
      large: string
    }
  }[]
}

export function getImages (keywords: string, page = 0) {
  return Axios.get(fetchUrl, {
    params: {
      keywords,
      page
    }
  }).then(res => {
    let message = ''
    let items: TInfoItem[] | null
    if (res.status === 200) {
      message = res.data.message
      items = res.data.data as TInfoItem[]
    } else {
      message = `${res.status} Error: \n  ${res}`
      items = null
    }
    return { message, items }
  })
}
