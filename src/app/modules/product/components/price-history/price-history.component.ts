import { Component, Input } from '@angular/core';
import { ProductRate } from '@modules/product-rate/classes/product-rate';
import { LegendPosition } from '@swimlane/ngx-charts';
import { format } from 'date-fns';

interface ChartData {
  name: string;
  series: {
    name: string;
    value: number;
  }[]
}

@Component({
  selector: 'price-history',
  templateUrl: './price-history.component.html',
  styleUrls: ['./price-history.component.scss']
})
export class PriceHistoryComponent {
  @Input('data') set setChartDate(initial: { date: string; rates: Pick<ProductRate, 'providerSlug' | 'price'>[]; }[]) {
    this.chartOn = false;
    setTimeout(() => {
      this.data = this.transformForChart(initial);
      this.chartOn = true;
    }, 500)
  }

  data: ChartData[] = [];
  chartOn = false;
  // options
  legendPosition = LegendPosition.Below;
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = $localize`Date`;
  yAxisLabel: string = $localize`Price`;
  colorScheme = {
    domain: ['red', 'purple', 'black', 'orange', 'green', 'cyan']
  };

  private transformForChart(initial: { date: string; rates: Pick<ProductRate, 'providerSlug' | 'price'>[]; }[]): ChartData[] {
    const providersMap: Record<string, { name: string; value: number }[]> = {};
    for (const dateGroup of initial) {
      const dateFormatted = format(new Date(dateGroup.date), 'yyyy-MM-dd');
      const rates = dateGroup.rates || [];
      for (const rate of rates) {
        if (!providersMap[rate.providerSlug]) {
          providersMap[rate.providerSlug] = [];
        }
        providersMap[rate.providerSlug].push({
          name: dateFormatted,
          value: rate.price
        })
      }
    }
    const chartData: ChartData[] = [];
    for (const provider in providersMap) {
      chartData.push({
        name: provider,
        series: providersMap[provider]
      })
    }
    return chartData;
  }

}
