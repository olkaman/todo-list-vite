import Header from '../components-layout/Header'
import { Outlet } from 'react-router-dom'
import ListsPanel from '../features/lists/ListsPanel'
import Layout from '../components-layout/Layout'

export default function HomePage() {
  return <Layout header={<Header />} sidebar={<ListsPanel />} content={<Outlet />} />
}
