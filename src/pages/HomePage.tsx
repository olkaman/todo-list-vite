import Header from '../components-layout/Header';
import { Outlet } from 'react-router-dom';
import ListsPanel from '../features/lists/ListsPanel';

export default function HomePage() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <h2>HomePage</h2>
        <ListsPanel />
        <Outlet />
      </div>
    </>
  );
}
