/**
 *	
 */
;var minorTicksMeasure = (function(moment, d3){
	var keys = ["years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds"];
	var d3Intervals = {
		"years": d3.time.year, 
		"months": d3.time.month, 
		"weeks": d3.time.week, 
		"days": d3.time.day, 
		"hours": d3.time.hour, 
		"minutes": d3.time.minute, 
		"seconds": d3.time.second,
		"milliseconds": d3.time.millisecond
	};

	/**
	 * @param {Date | String | number} d1  start time 
	 * @param {Date | String | number} d1  end time
	 * @return {Object} etc:{interval: "minutes", diff: 30, step: 3}
	 */
	function getInterval(d1, d2){
		var i = 5,//keys.indexOf("minutes")
			m1 = moment(d1),
			m2 = moment(d2);

		//find nice time interval and time step for axis ticks by recursion method
		function check(i){
			var diff = m2.diff(m1, keys[i]);
			if(diff >1){
				if(i === 0 || m2.diff(m1, keys[i-1]) <= 1 || i === keys.length){
					return {
						"interval": keys[i],
						"diff": diff,
						"step": getStep(diff)
					}
				}
				return check(--i);
			}
			return check(++i);
		};

		return check(i);
	}

	function getStep(diff){
		//10 ticks more perfect
		if(diff % 10 === 0){
			return diff / 10;
		}

		var i = 12;
		do{
			if(diff % i === 0){
				return diff / i;
			}
		}while(--i > 0);
		console.warn("Oh no...");
	}

	return {
		"intervals": keys,
		"getInterval": getInterval,
		"d3Intervals": d3Intervals
	};
})(moment, d3);