import Head from 'next/head'
import { ReactNode } from 'react'
import NavBar from './navbar'

type Props = {
  children: ReactNode
  pageTitle?: string
}

const Layout = ({ children, pageTitle }: Props) => {
  return (
    <>
      <Head>
        <title>{pageTitle ? `${pageTitle} | My Website` : 'My Website'}</title>
      </Head>
      <header>
      <NavBar />
      </header>
      <main>
        {children}
      </main>
      <footer>
        {/* Include your footer content here */}
      </footer>
    </>
  )
}

export default Layout