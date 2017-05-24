const ArticleMap = {
	top: '置顶',
	good: '精华',
	ask: '问答',
	share: '分享',
	job: '招聘'
};


const ArticleCategory = {
	ask: '问答',
	share: '分享',
	job: '招聘'
};

const url = 'https://cnodejs.org/api/v1/';

const user_pass = {
	user:"admin",
	password:"admin"
};


const API = {
	interface: url,
	getUserById: `${url}user/`,
	topics: `${url}topics`,
	topicCollect: `${url}topic_collect/`,
	collect: `${url}topic_collect/collect`,
	deCollect: `${url}topic_collect/de_collect`,
	topic: `${url}topic/`,
	topicUpdate: `${url}topics/update`,
	replyUps: `${url}reply/`,
	messageCount: `${url}message/count`,
	messages: `${url}messages`,
	messageMarkAll: `${url}message/mark_all`
};

export {ArticleMap,ArticleCategory,API,user_pass,login_token};
