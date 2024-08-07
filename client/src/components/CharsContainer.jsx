import { useState } from 'react';

import BarChartComponent from './BarChart';
import AreaChartComponent from './AreaChart';
import Wrapper from '../assets/wrappers/ChartsContainer';
const CharsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type='button' onClick={() => setBarChart((cur) => !cur)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? (
        <BarChartComponent data={data} />
      ) : (
        <AreaChartComponent data={data} />
      )}
    </Wrapper>
  );
};
export default CharsContainer;
