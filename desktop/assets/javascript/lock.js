//Clean Old-Sessions
localStorage.clear("user");

$(function () {
	var gridIncrement = $(".locker-dial ul").css('line-height').replace('px', '') / 2;
	var numNums = $(".locker-dial:eq(0) ul li").length;
	var halfHeight = gridIncrement * numNums;
	var initTop = -(halfHeight - gridIncrement);

	$(".locker-dial ul").css('top', initTop);

	$(".locker-dial ul").draggable({
		grid: [0, gridIncrement],
		axis: 'y',
		drag: function () {
			var dragDir = $(this).css('top').replace('px', '') < initTop ? "up" : "down";

			if (dragDir == "up") {
				var curNum = parseInt($(this).find('li:last-child').text()) + 1;
				if (curNum < 10) {
					$(this).append('<li>' + curNum + '</li>');
				} else {
					$(this).append('<li>0</li>');
				};
			} else {
				var curNum = parseInt($(this).find('li:first-child').text()) - 1;
				var thisTop = parseInt($(this).css('margin-top').replace('px', ''));

				$(this).css({
					marginTop: thisTop - (gridIncrement * 2)
				});

				if (curNum > -1) {
					$(this).prepend('<li>' + curNum + '</li>');
				} else {
					$(this).prepend('<li>9</li>');
				};
			};
		},
		stop: function () {

			//MATHS		
			var negOrPos = $(this).css('margin-top').replace('px', '') > 0 ? 1 : -1;
			var thisTopTotal = parseInt($(this).css('top').replace('px', '')) + Math.abs(initTop);
			var marginMinified = parseInt(Math.abs($(this).css('margin-top').replace('px', ''))) - thisTopTotal;
			var numIncs = Math.floor(marginMinified / (halfHeight * 2));
			var totalDif = numIncs * (halfHeight * 2);
			var topTen = (marginMinified - totalDif) * negOrPos;
			var activeIndex = Math.abs(topTen / (gridIncrement * 2)) + (halfHeight / (gridIncrement * 2));

			$(this).attr("data-combo-numberz", $(this).find('li').eq(activeIndex).text()).css({
				top: -315,
				marginTop: topTen
			}).find('li').slice(20).remove();

			for (var i = 0; i < $(".locker-dial ul").length; i++) {
				comboArray[i] = $(".locker-dial ul:eq(" + i + ")").attr("data-combo-numberz");
			}

			userKey = comboArray[0]+""+comboArray[1]+""+comboArray[2];
			checkKeys();
			
		}
	});

})
