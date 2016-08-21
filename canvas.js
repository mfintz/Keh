var color = d3.scale.category20();
			// Converts from degrees to radians.
			Math.radians = function(degrees) {
			  return degrees * Math.PI / 180;
			};
			 
			// Converts from radians to degrees.
			Math.degrees = function(radians) {
			  return radians * 180 / Math.PI;
			};
		  var canvas = d3.select("body").append("svg")
				.attr("width", 1800)
				.attr("height", 1100)
				.append("g")
				.attr("transform", "translate(100,100)");
			var sexValue = "MW", ageValue = "Total", jobTypeValue = "TED", timeValue = "2014", employmentStatusValue = "Total employment";
			var xZeroValue = 550, yZeroValue = 420;
			d3.csv("finalAll.csv", function (data)
			{
   				  var xAxis = 0, yAxis = 0, xAxisName = 0, yAxisName = 0, placeInSort = 0, placeInSortY = 0;
				  var firstArcXAngle = 0, firstArcYAngle = 0, xZero = xZeroValue, yZero = yZeroValue, cx, cy;
				  var secondArcXAngle = 0, secondArcYAngle = 0, thirdArcXAngle = 0, thirdArcYAngle = 0;
				  var coefficientOfScale = 1.5;
				  var locationsX = [], locationsY = [];
				  data = data.filter(function(d) 
				  { 
				     if(d["SEX"] == sexValue && d["JOBTYPE"] == jobTypeValue && d["TIME"] == timeValue && 
				     	d["Employment status"] == employmentStatusValue && d["Age"] == ageValue) 
				     { 
				         return d;
				     }
				  })		  
				  data.sort(function(x, y){
						return d3.descending(x.Value, y.Value);
				  })
				  var minValue = parseInt(data[data.length - 1].Value); 
				  var maxValue = parseInt(data[0].Value); 

				  var maxRadius = coefficientOfScale * maxValue;

				  var colorFirstArcScale = d3.scale.linear()
								.domain([data[6].Value,data[0].Value])
								.range(["#33F6FF","red"]);

				  var colorSecondArcScale = d3.scale.linear()
								.domain([data[18].Value,data[7].Value])
								.range(["#33F6FF","red"]);

				  var colorThirdArcScale = d3.scale.linear()
								.domain([minValue,data[19].Value])
								.range(["#33F6FF","red"]);

				  var colorScale = d3.scale.linear()
							.domain([minValue,maxValue])
							.range(["#33F6FF","red"]);
				  
				  var scale = d3.scale.linear()
								.domain([minValue,maxValue])
								.range([10,70]);
				  
				  var fontScale = d3.scale.linear()
				  				.domain([minValue,maxValue])
				  				.range(["6px","18px"]);

				  var circles = canvas.selectAll("circle")
	                          .data(data)
	                          .enter()
	                          .append("g")
	                          .attr("class", "circle");
					circles.append("circle")
		               .attr("cx", function(d) {
		               		cx = xZero;
		               		if(placeInSort >= 1 && placeInSort < 7)
		               		{
		               			//console.log("firstArcXAngle is " + firstArcXAngle + ", angle x is: " + firstArcXAngle);
		               			cx = parseInt(xZero + (2.2 * maxRadius + 20)*(Math.cos(Math.radians(firstArcXAngle))));
		               			//console.log("cx is " + cx)
		               			firstArcXAngle += 60;
		               		}
		               		if(placeInSort >= 7 && placeInSort < 19)
		               		{
		               			//console.log("secondArcXAngle is " + secondArcXAngle + ", angle x is: " + secondArcXAngle);
		               			cx = parseInt(xZero + (coefficientOfScale * 2.8 * maxRadius + 30)*(Math.cos(Math.radians(secondArcXAngle))));
		               			//console.log("cx is " + cx)
		               			secondArcXAngle += 30;
		               		}
		               		if(placeInSort >= 19)
		               		{
		               			//console.log("thirdArcXAngle is " + thirdArcXAngle + ", angle x is: " + thirdArcXAngle);
		               			cx = parseInt(xZero + (6 * maxRadius + 30)*(Math.cos(Math.radians(thirdArcXAngle))));
		               			//console.log("cx is " + cx)
		               			thirdArcXAngle += 15;
		               		}
		               		//console.log("placeInSort: " + placeInSort)
		               		locationsX[placeInSort] = cx
		               		placeInSort += 1;  
		               		return cx; 
		               	})
		               .attr("cy", function(d) { 
							cy = yZero;
							placeInSort = 0;
		               		if(placeInSortY >= 1 && placeInSortY < 7)
		               		{
		               			//console.log("firstArcYAngle is " + firstArcYAngle + ", angle y is: " + firstArcYAngle);
		               			cy = yZero + (2.2 * maxRadius + 20)*(Math.sin(Math.radians(firstArcYAngle)));
		               			//console.log("cy is " + cy)
		               			firstArcYAngle += 60;
		               		}
		               		if(placeInSortY >= 7 && placeInSortY < 19)
		               		{
		               			//console.log("secondArcYAngle is " + secondArcYAngle + ", angle y is: " + secondArcYAngle);
		               			cy = parseInt(yZero + (coefficientOfScale * 3 * maxRadius + 30)*(Math.sin(Math.radians(secondArcYAngle))));
		               			//console.log("cy is " + cy)
		               			secondArcYAngle += 30;
		               		}
		               		if(placeInSortY >= 19)
		               		{
		               			//console.log("thirdArcYAngle is " + thirdArcYAngle + ", angle y is: " + thirdArcYAngle);
		               			cy = parseInt(yZero + (6 * maxRadius + 30)*(Math.sin(Math.radians(thirdArcYAngle))));
		               			//console.log("cy is " + cy)
		               			thirdArcYAngle += 15;
		               		}
		               		//console.log("placeInSortY: " + placeInSortY + ", cy is :" + cy)
		               		locationsY[placeInSortY] = cy;
		               		placeInSortY += 1; 
		               		return cy; 
		               	})
		               .attr("r", function(d, i) { return scale(d.Value); })
		               .style("fill", function(d) { 
		               		if(placeInSort > 1 && placeInSort < 7)
		               		{
		               			placeInSort++;
		               			return colorFirstArcScale(d.Value);
		               		}
		               		if(placeInSort < 19)
		               		{
		               			placeInSort++;
		               			return colorSecondArcScale(d.Value);
		               		}
		               		if(placeInSort >= 19)
		               		{
								placeInSort++;
								return colorThirdArcScale(d.Value); 
		               		}
		               });
		        
		        placeInSort = 0;
		        placeInSortY = 0;            
	            circles.append("text")
	        		.attr("x", function(d) { 
	        			cx = locationsX[placeInSort]
	        			placeInSort++; 
	        			return cx;
	        		})
					.attr("y", function(d) {
						cy = locationsY[placeInSortY]
						placeInSortY++;
						return cy; 
					})
					.attr("transform", "translate(-15,0)")
	                .style("font-size", function(d){ return fontScale(d.Value); })
				    .style("fill", "black")
				  	.text(function(d) { return d.COUNTRY;});
				
				placeInSort = 0;
		        placeInSortY = 0;  
				circles.append("text")
	        		.attr("x", function(d) { 
	        			cx = locationsX[placeInSort]
	        			placeInSort++; 
	        			return cx;
	        		})
					.attr("y", function(d) {
						cy = locationsY[placeInSortY]
						placeInSortY++;
						return cy; 
					})
					.attr("transform", "translate(-18,18)")
	                .style("font-size", function(d){ return fontScale(d.Value); })
				    .style("fill", "black")
				  	.text(function(d) { return (Math.round(d.Value*100)/100).toString();});
			});

		    function myFunctionMen() 
		    {
				sexValue = "MEN";
		        myFunction();
		    }

		    function myFunctionWomen() 
		    {		        
				sexValue = "WOMEN"
				myFunction();
		    }

		    function myFunctionMW() 
		    {        
		        sexValue = "MW"
		        myFunction();
		    }

		    function myFunctionAgeTotal()
		    {
				ageValue = "Total";
				myFunction();
		    }
		    function myFunctionAgeTotal1524()
		    {
				ageValue = "15 to 24";
				myFunction();
		    }
		    function myFunctionAgeTotal2554()
		    {
				ageValue = "25 to 54";
				myFunction();
		    }
		    function myFunctionAgeTotal5564()
		    {
				ageValue = "55 to 64";
				myFunction();
		    }
			function myFunctionAgeTotal6599()
		    {
				ageValue = "65+";
				myFunction();
		    }
			function myFunctionTED()
		    {
				jobTypeValue = "TED"
				myFunction();
		    }
			function myFunctionFT()
		    {
				jobTypeValue = "FT";
				myFunction();
		    }
			function myFunctionPT()
		    {
				jobTypeValue = "PT";
				myFunction();
		    }
			function myFunction2014()
		    {
				timeValue = "2014";
				myFunction();
		    }
			function myFunction2013()
		    {
				timeValue = "2013";
				myFunction();
		    }
			function myFunction2012()
		    {
				timeValue = "2012";
				myFunction();
		    }
			function myFunction2011()
		    {
				timeValue = "2011";
				myFunction();
		    }
			function myFunction2010()
		    {
				timeValue = "2010";
				myFunction();
		    }
			function myFunctionTE()
		    {
				employmentStatusValue = "Total employment";
				myFunction();
		    }
			function myFunctionDE()
		    {
				employmentStatusValue = "Dependent employment";
				myFunction();
		    }
		    function myFunction() 
		    {
			    d3.csv("finalAll.csv", function (data)
				{
					  console.log("gender is " + sexValue + " age is " + ageValue)
					  canvas = d3.select("body").append("svg")
						.attr("width", 1800)
						.attr("height", 1800)
						
						.attr("transform", "translate(0,-300)")
						.append("g")
						.attr("transform", "translate(100,100)");
					  d3.select("svg").remove();
  					  var xAxis = 0, yAxis = 0, xAxisName = 0, yAxisName = 0, placeInSort = 0, placeInSortY = 0;
					  var firstArcXAngle = 0, firstArcYAngle = 0, xZero = xZeroValue, yZero = yZeroValue, cx, cy;
					  var secondArcXAngle = 0, secondArcYAngle = 0, thirdArcXAngle = 0, thirdArcYAngle = 0;
					  var coefficientOfScale = 1.5;
					  var locationsX = [], locationsY = [];
					  data = data.filter(function(d) 
					  { 
					     if(d["SEX"] == sexValue && d["JOBTYPE"] == jobTypeValue && d["TIME"] == timeValue && 
					     	d["Employment status"] == employmentStatusValue && d["Age"] == ageValue) 
					     { 
					         return d;
					     }
					  })		  
					  data.sort(function(x, y){
							return d3.descending(x.Value, y.Value);
					  })
					  
					  var minValue = parseInt(data[data.length - 1].Value); 
					  var maxValue = parseInt(data[0].Value); 

					  var maxRadius = coefficientOfScale * maxValue;

					  var colorFirstArcScale = d3.scale.linear()
									.domain([data[6].Value,data[0].Value])
									.range(["#33F6FF","red"]);

					  var colorSecondArcScale = d3.scale.linear()
									.domain([data[18].Value,data[7].Value])
									.range(["#33F6FF","red"]);

					  var colorThirdArcScale = d3.scale.linear()
									.domain([minValue,data[19].Value])
									.range(["#33F6FF","red"]);

					  var colorScale = d3.scale.linear()
								.domain([minValue,maxValue])
								.range(["#33F6FF","red"]);
					  
					  var womenScale = d3.scale.linear()
									.domain([minValue,maxValue])
									.range([15,55]);
					  
					  var partTimeScale = d3.scale.linear()
									.domain([minValue,maxValue])
									.range([13,25]);

					  var scale = d3.scale.linear()
									.domain([minValue,maxValue])
									.range([10,70]);

					  var fontScale = d3.scale.linear()
					  				.domain([minValue,maxValue])
					  				.range(["6px","18px"]);

					  var circles = canvas.selectAll("circle")
		                          .data(data)
		                          .enter()
		                          .append("g")
		                          .attr("class", "circle");
						circles.append("circle")
			               .attr("cx", function(d) {
			               		cx = xZero;
			               		if(placeInSort >= 1 && placeInSort < 7)
			               		{
			               			//console.log("firstArcXAngle is " + firstArcXAngle + ", angle x is: " + firstArcXAngle);
			               			cx = parseInt(xZero + (2.2 * maxRadius + 20)*(Math.cos(Math.radians(firstArcXAngle))));
			               			//console.log("cx is " + cx)
			               			firstArcXAngle += 60;
			               		}
			               		if(placeInSort >= 7 && placeInSort < 19)
			               		{
			               			//console.log("secondArcXAngle is " + secondArcXAngle + ", angle x is: " + secondArcXAngle);
			               			cx = parseInt(xZero + (coefficientOfScale * 2.8 * maxRadius + 30)*(Math.cos(Math.radians(secondArcXAngle))));
			               			//console.log("cx is " + cx)
			               			secondArcXAngle += 30;
			               		}
			               		if(placeInSort >= 19)
			               		{
			               			//console.log("thirdArcXAngle is " + thirdArcXAngle + ", angle x is: " + thirdArcXAngle);
			               			cx = parseInt(xZero + (6 * maxRadius + 30)*(Math.cos(Math.radians(thirdArcXAngle))));
			               			//console.log("cx is " + cx)
			               			thirdArcXAngle += 15;
			               		}
			               		//console.log("placeInSort: " + placeInSort)
			               		locationsX[placeInSort] = cx
			               		placeInSort += 1;  
			               		return cx; 
			               	})
			               .attr("cy", function(d) { 
								cy = yZero;
								placeInSort = 0;
			               		if(placeInSortY >= 1 && placeInSortY < 7)
			               		{
			               			//console.log("firstArcYAngle is " + firstArcYAngle + ", angle y is: " + firstArcYAngle);
			               			cy = yZero + (2.2 * maxRadius + 20)*(Math.sin(Math.radians(firstArcYAngle)));
			               			//console.log("cy is " + cy)
			               			firstArcYAngle += 60;
			               		}
			               		if(placeInSortY >= 7 && placeInSortY < 19)
			               		{
			               			//console.log("secondArcYAngle is " + secondArcYAngle + ", angle y is: " + secondArcYAngle);
			               			cy = parseInt(yZero + (coefficientOfScale * 3 * maxRadius + 30)*(Math.sin(Math.radians(secondArcYAngle))));
			               			//console.log("cy is " + cy)
			               			secondArcYAngle += 30;
			               		}
			               		if(placeInSortY >= 19)
			               		{
			               			//console.log("thirdArcYAngle is " + thirdArcYAngle + ", angle y is: " + thirdArcYAngle);
			               			cy = parseInt(yZero + (6 * maxRadius + 30)*(Math.sin(Math.radians(thirdArcYAngle))));
			               			//console.log("cy is " + cy)
			               			thirdArcYAngle += 15;
			               		}
			               		//console.log("placeInSortY: " + placeInSortY + ", cy is :" + cy)
			               		locationsY[placeInSortY] = cy;
			               		placeInSortY += 1; 
			               		return cy; 
			               	})
			               .attr("r", function(d, i) { 
			               		if(jobTypeValue == "PT")
			               		{
			               			return partTimeScale(d.Value);
			               		}
			               		if(sexValue == "WOMEN")
			               		{
			               			return womenScale(d.Value);
			               		}
			               		else
			               		{
							       	return scale(d.Value); 
			               		}})
			               .style("fill", function(d) { 
			               		if(placeInSort > 1 && placeInSort < 7)
			               		{
			               			placeInSort++;
			               			return colorFirstArcScale(d.Value);
			               		}
			               		if(placeInSort < 19)
			               		{
			               			placeInSort++;
			               			return colorSecondArcScale(d.Value);
			               		}
			               		if(placeInSort >= 19)
			               		{
									placeInSort++;
									return colorThirdArcScale(d.Value); 
			               		}
			               });
			        placeInSort = 0;
			        placeInSortY = 0;            
		            circles.append("text")
		        		.attr("x", function(d) { 
		        			cx = locationsX[placeInSort]
		        			placeInSort++; 
		        			return cx;
		        		})
						.attr("y", function(d) {
							cy = locationsY[placeInSortY]
							placeInSortY++;
							return cy; 
						})
						.attr("transform", "translate(-15,0)")
		                .style("font-size", function(d){ return fontScale(d.Value); })
					    .style("fill", "black")
					  	.text(function(d) { return d.COUNTRY;});
					
					placeInSort = 0;
			        placeInSortY = 0;  
					circles.append("text")
		        		.attr("x", function(d) { 
		        			cx = locationsX[placeInSort]
		        			placeInSort++; 
		        			return cx;
		        		})
						.attr("y", function(d) {
							cy = locationsY[placeInSortY]
							placeInSortY++;
							return cy; 
						})
						.attr("transform", "translate(-18,18)")
		                .style("font-size", function(d){ return fontScale(d.Value); })
					    .style("fill", "black")
					  	.text(function(d) { return (Math.round(d.Value*100)/100).toString();});
				});
		    }