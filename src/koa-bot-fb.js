'use strict';

import process from 'process';
import request from 'request';

export const verifyToken = ctx => {
  const {request, response} = ctx;

  if(request.query['hub.mode'] === 'subscribe' &&
    request.query['hub.verify_token'] === process.env.BOT_FB_VERIFY_TOKEN) {
    console.log('Validating webhook');

    response.status = 200;
    response.body = request.query['hub.challenge'];
  } else {
    console.error('Failed validation. Make sure the validation tokens match.');
    response.status = 403;
  }
};

export const receivedMessage = callback => ctx => {
  const {request, response} = ctx;
  const data = request.body;

  if(data.object === 'page') {
    data.entry.forEach(entry => {
      entry.messaging.forEach(event => {
        if(event.message)
          callback(event);
        else
          console.log(`Webhook received unknown event: ${event}`);
      });
    });

    response.status = 200;
  }
};

export const callSendAPI = messageData => {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: process.env.BOT_FB_PAGE_ACCESS_TOKEN
    },
    method: 'POST',
    json: messageData
  }, (error, response, body) => {
    if(!error && response.statusCode == 200) {
      const recipientId = body.recipient_id;
      const messageId = body.message_id;

      console.log(`Successfully sent generic message with id ${messageId} to recipient ${recipientId}`);
    } else {
      console.error('Unable to send message.');
      console.error(response);
      console.error(error);
    }
  });
};

export const sendTextMessage = (recipientId, messageText) => {
  callSendAPI({
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  });
};

export const sendMessage = (recipientId, message) => {
  callSendAPI({
    recipient: {
      id: recipientId
    },
    message
  });
};
