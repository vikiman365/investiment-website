export interface PageProps<T = {}> {
  params: Promise<T>
  searchParams?: { [key: string]: string | string[] | undefined }
}

export interface LayoutProps<T = {}> {
  children: React.ReactNode
  params: Promise<T>
}