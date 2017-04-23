import {API} from './config';

const ajax = function(type, url, params) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();

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

const handleAjaxError = function(reject, vm, callback){
	if (!vm || !reject) return;

	const data = reject.data;

	vm.$message.error(data.success === false ? data.error_msg : '服务器异常');

  if (typeof callback === 'function') {
    callback();
  }
};

const CookieUtil = {

	get:(name) =>{
		const cookie = document.cookie;
		const cookieName = `${encodeURIComponent(name)}=`;
		const cookieStart = cookie.indexOf(cookieName);
		let cookieVal = null;

		if(cookieStart > -1){
			let cookieEnd = cookie.indexOf(';', cookieStart);
			if(cookieEnd === -1){
				cookieEnd = cookie.length;
			}

			cookieVal = decodeURIComponent(cookie.substring(cookieStart + cookieName.length, cookieEnd));
		}
		return cookieVal;
	},

	set: (name, val, expires, path, domain, secure) => {
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

    if (expires instanceof Date) {
      cookieText += `; expires=${expires.toGMTString()}`;
    }

    if (path) {
      cookieText += `; path=${path}`;
    }

    if (domain) {
      cookieText += `; domain=${domain}`;
    }

    if (secure) {
      cookieText += '; secure';
    }

    document.cookie = cookieText;
  },

  // 没有直接删除的方法
  // 直接覆盖同名过期的cookie
  unset: (name, path, domain, secure) => {
    console.log(123+path)
    CookieUtil.set(name, '', path, domain, secure);
  }
};

const getHostNotifiesCount = function getHostNotifiesCount(accesstoken) {
  return new Promise((resolve, reject) => {
    const xhr = ajax('get', `${API.messageCount}?accesstoken=${accesstoken}`);

    xhr.then((data) => {
      if (data.success) {
        resolve(data.data);
      } else {
        reject(data.error_msg);
      }
    }, () => {
      reject('获取未读信息失败');
    });
  });
};

const getHost = function isLogin(accessToken) {
  return new Promise((resolve, reject) => {
    const token = accessToken || CookieUtil.get('token');

    if (!token) {
      resolve(null);
      return;
    }

    const xhr = ajax('post', `${API.interface}accesstoken`, {
      accesstoken: token
    });

    // console.log(xhr)

    xhr.then((data) => {
      if (data.success) {
        if (accessToken) {
          const now = new Date();
          now.setTime(now.getTime() + (1000 * 3600 * 24 * 7)); // 保留7天

          CookieUtil.set('token', accessToken, now);
        }

        // 获取未读信息
        getHostNotifiesCount(token).then((count) => {
          data.notifiesCount = count;
          data.accesstoken = token;
          resolve(data);
        }, (errorMsg) => {
          reject(errorMsg);
        });
      } else {
        reject(data.error_msg);
      }
    }, () => {
      reject('getHost：服务器异常');
    });
  });
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
  const hours = date.getHours();
  const mins = date.getMinutes();
	const formatM = (month + 1 < 10 ? `0${month+1}`:month+1);
	const formatD = (day + 1 <10 ? `0${day}`: day);
  const formatH = (hours + 1 <= 10? `0${hours}`:hours);
  const formatMin = (mins + 1 <= 10? `0${mins}`:mins);
	return `${year}-${formatM}-${formatD} ${formatH} : ${formatMin}`;
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

export default{getAnimEventName,handleAjaxError,getHost,CookieUtil,timeFormat,timeFormatCN}
