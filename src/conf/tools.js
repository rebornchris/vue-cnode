import {API} from './config';

const ajax = function(type, url, params) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequst();

		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 400) {
				resolve(JSON.parse(xhr.responseText));
			} else {
				reject();
			}
		};

		xhr.onerror = () => {
			reject('服务器异常');
		};

		if (type === 'get') {
			xhr.open('GET', url, true);
			xhr.send();
		} else if (type === 'post') {
			let str = ' ';

			if (params) {
				// 拿到params的所有属性（数组）
				Object.keys(params).forEach((val) => {
					str += `&${val}=${params[val]}`;
				});

			str = str.substring(1);
			}

			xhr.open('POST',url,true);
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
     			xhr.send(str);
		}
	});
};


//统一处理api返回的异常信息

const handleError = function(reject, vm, callback){
	if (!vm || !reject) return;

	const data = reject.data;
            
	// if (data.success === false) {
	// 	console.log('服务器异常');
	// }

            // vm.$message.error(data.success === false ? data.error_msg : '服务器异常');

            if (typeof callback === 'function') {
            	callback();
            }
};

const getAnimEventName = function getAnimEventName() {
  const animEndEventNames = {
    WebkitAnimation: 'webkitAnimationEnd',
    OAnimation: 'oAnimationEnd',
    msAnimation: 'MSAnimationEnd',
    animation: 'animationend'
  };

  const el = document.createElement('div');
  let animEventName;

  Object.keys(animEndEventNames).every((val) => {
    if (el.style[val] !== undefined) {
      animEventName = animEndEventNames[val];
      return false;
    }

    return true;
  });

  return animEventName;
};

const timeFormat = (time)=>{
	const date = new Date(time);
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();
	const formatM = (month + 1 < 10 ? `0${month+1}`:month+1);
	const formatD = (day + 1 <10 ? `0${day}`: day);
	return `${year} - ${formatM} - ${formatD}`;
}

const timeFormatCN = (time) =>{
  const oldtime = new Date(time);
  const newtime = (new Date() - oldtime) / 1000;
  const month = Math.floor(newtime / 3600 / 24 / 30);
  const day = Math.floor(newtime / 3600 / 24);
  const hours = Math.floor(newtime / 3600);
  let str;

  if (hours === 0) {
    str = `${Math.floor(newtime / 60)} 分钟前`;
  } else if (day === 0) {
    str = `${hours} 小时前`;
  } else if (month === 0) {
    str = `${day} 天前`;
  } else {
    str = `${month} 月前`;
  }

  return str;
};

export default{getAnimEventName,handleError,timeFormat,timeFormatCN}
