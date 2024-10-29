import { PageHeader, Sidebar } from '@/layout';
import React from 'react';

export default function index({ children }) {
  return (
    <React.Fragment>
      {/* Fixed sidebar */}
      <div className="hidden md:flex w-[248px]  fixed bg-white-600 h-full overflow-y-auto">
        <Sidebar />
      </div>
      {/* Main content area */}
      <div className="flex-1 md:ml-[248px] ml-[0px] h-full overflow-y-auto">
        <PageHeader />
        {children}
      </div>
    </React.Fragment>
  );
}
