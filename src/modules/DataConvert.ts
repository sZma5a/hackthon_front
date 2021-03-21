import * as type from '@/src/interfaces';

export function getDateString(date: Date) {
  const year_str = date.getFullYear();
  const month_str = ('000' + (1 + date.getMonth())).slice(-2);
  const day_str = ('000' + date.getDate()).slice(-2);
  const hour_str = ('000' + date.getHours()).slice(-2);
  const minute_str = ('000' + date.getMinutes()).slice(-2);
  const second_str = ('000' + date.getSeconds()).slice(-2);
  let format_str = 'YYYY-MM-DD hh:mm:ss';
  format_str = format_str.replace(/YYYY/g, String(year_str));
  format_str = format_str.replace(/MM/g, month_str);
  format_str = format_str.replace(/DD/g, day_str);
  format_str = format_str.replace(/hh/g, hour_str);
  format_str = format_str.replace(/mm/g, minute_str);
  format_str = format_str.replace(/ss/g, second_str);
  return format_str;
}

export function createTimeData(date: string) {
  if (date) {
    const time = (date).split(' ')[1];
    const day = (date).split(' ')[0];
    const time_number = Number((time).replace( /:/g , '' ));
    let data = {
      time_str: '',
      time_icon: ''
    };
    if (50000 <= time_number && time_number < 100000) {
      data.time_str = 'Morning';
      data.time_icon = '/img/morning.png'
    } else if (100000 <= time_number && time_number < 160000) {
      data.time_str = 'Noon';
      data.time_icon = '/img/noon.png'
    } else if (160000 <= time_number && time_number < 190000) {
      data.time_str = 'Evening';
      data.time_icon = '/img/evening.png'
    } else if ((0 <= time_number && time_number < 50000) || 190000 <= time_number) {
      data.time_str = 'Night';
      data.time_icon = '/img/night.png'
    }
    return data;
  } else {
    return {time_str: '', time_icon: ''};
  }
}

export function adjustTimeLineData(data: type.Photo[]) {
  const pic = [];
  data.sort((a: type.Photo, b: type.Photo) => {
    return ((a.take_at || '') > (b.take_at || '') ? 1 : -1);
  });
  let position = data[0].position_str;
  let time = (createTimeData((data[0]).taken_at || '')).time_str;
  if (position != '') {
    pic.push({
      type: 'position',
      title: position
    })
  }
  if (time) {
    pic.push({
      type: 'time',
      title: time,
      icon: (createTimeData(data[0].taken_at || '')).time_icon
    });
  }
  for (let d of data) {
    d = Object.assign(d, createTimeData(d.taken_at || ''));
    if (!d.type) {
      d.type = 'picture';
    }
    if (d.position_str) {
      if (d.position_str != position) {
        position = d.position_str;
        pic.push(
          {
            type: 'position',
            title: position
          }
        );
      }
    }
    if (d.time_str) {
      if (d.time_str != time) {
        time = d.time_str;
        pic.push(
          {
            type: 'time',
            title: time,
            icon: d.time_icon
          }
        );
      }
    }
    pic.push(d);
  }
  return pic;
}
