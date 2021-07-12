// params.. init today
function getToday(hours, minutes, seconds) {
    // current time
    const today = new Date();
    
    if (null != hours) {
      today.setHours(hours);
    }
    
    if (null != minutes) {
      today.setMinutes(minutes);
    }
    
    if (null != seconds) {
      today.setSeconds(seconds);
    }
    
    return today;
  }
  
  // params.. init today
  function getYesterday(hours, minutes, seconds) {
    // current time
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (null != hours) {
      yesterday.setHours(hours);
    }
    
    if (null != minutes) {
      yesterday.setMinutes(minutes);
    }
    
    if (null != seconds) {
      yesterday.setSeconds(seconds);
    }
    
    return yesterday;
  }
  
  // params.. init today
  function getTomorrow(hours, minutes, seconds) {
    // current time
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (null != hours) {
      tomorrow.setHours(hours);
    }
    
    if (null != minutes) {
      tomorrow.setMinutes(minutes);
    }
    
    if (null != seconds) {
      tomorrow.setSeconds(seconds);
    }
    
    return tomorrow;
  }
  
  // ターゲットが指定範囲時間ないにあるかどうかを返します。
  function timeInRange(from, to, target) {
    const fromRange = target.getTime() >= from.getTime();
    const toRange = target.getTime() < to.getTime();
    return fromRange && toRange;
  }
  
  function getMonthBeginningAndMonthEnd(date) {
    return { 
      'origin': date,
      'begin': new Date(date.getFullYear(), date.getMonth(), 1),
      'end': new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59)
    };
  }