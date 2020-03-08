import React, { useState, useEffect } from 'react';
import { Segment, Comment, Header } from 'semantic-ui-react';
import { firestore } from '../config';

const Messages = () => {
  const [messages, setMessages] = useState();
  useEffect(() => {
    const messages = [];
    const unsubscribe = firestore.collection('messages').onSnapshot(snap => {
      snap.forEach(doc => messages.push({ id: doc.id, ...doc.data() }));
      setMessages(messages);
    });
    return () => unsubscribe();
  }, [messages]);

  return (
    <Segment attached>
      <Header sub content='messages' />
      <Comment.Group>
        <Comment>
          <Comment.Content>
            {messages &&
              messages.map(msg => (
                <Comment.Text key={msg.id}>
                  <p>
                    <h4>{msg.message}</h4> - severe <strong>{msg.severity}</strong>
                  </p>
                </Comment.Text>
              ))}
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Segment>
  );
};

export default Messages;
