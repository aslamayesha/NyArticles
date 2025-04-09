import React from 'react';
import RoutesHOC from 'src/components/hoc/routesHOC/RoutesHOC';
import ErrorBoundary from './ErrorBoundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 1000 * 60 * 5, // 5 minutes
        },
    },
});

function App() {
    console.log('there in pp');
    return (
        <QueryClientProvider client={queryClient}>
            <ErrorBoundary>
                <RoutesHOC />
            </ErrorBoundary>
        </QueryClientProvider>
    );
}

export default App;
