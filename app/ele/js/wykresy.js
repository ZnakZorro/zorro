
let wykres = null;
let updateWykres=(data)=>{
	wykres.series[0].setData(data);
	wykres.redraw();
}

let rysujWykres=(container,data)=>{
	wykres = Highcharts.chart(container, {
		type:'spline',
		title: {text: 'Filter'},
		subtitle: {text: null},
		yAxis: {
			title: {text: 'Gain'},
			//type: 'logarithmic',
			//max:-0,
			//min:-50
		},
		xAxis: {
			accessibility: {rangeDescription: 'Frequency'},
			type: 'logarithmic',
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'middle'
		},
		plotOptions: {
			series: {
				label: {connectorAllowed: false},
				//pointStart: 2010
			}
		},
		series: [
			{name: 'Gain',data: data}
		],
		responsive: {
			rules: [{
				condition: {maxWidth: 500},
				chartOptions: {
					legend: {
						layout: 'horizontal',
						align: 'center',
						verticalAlign: 'bottom'
					}
				}
			}]
		}
	});
}
