import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { ProgressChart } from "./screen/progressChart";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProgressChart />
    </QueryClientProvider>
  );
}

export default App;
