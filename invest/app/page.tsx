import { redirect } from 'next/navigation'

export default function Home() {
  // Redirect to default language homepage
  redirect('/en')
}