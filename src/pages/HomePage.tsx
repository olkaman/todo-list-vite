import Header from '../components-layout/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import ListsPanel from '../features/lists/ListsPanel';
import Layout from '../components-layout/Layout';
import useListsStore from '../stores/listStore';
import { useEffect } from 'react';
import TodoPage from './TodoPage';

export default function HomePage() {
  const navigate = useNavigate();
  const currentSelectedList = useListsStore((state) => state.currentSelectedListId);
  console.log('home', currentSelectedList);
  useEffect(() => {
    navigate(`${currentSelectedList}`);
  }, []);
  return <Layout header={<Header />} sidebar={<ListsPanel />} content={<TodoPage />} />;
}
