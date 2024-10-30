import { Card, DashboardTable, Header } from '@/components';
import { CardList } from '@/db/data';
import { Main } from '@/layout';

const index = () => {
  return (
    <Main>
      <div className="flex flex-col px-2 pt-12 md:px-6">
        <div className="flex flex-col-reverse justify-between gap-2 md:items-center md:flex-row">
          <Header title={'Dashboard'} />
          <h3 className="text-xs font-light md:text-base md:px-3 md:shadow-2xl">
            24 October,2024 2:00PM
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-5 mt-9 md:gap-7">
          {CardList.map((item, index) => (
            <Card
              key={index}
              icons={item.icons}
              title={item.title}
              figure={item.figure}
            />
          ))}
        </div>
        <DashboardTable />
      </div>
    </Main>
  );
};

export default index;
