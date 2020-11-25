// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
; (function ($, window, document, undefined) {

    "use strict";

    // Create the defaults once
    var pluginName = "simpleCalendar",
        defaults = {
            months: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'], //string of months starting from january
            days: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'], //string of days starting from sunday
            displayYear: true,
            minDate: "YYYY-MM-DD", // minimum date
            maxDate: "YYYY-MM-DD", // maximum date
            insertEvent: true, // can insert events
            displayEvent: true, // display existing event
            fixedStartDay: true, // Week begin always by monday or by day set by number 0 = sunday, 7 = saturday, false = month always begin by first day of the month
			targetDate:false,
            events: [], //List of event dates
            eventsInfo: [], //List of event Info
            selectCallback: function (selDate) { }, // Callback on date select
            insertCallback: function () { },  // Callback when an event is added to the calendar
			evtBox:true
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
		if(this.settings.targetDate != false ){
			this.currentDate = new Date(this.settings.targetDate);
		}else{
			this.currentDate = new Date();
		}
        
        this.events = options.events;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {
            var container = $(this.element);
            var todayDate = this.currentDate;
            var events = this.events;

            var calendar = $('<div class="calendar"></div>');
            var header = $('<header>' +
                '<h2 class="month"></h2>' +
                '<a class="btn btn-prev" href="#"><</a>' +
                '<a class="btn btn-next" href="#">></a>' +
                '</header>');

            this.updateHeader(todayDate, header);
            calendar.append(header);

            this.buildCalendar(todayDate, calendar);
            container.append(calendar);

            this.bindEvents();
        },

        //Update the current month header
        updateHeader: function (date, header) {
            var monthText = this.settings.displayYear ? ' <span class="year">' + date.getFullYear() +'</span>' : '';
            monthText += '<span class="month">'+'. '+this.settings.months[date.getMonth()]+'</span>';
            header.find('.month').html(monthText);
        },

        testFunction: function (temp) {
            console.log('test function var = ' + temp);
        },

        //Build calendar of a month from date
        buildCalendar: function (fromDate, calendar) {
            var plugin = this;

            calendar.find('table').remove();

            var body = $('<table></table>');
            var thead = $('<thead></thead>');
            var tbody = $('<tbody></tbody>');

            

            //setting current year and month
            var y = fromDate.getFullYear(), m = fromDate.getMonth();

            //first day of the month
            var firstDay = new Date(y, m, 1);
            //If not monday set to previous monday
            
            var lastDay = new Date(y, m + 1, 0);
              // Start day of weeks
            var startDayOfWeek = firstDay.getDay();

            if (this.settings.fixedStartDay !== false) {
                // Backward compatibility
                startDayOfWeek =  this.settings.fixedStartDay ? 1 : this.settings.fixedStartDay;

                // If first day of month is different of startDayOfWeek
                while (firstDay.getDay() !== startDayOfWeek) {
                    firstDay.setDate(firstDay.getDate() - 1);
                }
                // If last day of month is different of startDayOfWeek + 7
                while (lastDay.getDay() !== ((startDayOfWeek + 7) % 7)) {
                    lastDay.setDate(lastDay.getDate() + 1);
            }
            }

           //Header day in a week ( (x to x + 7) % 7 to start the week by monday if x = 1)
            for (var i = startDayOfWeek; i < startDayOfWeek + 7; i++) {
                thead.append($('<td>' + this.settings.days[i % 7].substring(0, 3) + '</td>'));
            }
            
            
            
            while (lastDay.getDay() != 0) {
                lastDay.setDate(lastDay.getDate() + 1);
            }

            var todayStr = (new Date).toDateString();

			if(this.settings.minDate !="YYYY-MM-DD"){
				var toFromDate = 0; 
				var startDate = this.settings.minDate;
				var endDate = this.settings.maxDate;

				var startY = parseInt(startDate.substr(0,4));
				var endY = parseInt(endDate.substr(0,4));

				var startM = parseInt(startDate.substr(5,2)) -1;
				var endM = parseInt(endDate.substr(5,2)) -1;

				var startD = parseInt(startDate.substr(8,2));
				var endD = parseInt(endDate.substr(8,2));
			
				var rem_endD = endD;
					
				var la_date=new Date(endY, endM-1, 0);
				la_date = la_date.getDate();
				

			}else{
				toFrom_d="";
			}
            //For firstDay to lastDay
            for (var day = firstDay; day <= lastDay; day.setDate(day.getDate())) {
                var tr = $('<tr></tr>');

                //For each row
                for (var i = 0; i < 7; i++) {
					
					/*기간 붙이기*/
					if( startY<day.getFullYear() ){ //기간 설정시 시작하는 년(달)이 이번년도 보다 작으면, 기간 중 이번 년(달)의 시작은 1일부터 시작해야 한다. 
						startD=1;
					}
					if( startM<day.getMonth() ){ //기간 설정시 시작하는 년(달)이 이번년도 보다 작으면, 기간 중 이번 년(달)의 시작은 1일부터 시작해야 한다.
						startD=1;
					}
					
					if( endY > day.getFullYear() ){//기간 설정시 끝나는 년(달)이 이번년도 보다 작으면, 기간 중 이번 년(달)의 마지막은 마지막 날이어야 한다. 
						endD=la_date;
					}else{ //else가 없다면, endD를 if문에 의해서 마지막 날짜로 설정한 이후 다시는 원래 날짜로 복구되지 않는다. 
							//달력에는 이전 달과 다음달이 표기되는 날짜가 있다. 그 날짜로 있기 때문에  if문만 존재한다면, 마지말의 설정은 계속 그 달의 마지막만 될 수 있다.
							//그렇게 되면 안된다. 
						endD=rem_endD;
					}

					if( endM > day.getMonth() ){//기간 설정시 끝나는 년(달)이 이번년도 보다 작으면, 기간 중 이번 년(달)의 마지막은 마지막 날이어야 한다. 
						endD=la_date;
					}else{
						endD=rem_endD;
					}

					if( day.getFullYear() >= startY && day.getFullYear() <= endY && 
						day.getMonth() >= startM && day.getMonth() <= endM && 
						day.getDate() >= startD && day.getDate() <= endD 
						){
						var td = $('<td><a href="#" class="day term">' + day.getDate() + '</a></td>');
					}else{
						var td = $('<td><a href="#" class="day">' + day.getDate() + '</a></td>');
					}
					
					


                    if (plugin.settings.displayEvent) {
                        const eventIndex = $.inArray(this.formatToYYYYMMDD(day), plugin.events);
                        if (eventIndex !== -1) {
                            console.log('found event');
                            td.find(".day").addClass("event");

                            // for tooltip. Have to generalize this
                            td.find(".day").attr('data-tippy-content', plugin.settings.eventsInfo[eventIndex]);
                        }
                    }

                    //if today is this day
                    if (day.toDateString() === todayStr) {
                        td.find(".day").addClass("today");
                    }
                    //if day is not in this month
                    if (day.getMonth() != fromDate.getMonth()) {
                        td.find(".day").addClass("wrong-month");
                    }

                    tr.append(td);
                    day.setDate(day.getDate() + 1);
                }
                tbody.append(tr);
            }

            tbody.on('click', '.day', function (e) {
				console.log(plugin.settings.evtBox);
				if(plugin.settings.evtBox){
                    //날짜, 달, 년도를 가지고 온다.
					var day = '' + $(e.currentTarget).text(),
                    month = '' + (plugin.currentDate.getMonth() + 1),
                    year = plugin.currentDate.getFullYear();
                    
                    //10보다 작을 때는 0을 붙여준다.
					if (month.length < 2) month = '0' + month;
					if (day.length < 2) day = '0' + day;
                    
                    //상수로 달, 월, 일을 작성한다. 
					const selectedDate = [year, month, day].join('-');

					plugin.settings.selectCallback(selectedDate);

                    //달력의 여러날짜 중 .event를 갖고 있는 날짜라면
                    console.log($(e.currentTarget));
					if ($(e.currentTarget).hasClass('event')) {
                        console.log("이벤트 발생");
						// show event container with effect
						plugin.fillUp($(plugin.element), e.pageX, e.pageY);
						const eventIndex = $.inArray(selectedDate, plugin.events);
						$(plugin.element).find('.event-container>.event-date').text(selectedDate);
						$(plugin.element).find('.event-container>.title').text(plugin.settings.eventsInfo[eventIndex]);
					}
					e.preventDefault();
				}
                
            });

            body.append(thead);
            body.append(tbody);


            var eventContainer = $('<div class="event-container"><p class="event-date">Mar 01, 2019</p><h2 class="title">Event Name</h2><a href="#" class="close"></div>');

            eventContainer.on('click', '.close', function (e) {
                plugin.empty($(plugin.element), e.pageX, e.pageY);
                e.preventDefault();
            });

			/*minDate maxDate*/
			console.log();

            calendar.append(body);
            calendar.append(eventContainer);
        },
        //Init global events listeners
        bindEvents: function () {
            var plugin = this;

            //Click previous month
            $('.btn-prev').click(function (e) {
                plugin.currentDate.setMonth(plugin.currentDate.getMonth() - 1);
                plugin.buildCalendar(plugin.currentDate, $(plugin.element).find('.calendar'));
                plugin.updateHeader(plugin.currentDate, $(plugin.element).find('.calendar header'));
                e.preventDefault();
            });

            //Click next month
            $('.btn-next').click(function (e) {
                plugin.currentDate.setMonth(plugin.currentDate.getMonth() + 1);
                plugin.buildCalendar(plugin.currentDate, $(plugin.element).find('.calendar'));
                plugin.updateHeader(plugin.currentDate, $(plugin.element).find('.calendar header'));
                e.preventDefault();
            });
        },
        //Small effect to fillup a container
        fillUp: function (elem, x, y) {
            
            var plugin = this;
            var elemOffset = elem.offset();
			
            
			if(plugin.settings.evtBox){
				var filler = $('<div class="filler" style=""></div>');
				filler.css("left", x - elemOffset.left);
				filler.css("top", y - elemOffset.top);

				$(plugin.element).find('.calendar').append(filler);

				filler.animate({
					width: "300%",
					height: "300%"
				}, 500, function () {
					$(plugin.element).find('.event-container').show();
					filler.hide();
				});
			}
            
        },
        //Small effect to empty a container
        empty: function (elem, x, y) {
            var plugin = this;
            var elemOffset = elem.offset();

            var filler = $('.filler');
            filler.css("width", "300%");
            filler.css("height", "300%");

            filler.show();

            $(plugin.element).find('.event-container').hide();

            filler.animate({
                width: "0%",
                height: "0%"
            }, 500, function () {
                filler.remove();
            });
        },

        formatToYYYYMMDD: function (date) {
            var d = new Date(date),
                day = '' + d.getDate(),
                month = '' + (d.getMonth() + 1),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
