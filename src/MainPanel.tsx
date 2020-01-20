import React, { PureComponent } from 'react';
import { PanelProps, Vector as VectorData } from '@grafana/data';
import { SimpleOptions } from 'types';
import { Funnel } from 'funnel-react';

interface Buffer extends VectorData {
  buffer: number[];
}

interface Props extends PanelProps<SimpleOptions> {}

export class MainPanel extends PureComponent<Props> {
  state = {
    data: [],
  };

  componentDidMount() {
    const { buffer: bufferLabel } = this.props.data.series[0].fields[0].values as Buffer;
    const { buffer: bufferQuantity } = this.props.data.series[0].fields[1].values as Buffer;

    const data = bufferLabel.map((item, index) => ({ label: item, quantity: bufferQuantity[index] }));

    this.setState({ data });
  }

  componentDidUpdate(prevProps: PanelProps) {
    if (prevProps.data !== this.props.data) {
      const { buffer: bufferLabel } = this.props.data.series[0].fields[0].values as Buffer;
      const { buffer: bufferQuantity } = this.props.data.series[0].fields[1].values as Buffer;

      const data = bufferLabel.map((item, index) => ({ label: item, quantity: bufferQuantity[index] }));

      this.setState({ data });
    }
  }

  render() {
    const { width, height } = this.props;
    const { data } = this.state;

    if (data.length === 0) {
      return <div />;
    }

    return (
      <div style={{ width: width, height: height }}>
        <Funnel
          labelKey="label"
          height={height - 100}
          width={width}
          colors={{
            //graph: ['#1890FF', '#BAE7FF'], // array or string : 'red' || '#666'
            graph: ['red', 'orange', 'yellow', 'green'],
            label: '#000',
            value: '#000',
          }}
          valueKey="quantity"
          displayPercent={true}
          data={data}
        />
      </div>
    );
  }
}
