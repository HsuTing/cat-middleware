'use strict';

import process from 'process';
import request from 'request';

import check from 'cat-utils/lib/check';

check.env('BOT_LINE_AUTHORIZATION');

export const receivedMessage = callback => ctx => {
  const {request, response} = ctx;
  const data = request.body;

  data.events.forEach(callback);
  response.status = 200;
};

export const callSendAPI = (messageData, callback) => {
  request({
    url: 'https://api.line.me/v2/bot/message/reply',
    headers: {
      Authorization: `Bearer {${process.env.BOT_LINE_AUTHORIZATION}}`
    },
    method: 'POST',
    json: messageData
  }, callback ? callback : (error, response, body) => {
    if(error)
      console.log(`Error sending message: ${error}`);
    else if(response.body.error)
      console.log(`Error: ${response.body.error}`);
  });
};

export const sendTextMessage = (replyToken, message, callback) => {
  callSendAPI({
    replyToken,
    messages: [{
      type: 'text',
      text: message
    }]
  }, callback);
};

export const sendMessage = (replyToken, messages, callback) => {
  callSendAPI({
    replyToken,
    messages
  }, callback);
};
