let PIPI = Math.PI * 2;

let wykres = null;

let updateWykres=(data)=>{
	
	//console.log(data);
	//wykres.series[0].remove();
	//wykres.series[1].remove();
	//wykres.series[2].remove();
	wykres.series[0].setData(data.treble);
	wykres.series[1].setData(data.middle);
	wykres.series[2].setData(data.bass);
	wykres.redraw();
}

let rysujWykres=(container,category,data)=>{
	//console.log(category)
	//console.log(data)
	wykres = Highcharts.chart(container, {
		//type:'spline',
		title: {text: 'Filter'},
		subtitle: {text: null},
		yAxis: {
			title: {text: 'Gain'},
			//type: 'logarithmic',
			max:-0,
			min:-50
		},
		xAxis: {
			accessibility: {rangeDescription: 'Frequency'},
			//min:20,
			//max:20000,
			//type: 'logarithmic',
			categories:category
		},
		/*legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'middle'
		},*/
		plotOptions: {
			series: {
				//label: {connectorAllowed: false},
				//pointStart: 2010
			}
		},
		colors: ['#00f', '#080', '#f00', '#aa0','#aaa'],
		//visibility: [1,1,1,0,0],
		series: [
			{name: 'Treble',data:data.treble},
			{name: 'Middle',data:data.middle},
			{name: 'Bass',data:data.bass},
			{name: 'Suma',data:data.suma,visible:false},
			{name: '-6dB',data:data.line}
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
