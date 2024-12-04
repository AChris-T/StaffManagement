import { QueryClient, QueryClientProvider } from 'react-query';
import Routers from './Routers/Routers';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="w-full max-w-[1440px] mx-auto ">
          <Routers />
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
