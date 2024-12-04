import { PageHeader, Sidebar } from '@/layout';
import React from 'react';

export default function index({ children }) {
  return (
    <React.Fragment>
      {/* Fixed sidebar */}
      <div className="hidden side lg:flex w-[248px]  fixed bg-white-200 h-full overflow-y-auto">
        <Sidebar />
      </div>
      {/* Main content area */}
      <div className="flex-1 lg:ml-[248px] ml-[0px] h-full overflow-y-auto">
        <div className="">
          <PageHeader />
        </div>
        <div className="new">{children}</div>
      </div>
    </React.Fragment>
  );
}
