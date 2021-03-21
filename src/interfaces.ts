// Plugin設定
declare module 'vue/types/vue' {
  interface Vue {
    readonly $ogp: string
    readonly $head: any
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    readonly $ogp: string
    readonly $head: any
  }

  interface Context {
    readonly $ogp: string
    readonly $head: any
  }
}

// Layout
export interface MENU {
  icon: string,
  title: string,
  link: string,
}

export interface Auth {
  access_token: string,
  refresh_token: string,
}

export interface User {
  email: string,
  user_name: string,
  display_name: string,
  icon_src: string,
  icon_change?: boolean,
  followed: User[],
  follow?: User[],
}

export interface Headers {
  'Content-Type': string,
  'Access-Control-Allow-Origin': string,
  'X-REQUESTED-BY-SCENERY-FRONT': boolean,
  'Accept': string,
  'Authorization'?: string,
}

export interface ReturnData {
  status: number,
  statusText: string,
  data: object,
}

export interface Info {
  type: string,
  text: string,
}

export interface Box {
  id: string,
  title: string,
  eye_catch: string,
  ex_sentence?: string,
  is_favorite: boolean,
  playlist: string,
  created_at: string,
  photos?: Photo[],
  start_date?: string,
  end_date?: string,
  eye_catch_src: string,
  user: User,
}

export interface CreateBox extends Box {
  tags: string[]
}

export interface Photo {
  id: string,
  user_id: string,
  box_id: string,
  src: string,
  file_name: string,
  lat?: number,
  lon?: number,
  position_str?: string,
  taken_time?: string,
  taken_time_icon?: string,
  order: number,
  taken_at?: string,
  box: Box,
  // DataConvert用
  take_at?: string,
  time_str?: string,
  time_icon?: string,
  type?: string,
}

export interface Tag {
  id: string,
  title: string,
  icon?: string,
  color?: string,
}

export interface TagReturn {
  tags: Tag[],
}

export interface CreatePhoto extends Photo {
  camera?: string,
  camera_maker?: string,
  position_name?: string,
  img: string,
  raw_taken_at?: string,
  raw_lat?: number,
  raw_lon?: number,
}

export interface User {
  id: string,
  user_name: string,
  display_name: string,
  icon: string,
  provider: string,
}

export interface PositionResultItem {
  name?: string,
  lat?: number,
  lon?: number,
}

export interface PositionResult {
  positions: Array<PositionResultItem>;
}

export interface Position {
  lat: number,
  lon: number,
  img?: string,
  src?: string,
  name?: string,
};

export interface NuxtContext {
  isClient: boolean
  isServer: boolean
  isStatic: boolean
  isDev: boolean
  isHMR: boolean
  env: object
  query: object
  nuxtState: object
  req: Request
  res: Response
  params: { [key: string]: any }
  redirect: (path: string) => void
  error: (params: { statusCode?: String; message?: String }) => void
}

export interface FormType {
  min?: number,
  max?: number,
  id: string,
  type: string,
  same?: string,
  placeholder?: string,
  required: boolean,
  unique?: boolean,
  height?: number,
  select?: object[],
  icon?: string,
  class?: string[],
}

export interface FormOutput {
  validation: boolean,
  data: object,
}

export interface IconData {
  icon_src: string,
  icon: string,
}

export interface HTMLFormEvent extends Event {
  target: HTMLInputElement,
}

export interface HTMLImageEvent extends Event {
  target: HTMLImageElement,
}
